const Helpers = ({ used, lifelineOn, disabled, onFifty, onExtra, onLifeline }) => (
  <div className="helpers">
    <button className="btn helper" disabled={disabled || used.fifty} onClick={onFifty}>
      Loại 1 đáp án
    </button>
    <button className="btn helper" disabled={disabled || used.extra} onClick={onExtra}>
      Thêm 15 giây
    </button>
    <button
      className={lifelineOn ? 'btn helper on' : 'btn helper'}
      disabled={disabled || used.lifeline}
      onClick={onLifeline}
    >
      {lifelineOn ? 'Phao đang bật' : 'Phao cứu sinh'}
    </button>
  </div>
);

export default Helpers;
