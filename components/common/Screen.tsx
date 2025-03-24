import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
}

export function Screen({ children, style, ...props }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, style]} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});