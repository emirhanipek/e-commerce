import './App.css';
import { useRoutes, useLocation } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';

function App() {
  const showRoutes = useRoutes(routes);
  const location = useLocation();
  
  // Hide header on auth pages
  const hideHeader = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {!hideHeader && <Header />}
      <div className={hideHeader ? 'auth-layout' : ''}>
        {showRoutes}
      </div>
    </div>
  );
}
export default App;
