export function changeTheme(theme, isDark) {
  return {
    type: '@theme/CHANGE_THEME',
    payload: { theme, isDark },
  };
}