import './App.css';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import {ProvideAuth} from './hooks/useAuth';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
     
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
       
    </ThemeProvider>
  );
}
