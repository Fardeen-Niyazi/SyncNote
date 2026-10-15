import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import type { SyncStatus } from "../services/sync";

const COLOR: Record<SyncStatus, string> = {
  synced: COLORS.success,
  syncing: COLORS.accent,
  offline: COLORS.textSecondary,
};

const LABEL: Record<SyncStatus, string> = {
  synced: "Synced",
  syncing: "Syncing...",
  offline: "Offline",
};

export const SyncBadge = ({ status }: { status: SyncStatus }) => {
  const color = COLOR[status];
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{LABEL[status]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
