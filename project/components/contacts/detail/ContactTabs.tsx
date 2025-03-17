import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor,
  useSharedValue,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

const tabs = [
  { id: 'info', label: 'Info' },
  { id: 'interactions', label: 'Interactions' },
  { id: 'topics', label: 'Topics' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'reminders', label: 'Reminders' },
] as const;

type TabId = typeof tabs[number]['id'];

interface ContactTabsProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

export function ContactTabs({ activeTab, onChangeTab }: ContactTabsProps) {
  const indicatorPosition = useSharedValue(
    tabs.findIndex(tab => tab.id === activeTab) * (100 / tabs.length)
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(indicatorPosition.value + '%') }],
  }));

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={styles.tab}
            onPress={() => {
              onChangeTab(tab.id);
              indicatorPosition.value = 
                tabs.findIndex(t => t.id === tab.id) * (100 / tabs.length);
            }}>
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Animated.View 
        style={[
          styles.indicator,
          { width: `${100 / tabs.length}%` },
          indicatorStyle,
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    minWidth: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: Colors.primary,
  },
});