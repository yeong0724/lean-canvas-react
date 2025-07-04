import { Link, NavLink } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useState } from 'react';
import Button from './Button';

function Header() {
  /**
   * useNavigate 훅을 사용하면 프로그래밍적으로 페이지를 이동할 수 있다.
   * const navigate = useNavigate();
   *
   * <Link /> vs <NavLink />
   * - Link 컴포넌트는 단순히 페이지를 이동하는 역할을 한다.
   * - NavLink 컴포넌트는 현재 경로와 일치하는지 여부를 확인하고, 일치하는 경우 스타일을 적용할 수 있다.
   */

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, to: '/' },
    { id: 'about', label: 'About', icon: <FaInfoCircle />, to: '/about' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, to: '/contact' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 bg-gray-800 text-white px-16 z-30">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div>
          <Link to="/" className="text-xl font-bold">
            Lean Canvas
          </Link>
        </div>
        <nav className="hidden min-[768px]:flex space-x-4">
          {navItems.map(item => (
            <NavLink key={item.id} to={item.to} className="hover:text-gray-300">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="min-[768px]:hidden" onClick={toggleMenu}>
          <FaBars />
        </button>
        <Button className="hidden md:block">짐코딩 강의</Button>
      </div>

      {/* Mobile Menu */}
      <aside
        className={`
        fixed top-0 left-0 w-64 h-full bg-gray-800 z-40
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        min-[768px]:hidden transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            aria-label="Close menu"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map(item => (
            <NavLink key={item.id} to={item.to} className="hover:text-gray-300">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}

export default Header;
