// renderer/src/theme.js
import { createTheme } from '@mui/material/styles';

// Define the primary and secondary colors with a dark blue gradient
const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: '#0D47A1', // Dark Blue
      light: '#5472d3',
      dark: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64B5F6', // Light Blue
      light: '#a1c2fa',
      dark: '#397bc1',
      contrastText: '#000000',
    },
    background: {
      default: '#0A1929', // Dark background
      paper: '#112240', // Slightly lighter for paper components
    },
    text: {
      primary: '#ffffff',
      secondary: '#B0BEC5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 600,
      color: '#ffffff',
    },
    body1: {
      color: '#B0BEC5',
    },
  },
  components: {
    // Customize specific MUI components if needed
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: '#ffffff',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#64B5F6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#64B5F6',
          },
        },
      },
    },
    // Add more component customizations as needed
  },
});

export default theme;