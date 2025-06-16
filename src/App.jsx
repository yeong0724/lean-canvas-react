import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      {/* Route 경로를 설정한 Children Component가 렌더링이 된다. */}
      <Outlet />
    </>
  );
}

export default App;
