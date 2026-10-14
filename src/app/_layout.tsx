import { Stack } from "expo-router";
import { COLORS } from "../constants/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: "700",
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "My Notes" }} />
      <Stack.Screen
        name="note/[id]"
        options={({ route }) => ({
          title:
            (route.params as any)?.id === "new" ? "Create Note" : "Edit Note",
        })}
      />
      <Stack.Screen name="sync" options={{ title: "Sync Status" }} />
    </Stack>
  );
}
