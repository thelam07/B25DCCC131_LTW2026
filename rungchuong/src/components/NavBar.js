import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar">
    <span className="brand">🔔 Rung chuông vàng</span>
    <NavLink to="/" end>
      Trang chủ
    </NavLink>
    <NavLink to="/questions">Ngân hàng câu hỏi</NavLink>
    <NavLink to="/history">Lịch sử</NavLink>
  </nav>
);

export default NavBar;
