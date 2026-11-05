import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import { TIME_PER_QUESTION } from '../data';
import { calcScore, getRank } from '../utils';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  // "answering" → "locked" → "revealed"
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const total = questions.length;
  const question = questions[index];
  const score = calcScore(answers);

  const finish = (finalAnswers, reason) => {
    const finalScore = calcScore(finalAnswers);
    navigate('/result', {
      replace: true,
      state: {
        name: playerName,
        score: finalScore,
        rank: getRank(finalScore),
        correctCount: finalAnswers.filter((a) => a.correct).length,
        reason,
      },
    });
  };

  const goNext = () => {
    const correct = selected === question.answer;
    const newAnswers = [...answers, { id: question.id, level: question.level, correct }];
    const isLast = index === total - 1;

    if (correct && !isLast) {
      setAnswers(newAnswers);
      setIndex(index + 1);
      setSelected(null);
      setTimeLeft(TIME_PER_QUESTION);
      setStatus('answering');
      return;
    }

    if (correct) finish(newAnswers, 'bell');
    else finish(newAnswers, selected === null ? 'timeout' : 'wrong');
  };

  const handleChoose = (optionIndex) => {
    if (status !== 'answering') return;
    setSelected(optionIndex);
    setStatus('locked');
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

  return (
    <div className="play">
      <div className="play-header">
        <span>{`Người chơi: ${playerName}`}</span>
        <Timer timeLeft={timeLeft} />
      </div>
      <ScoreBoard score={score} total={total} answers={answers} current={index} />
      <QuestionCard
        question={question}
        number={index + 1}
        total={total}
        status={status}
        selected={selected}
        onChoose={handleChoose}
      />
    </div>
  );
};

export default Play;
