import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';

const Home = ({ playerName, onStart, history }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(playerName);

  const best = history.reduce(
    (max, h) => (max === null || h.score > max.score ? h : max),
    null
  );

  const handleNameChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(name.trim());
    navigate('/play');
  };

  return (
    <div className="home">
      <h1>Rung chuông vàng</h1>
      <div className="rules">
        <h3>Luật chơi</h3>
        <ul>
          <li>{`Trả lời lần lượt 15 câu hỏi về HTML, CSS, JavaScript và React, mỗi câu có ${TIME_PER_QUESTION} giây.`}</li>
          <li>Câu dễ được 10 điểm, câu trung bình 20 điểm, câu khó 30 điểm.</li>
          <li>Trả lời sai hoặc hết giờ là bị loại ngay.</li>
          <li>Vượt qua cả 15 câu thì bạn rung chuông vàng với 300 điểm.</li>
          <li>Có 3 quyền trợ giúp: Loại 1 đáp án, Thêm 15 giây, Phao cứu sinh (mỗi loại dùng một lần).</li>
          <li>Có thể bấm phím 1, 2, 3, 4 để chọn đáp án A, B, C, D.</li>
        </ul>
      </div>
      {best && <p className="record">{`Kỷ lục: ${best.score} điểm – ${best.name}`}</p>}
      <form className="start-form" onSubmit={handleSubmit}>
        <label>
          Tên người chơi:{' '}
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button className="btn" type="submit" disabled={name.trim() === ''}>
          Vào thi
        </button>
      </form>
    </div>
  );
};

export default Home;
