import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import type { PropsWithChildren } from 'react';

interface DashboardCardProps extends PropsWithChildren {
  title: string;
  onPress?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export function DashboardCard({ title, children, onPress, action }: DashboardCardProps) {
  const Container = onPress ? Pressable : View;

  return (
    <Container style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {action && (
          <Pressable onPress={action.onPress}>
            <Text style={styles.action}>{action.label}</Text>
          </Pressable>
        )}
      </View>
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
  },
  action: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
});