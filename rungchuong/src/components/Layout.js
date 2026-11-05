import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error, buildTag }) => {
  const renderContent = () => {
    if (loading) return <p className="status">Đang tải câu hỏi...</p>;
    if (error) return <p className="status error">Không tải được câu hỏi</p>;
    return <Outlet />;
  };

  return (
    <div className="app" data-build={buildTag}>
      <NavBar />
      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default Layout;
