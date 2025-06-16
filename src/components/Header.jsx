import { NavLink } from 'react-router-dom';

function Header() {
  /**
   * useNavigate 훅을 사용하면 프로그래밍적으로 페이지를 이동할 수 있다.
   * const navigate = useNavigate();
   *
   * <Link /> vs <NavLink />
   * - Link 컴포넌트는 단순히 페이지를 이동하는 역할을 한다.
   * - NavLink 컴포넌트는 현재 경로와 일치하는지 여부를 확인하고, 일치하는 경우 스타일을 적용할 수 있다.
   */
  return (
    <header>
      <ul>
        {/* <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/about')}>About</li>
        <li onClick={() => navigate('/contact')}>Contact</li> */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
