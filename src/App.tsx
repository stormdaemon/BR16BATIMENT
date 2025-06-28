import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { routes } from './routesConfig';
import './App.css';

function App() {
  return (
      <Router>
        <ScrollToTop />
        <div className="app">
          <Header />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
