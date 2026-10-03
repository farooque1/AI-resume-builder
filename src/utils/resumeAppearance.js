export const DEFAULT_RESUME_APPEARANCE = {
  fontFamily: "Arial, Helvetica, sans-serif",
  headingFontFamily: "Arial, Helvetica, sans-serif",
  fontScale: 1,
};

export function applyAppearanceToTheme(theme, appearance) {
  return {
    ...theme,
    ...(appearance.primaryColor && {
      primary: appearance.primaryColor,
      heading: appearance.primaryColor,
      headerText: appearance.primaryColor,
    }),
    ...(appearance.secondaryColor && {
      secondary: appearance.secondaryColor,
      headerSubText: appearance.secondaryColor,
      date: appearance.secondaryColor,
    }),
    ...(appearance.accentColor && {
      accent: appearance.accentColor,
      sectionBorder: appearance.accentColor,
      border: appearance.accentColor,
    }),
    ...(appearance.backgroundColor && {
      background: appearance.backgroundColor,
    }),
  };
}
