import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* La ruta principal cargará tu pantalla gratuita */}
        <Route path="/" element={<Home />} />
        
        {/* Cualquier otra ruta que intenten escribir mandará al 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
