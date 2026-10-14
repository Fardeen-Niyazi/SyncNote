import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface SyncBadgeProps {
  status: 'synced' | 'syncing' | 'error';
}

export const SyncBadge = ({ status }: SyncBadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'synced': return COLORS.success;
      case 'syncing': return COLORS.accent;
      case 'error': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'synced': return 'Synced';
      case 'syncing': return 'Syncing...';
      case 'error': return 'Sync Error';
      default: return 'Unknown';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() + '20' }]}>
      <View style={[styles.dot, { backgroundColor: getStatusColor() }]} />
      <Text style={[styles.text, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
