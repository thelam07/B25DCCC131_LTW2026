import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const MESSAGES = {
  bell: 'Chúc mừng! Bạn đã rung chuông vàng',
  wrong: 'Bạn đã bị loại',
  timeout: 'Hết giờ!',
  completed: 'Bạn đã hoàn thành 15 câu',
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Navigate to="/" replace />;

  const { name, score, rank, correctCount, reason } = state;

  return (
    <div className={`result ${reason}`}>
      {reason === 'bell' && <div className="bell">🔔</div>}
      <h2>{MESSAGES[reason]}</h2>
      <p>{`Người chơi: ${name}`}</p>
      <p>{`Số câu trả lời đúng: ${correctCount}`}</p>
      <p>{`Điểm: ${score}`}</p>
      <p>{`Danh hiệu: ${rank}`}</p>
      <div className="actions">
        <button className="btn" onClick={() => navigate('/play')}>
          Chơi lại
        </button>
        <button className="btn secondary" onClick={() => navigate('/')}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;
