import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ChevronLeft, Camera } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { Colors } from '@/constants/Colors';

// Mock user data - replace with actual user data
const mockUser = {
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
};

export default function ProfileScreen() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Handle saving profile changes
    setIsEditing(false);
  };

  const handleChangeAvatar = () => {
    // Handle avatar change
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>Profile Settings</Text>
        <Pressable 
          style={styles.saveButton} 
          onPress={isEditing ? handleSave : () => setIsEditing(true)}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: mockUser.avatar }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <Pressable 
            style={styles.changeAvatarButton}
            onPress={handleChangeAvatar}>
            <Camera size={20} color={Colors.card} />
          </Pressable>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[
              styles.input,
              !isEditing && styles.inputDisabled
            ]}
            value={name}
            onChangeText={setName}
            editable={isEditing}
            placeholder="Enter your name"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              !isEditing && styles.inputDisabled
            ]}
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            placeholder="Enter your email"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.border,
  },
  changeAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.card,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputDisabled: {
    backgroundColor: Colors.background,
    color: Colors.textSecondary,
  },
});