import AnswerButton from './AnswerButton';
import { LETTERS, LEVELS } from '../data';

const getVariant = (index, status, selected, answer) => {
  if (status === 'locked' && index === selected) return 'pending';
  if (status === 'revealed') {
    if (index === answer) return 'correct';
    if (index === selected) return 'wrong';
  }
  return '';
};

const QuestionCard = ({ question, number, total, status, selected, hidden, onChoose }) => (
  <div className="question-card">
    <p className="question-meta">
      {`Câu ${number}/${total} · ${question.topic} · ${LEVELS[question.level]}`}
    </p>
    <p className="question-text">{question.question}</p>
    <div className="answer-grid">
      {question.options.map((option, index) => (
        <AnswerButton
          key={index}
          letter={LETTERS[index]}
          text={option}
          variant={getVariant(index, status, selected, question.answer)}
          disabled={status !== 'answering'}
          hidden={index === hidden}
          onClick={() => onChoose(index)}
        />
      ))}
    </div>
  </div>
);

export default QuestionCard;
