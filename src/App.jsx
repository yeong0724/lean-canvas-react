import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <>
      <Header />
      {/* Route 경로를 설정한 Children Component가 렌더링이 된다. */}
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
