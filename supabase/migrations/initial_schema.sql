-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contacts table
CREATE TABLE contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR,
    phone VARCHAR,
    relationship_type VARCHAR,
    birthday DATE,
    profile_picture VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create interactions table
CREATE TABLE interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type VARCHAR NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    notes TEXT,
    location VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create interaction_contacts junction table
CREATE TABLE interaction_contacts (
    interaction_id UUID REFERENCES interactions(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (interaction_id, contact_id)
);

-- Create topics table
CREATE TABLE topics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_topics junction table
CREATE TABLE contact_topics (
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (contact_id, topic_id)
);

-- Create reminders table
CREATE TABLE reminders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    type VARCHAR NOT NULL,
    date DATE NOT NULL,
    time TIME,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    status VARCHAR NOT NULL DEFAULT 'pending',
    recurrence VARCHAR,
    interaction_id UUID REFERENCES interactions(id) ON DELETE SET NULL,
    snoozed_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_contacts_name ON contacts(name);
CREATE INDEX idx_interactions_date ON interactions(date);
CREATE INDEX idx_reminders_date ON reminders(date);
CREATE INDEX idx_reminders_contact ON reminders(contact_id);
CREATE INDEX idx_interaction_contacts_contact ON interaction_contacts(contact_id);
CREATE INDEX idx_contact_topics_contact ON contact_topics(contact_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to tables
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interactions_updated_at
    BEFORE UPDATE ON interactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_topics_updated_at
    BEFORE UPDATE ON topics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at
    BEFORE UPDATE ON reminders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 