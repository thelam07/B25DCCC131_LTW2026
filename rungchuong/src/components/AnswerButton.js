const AnswerButton = ({ letter, text, variant, disabled, onClick }) => (
  <button
    className={`answer-btn ${variant}`}
    disabled={disabled}
    onClick={onClick}
  >
    {`${letter}. ${text}`}
  </button>
);

export default AnswerButton;
