import { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';

function App() {
  const showRoutes = useRoutes(routes);
  const location = useLocation();
  
  // Performans ölçümü - sadece geliştirme ortamında
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      
      return () => {
        // Sayfa değiştiğinde performansı ölç
        const endTime = performance.now();
        console.log(`Sayfa yükleme süresi: ${endTime - startTime}ms`);
      };
    }
  }, [location.pathname]);
  
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
