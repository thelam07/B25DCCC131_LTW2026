import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Helpers from '../components/Helpers';
import { EXTRA_TIME, TIME_PER_QUESTION } from '../data';
import { calcScore, getRank } from '../utils';

const KEYS = ['1', '2', '3', '4'];

const Play = ({ questions, playerName, onFinish }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  // "answering" → "locked" → "revealed"
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [used, setUsed] = useState({ fifty: false, extra: false, lifeline: false });
  const [hidden, setHidden] = useState(null);
  const [lifelineOn, setLifelineOn] = useState(false);

  const total = questions.length;
  const question = questions[index];
  const score = calcScore(answers);

  const finish = (finalAnswers, reason) => {
    const finalScore = calcScore(finalAnswers);
    const result = {
      name: playerName,
      score: finalScore,
      rank: getRank(finalScore),
      correctCount: finalAnswers.filter((a) => a.correct).length,
    };
    onFinish(result);
    navigate('/result', { replace: true, state: { ...result, reason } });
  };

  const goNext = () => {
    const correct = selected === question.answer;
    const saved = !correct && lifelineOn;
    const newAnswers = [
      ...answers,
      { id: question.id, level: question.level, correct, saved },
    ];
    const isLast = index === total - 1;

    if ((correct || saved) && !isLast) {
      setAnswers(newAnswers);
      setIndex(index + 1);
      setSelected(null);
      setHidden(null);
      setLifelineOn(false);
      setTimeLeft(TIME_PER_QUESTION);
      setStatus('answering');
      return;
    }

    if (correct || saved) {
      finish(newAnswers, newAnswers.every((a) => a.correct) ? 'bell' : 'completed');
    } else {
      finish(newAnswers, selected === null ? 'timeout' : 'wrong');
    }
  };

  const handleChoose = (optionIndex) => {
    if (status !== 'answering' || optionIndex === hidden) return;
    setSelected(optionIndex);
    setStatus('locked');
  };

  const handleFifty = () => {
    const wrongOptions = question.options
      .map((_, i) => i)
      .filter((i) => i !== question.answer);
    setHidden(wrongOptions[Math.floor(Math.random() * wrongOptions.length)]);
    setUsed({ ...used, fifty: true });
  };

  const handleExtra = () => {
    setTimeLeft((t) => t + EXTRA_TIME);
    setUsed({ ...used, extra: true });
  };

  const handleLifeline = () => {
    setLifelineOn(true);
    setUsed({ ...used, lifeline: true });
  };

  // Đồng hồ: chỉ chạy khi đang trả lời
  useEffect(() => {
    if (status !== 'answering') return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(id);
  }, [status, index]);

  // Hết giờ: lộ đáp án đúng ngay
  useEffect(() => {
    if (status === 'answering' && timeLeft === 0) setStatus('revealed');
  }, [status, timeLeft]);

  // Các bước chờ: locked --2s--> revealed --1,5s--> câu tiếp / kết thúc
  useEffect(() => {
    if (status === 'locked') {
      const id = setTimeout(() => setStatus('revealed'), 2000);
      return () => clearTimeout(id);
    }
    if (status === 'revealed') {
      const id = setTimeout(goNext, 1500);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Phím tắt 1–4 chọn đáp án A–D
  useEffect(() => {
    const handleKey = (e) => {
      const optionIndex = KEYS.indexOf(e.key);
      if (status !== 'answering' || optionIndex === -1 || optionIndex === hidden) return;
      setSelected(optionIndex);
      setStatus('locked');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hidden]);

  // Tiêu đề tab
  useEffect(() => {
    document.title = `Câu ${index + 1}/${total} – ${score} điểm`;
    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [index, total, score]);

  return (
    <div className="play">
      <div className="play-header">
        <span>{`Người chơi: ${playerName}`}</span>
        <Timer timeLeft={timeLeft} />
      </div>
      <ScoreBoard score={score} total={total} answers={answers} current={index} />
      <Helpers
        used={used}
        lifelineOn={lifelineOn}
        disabled={status !== 'answering'}
        onFifty={handleFifty}
        onExtra={handleExtra}
        onLifeline={handleLifeline}
      />
      <QuestionCard
        question={question}
        number={index + 1}
        total={total}
        status={status}
        selected={selected}
        hidden={hidden}
        onChoose={handleChoose}
      />
    </div>
  );
};

export default Play;
