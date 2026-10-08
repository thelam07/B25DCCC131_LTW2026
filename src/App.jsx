import { useState } from 'react';
import StudentTable from './components/StudentTable';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, class: 'D25CQCN01' },
  { id: 2, name: 'Trần Thị Bình', score: 4.0, class: 'D25CQCN02' },
  { id: 3, name: 'Lê Minh Cường', score: 6.5, class: 'D25CQCN01' },
  { id: 4, name: 'Phạm Thu Dung', score: 9.0, class: 'D25CQCN03' },
];

const FILTERS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'gioi', label: 'Giỏi (>= 8)' },
  { value: 'truot', label: 'Trượt (< 5)' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ name: '', score: '', class: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const className = form.class.trim();
    const score = Number(form.score);

    if (!name || !className || form.score === '') {
      setError('Vui lòng nhập đầy đủ Họ tên, Điểm số và Lớp.');
      return;
    }
    if (Number.isNaN(score) || score < 0 || score > 10) {
      setError('Điểm số không hợp lệ, phải là số trong khoảng từ 0 đến 10.');
      return;
    }

    const newStudent = { id: Date.now(), name, score, class: className };
    setStudents([...students, newStudent]);
    setForm({ name: '', score: '', class: '' });
    setError('');
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter(({ score }) => {
    if (filter === 'gioi') return score >= 8;
    if (filter === 'truot') return score < 5;
    return true;
  });

  const total = students.length;
  const totalScore = students.reduce((sum, { score }) => sum + score, 0);
  const average = total === 0 ? 0 : totalScore / total;

  return (
    <div className="app">
      <h1>Quản lý Điểm Sinh viên</h1>

      <form className="student-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="score"
          placeholder="Điểm số"
          min="0"
          max="10"
          step="0.1"
          value={form.score}
          onChange={handleChange}
        />
        <input
          type="text"
          name="class"
          placeholder="Lớp"
          value={form.class}
          onChange={handleChange}
        />
        <button type="submit">Thêm</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="filters">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? 'filter active' : 'filter'}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="stats">
        {`Tổng số sinh viên: ${total} - Điểm trung bình của lớp: ${average.toFixed(2)} - Đang hiển thị: ${filteredStudents.length}`}
      </p>

      <StudentTable students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default App;
