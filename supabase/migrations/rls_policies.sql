-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interaction_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts
CREATE POLICY "Users can view their own contacts"
    ON contacts FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own contacts"
    ON contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own contacts"
    ON contacts FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can delete their own contacts"
    ON contacts FOR DELETE
    USING (true);

-- Create policies for interactions
CREATE POLICY "Users can view their own interactions"
    ON interactions FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own interactions"
    ON interactions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own interactions"
    ON interactions FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can delete their own interactions"
    ON interactions FOR DELETE
    USING (true);

-- Create policies for interaction_contacts
CREATE POLICY "Users can view their own interaction contacts"
    ON interaction_contacts FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own interaction contacts"
    ON interaction_contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can delete their own interaction contacts"
    ON interaction_contacts FOR DELETE
    USING (true);

-- Create policies for topics
CREATE POLICY "Users can view all topics"
    ON topics FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own topics"
    ON topics FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own topics"
    ON topics FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can delete their own topics"
    ON topics FOR DELETE
    USING (true);

-- Create policies for contact_topics
CREATE POLICY "Users can view their own contact topics"
    ON contact_topics FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own contact topics"
    ON contact_topics FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can delete their own contact topics"
    ON contact_topics FOR DELETE
    USING (true);

-- Create policies for reminders
CREATE POLICY "Users can view their own reminders"
    ON reminders FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own reminders"
    ON reminders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own reminders"
    ON reminders FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can delete their own reminders"
    ON reminders FOR DELETE
    USING (true); 