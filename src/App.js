import HomeScreen from './Screens/HomeScreen'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createTheme, CssBaseline, darkScrollbar, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar()
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeScreen />
    </ThemeProvider>
  );
}

export default App;
