const AnswerButton = ({ letter, text, variant, disabled, hidden, onClick }) => (
  <button
    className={`answer-btn ${variant} ${hidden ? 'hidden' : ''}`}
    disabled={disabled || hidden}
    onClick={onClick}
  >
    {hidden ? '' : `${letter}. ${text}`}
  </button>
);

export default AnswerButton;
