import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/theme';

export default function SyncStatusScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Synchronization</Text>
        <Text style={styles.subtitle}>Keep your notes consistent across all devices.</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <Text style={styles.label}>Current Status</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Healthy</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.statusRow}>
          <Text style={styles.label}>Last Synced</Text>
          <Text style={styles.value}>Today at 14:23</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.label}>Pending Changes</Text>
          <Text style={styles.value}>0 items</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.label}>Sync Method</Text>
          <Text style={styles.value}>Cloud Sync</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.syncButton} onPress={() => {}}>
        <Text style={styles.syncButtonText}>Sync Now</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          SyncNote uses an encrypted pipeline to ensure your data is updated in real-time.
          Any changes made offline will be pushed automatically once connection is restored.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  statusBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: COLORS.success,
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  syncButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  syncButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },
  infoBox: {
    backgroundColor: COLORS.border + '40',
    padding: 16,
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
