const StudentItem = ({ student, index, onDelete }) => {
  const { id, name, score, class: className } = student;
  const rank = score >= 8 ? 'Giỏi' : score >= 5 ? 'Đạt' : 'Trượt';
  const rankClass = score >= 8 ? 'gioi' : score >= 5 ? 'dat' : 'truot';

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td>{score.toFixed(1)}</td>
      <td className={rankClass}>{rank}</td>
      <td>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(id)}
          title={`Xóa sinh viên ${name}`}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
