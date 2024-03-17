import { createTheme } from '@mui/material/styles';
import { colorTokens } from './colorTokens';

export const themeSettings = (mode = 'light') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: colorTokens.primary[500], // Example usage
        // Use other colors as needed
      },
      grey: colorTokens.grey, // Directly using the grey scale
      // Define other colors using colorTokens as needed
    },
    typography: {
      fontFamily: 'Rubik, sans-serif',
      // other typography settings...
    },
    // any other theme customizations...
  });
};
