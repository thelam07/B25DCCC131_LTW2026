const getCellClass = (answer, isCurrent) => {
  const classes = ['cell'];
  if (answer && answer.correct) classes.push('correct');
  if (isCurrent) classes.push('current');
  return classes.join(' ');
};

const ScoreBoard = ({ score, total, answers, current }) => (
  <div className="scoreboard">
    <p className="score">{`Điểm: ${score}`}</p>
    <div className="cells">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={getCellClass(answers[i], i === current)}>
          {i + 1}
        </span>
      ))}
    </div>
  </div>
);

export default ScoreBoard;
