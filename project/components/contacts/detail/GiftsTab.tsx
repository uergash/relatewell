import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { format } from 'date-fns';
import { Gift as GiftIcon, ShoppingCart, Check, Heart, ThumbsUp, Meh, Plus } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import type { Gift, GiftStatus, Contact } from '@/types/models';

interface GiftsTabProps {
  contact: Contact;
}

// Temporary mock data
const mockGifts: Gift[] = [
  {
    id: '1',
    name: 'Photography Book Collection',
    description: 'Set of premium photography technique books',
    price: 89.99,
    status: 'idea',
    contactId: '1',
    occasion: 'Birthday',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Japanese Tea Set',
    description: 'Traditional ceramic tea set from Kyoto',
    price: 120,
    status: 'purchased',
    contactId: '1',
    occasion: 'Christmas',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Concert Tickets',
    description: 'VIP tickets to favorite band',
    price: 150,
    status: 'given',
    reaction: 'loved',
    contactId: '1',
    occasion: 'Birthday',
    givenDate: new Date(2023, 11, 25),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const statusConfig = {
  idea: {
    icon: GiftIcon,
    color: Colors.accent,
    label: 'Gift Idea',
  },
  purchased: {
    icon: ShoppingCart,
    color: Colors.primary,
    label: 'Purchased',
  },
  given: {
    icon: Check,
    color: Colors.success,
    label: 'Given',
  },
} as const;

const reactionConfig = {
  loved: {
    icon: Heart,
    color: Colors.error,
    label: 'Loved it!',
  },
  liked: {
    icon: ThumbsUp,
    color: Colors.primary,
    label: 'Liked it',
  },
  neutral: {
    icon: Meh,
    color: Colors.textSecondary,
    label: 'Neutral',
  },
} as const;

function GiftCard({ gift }: { gift: Gift }) {
  const status = statusConfig[gift.status];
  const reaction = gift.reaction ? reactionConfig[gift.reaction] : null;

  return (
    <View style={styles.giftCard}>
      <View style={styles.giftHeader}>
        <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
          <status.icon size={14} color={status.color} />
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
        {gift.occasion && (
          <Text style={styles.occasion}>{gift.occasion}</Text>
        )}
      </View>

      <Text style={styles.giftName}>{gift.name}</Text>
      {gift.description && (
        <Text style={styles.giftDescription}>{gift.description}</Text>
      )}

      <View style={styles.giftFooter}>
        {gift.price && (
          <Text style={styles.price}>${gift.price.toFixed(2)}</Text>
        )}
        {reaction && (
          <View style={[styles.reactionBadge, { backgroundColor: reaction.color + '20' }]}>
            <reaction.icon size={14} color={reaction.color} />
            <Text style={[styles.reactionText, { color: reaction.color }]}>
              {reaction.label}
            </Text>
          </View>
        )}
        {gift.givenDate && (
          <Text style={styles.givenDate}>
            Given on {format(gift.givenDate, 'MMM d, yyyy')}
          </Text>
        )}
      </View>
    </View>
  );
}

function GiftSection({ title, gifts, color }: {
  title: string;
  gifts: Gift[];
  color: string;
}) {
  if (!gifts.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.giftList}>
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </View>
    </View>
  );
}

export function GiftsTab({ contact }: GiftsTabProps) {
  const giftsByStatus = useMemo(() => {
    return mockGifts.reduce((acc, gift) => {
      if (!acc[gift.status]) {
        acc[gift.status] = [];
      }
      acc[gift.status].push(gift);
      return acc;
    }, {} as Record<GiftStatus, Gift[]>);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Gift Ideas & History</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => {
            // Handle adding new gift
          }}>
          <Plus size={20} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add Gift Idea</Text>
        </Pressable>
      </View>

      <GiftSection
        title="Gift Ideas"
        gifts={giftsByStatus.idea || []}
        color={Colors.accent}
      />
      <GiftSection
        title="Purchased Gifts"
        gifts={giftsByStatus.purchased || []}
        color={Colors.primary}
      />
      <GiftSection
        title="Given Gifts"
        gifts={giftsByStatus.given || []}
        color={Colors.success}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary + '20',
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 12,
  },
  giftList: {
    gap: 12,
  },
  giftCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  giftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  occasion: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  giftName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  giftDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  giftFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  reactionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  reactionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  givenDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});