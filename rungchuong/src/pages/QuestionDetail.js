import { useParams, useNavigate } from 'react-router-dom';
import { LETTERS, LEVELS, POINTS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((q) => q.id === Number(id));

  return (
    <div>
      {question ? (
        <>
          <h2>
            {`Câu hỏi số ${question.id} – ${question.topic} (${LEVELS[question.level]}, ${POINTS[question.level]} điểm)`}
          </h2>
          <p className="question-text">{question.question}</p>
          <ul className="option-list">
            {question.options.map((option, index) => (
              <li
                key={index}
                className={index === question.answer ? 'option correct' : 'option'}
              >
                {`${LETTERS[index]}. ${option}`}
                {index === question.answer && ' (Đáp án đúng)'}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>Không tìm thấy câu hỏi</h2>
      )}
      <button className="btn" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default QuestionDetail;
