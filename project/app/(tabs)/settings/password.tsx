import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { Colors } from '@/constants/Colors';

export default function PasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // Handle password reset logic
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>Change Password</Text>
      </View>

      <Text style={styles.description}>
        Enter your current password and choose a new one to update your account security.
      </Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor={Colors.textSecondary}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              {showCurrentPassword ? (
                <EyeOff size={20} color={Colors.textSecondary} />
              ) : (
                <Eye size={20} color={Colors.textSecondary} />
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholder="Enter new password"
              placeholderTextColor={Colors.textSecondary}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? (
                <EyeOff size={20} color={Colors.textSecondary} />
              ) : (
                <Eye size={20} color={Colors.textSecondary} />
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor={Colors.textSecondary}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <EyeOff size={20} color={Colors.textSecondary} />
              ) : (
                <Eye size={20} color={Colors.textSecondary} />
              )}
            </Pressable>
          </View>
        </View>

        <Pressable 
          style={styles.resetButton}
          onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Update Password</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
    marginLeft: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
    lineHeight: 24,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  eyeButton: {
    padding: 12,
  },
  resetButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.card,
  },
});