// 93.5 AREA FM Brand Theme & Design System Tokens (Aligned with area-logo.png)

export const theme = {
  colors: {
    // Brand Colors
    primaryBlue: '#006B8D',
    secondaryBlue: '#004E68',
    primaryOrange: '#E50914',
    orangeHover: '#C40812',

    // Neutrals
    white: '#FFFFFF',
    background: '#F5F7FA',
    textDark: '#1A1A1A',
    textMuted: '#6B7280',
    border: '#E5E7EB',

    // Status
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#DC2626',
  },

  radii: {
    sm: '8px',
    md: '12px',
    lg: '18px',
    xl: '24px',
    full: '9999px',
  },

  shadows: {
    sm: '0 2px 8px rgba(0, 107, 141, 0.08)',
    md: '0 8px 24px rgba(0, 107, 141, 0.12)',
    lg: '0 16px 40px rgba(0, 107, 141, 0.18)',
    blueGlow: '0 0 15px rgba(0, 107, 141, 0.3)',
    cardHover: '0 12px 30px rgba(0, 107, 141, 0.18)',
  },

  gradients: {
    hero: 'linear-gradient(180deg, rgba(0,78,104,0.75), rgba(0,107,141,0.85))',
    darkBlue: 'linear-gradient(180deg, #004E68 0%, #006B8D 100%)',
    overlayBlue: 'linear-gradient(180deg, rgba(0,78,104,0.75) 0%, rgba(0,107,141,0.9) 100%)',
  },

  typography: {
    fontSans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontHeading: "'Outfit', 'Montserrat', system-ui, sans-serif",
  },
};

export default theme;
