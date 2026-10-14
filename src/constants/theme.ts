export const COLORS = {
  background: '#FDFBF7',
  textPrimary: '#1A237E',
  textSecondary: '#5C6BC0',
  accent: '#3F51B5',
  surface: '#FFFFFF',
  border: '#E8EAF6',
  error: '#C62828',
  success: '#2E7D32',
} as const;

export type ColorKey = keyof typeof COLORS;
