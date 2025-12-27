
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';


const quizData = [
  {
    "id": 1,
    "question": "What is the purpose of React?",
    "options": ["To style web pages", "To manage databases", "To build user interfaces", "To create backend APIs"],
    "correctAnswer": 2
  },
  {
    "id": 2,
    "question": "Which method is used to manage state in a functional React component?",
    "options": ["setState()", "useState()", "this.state()", "componentDidMount()"],
    "correctAnswer": 1
  },
  {
    "id": 3,
    "question": "What is JSX?",
    "options": ["A template engine", "A CSS preprocessor", "JavaScript XML", "A data format"],
    "correctAnswer": 2
  },
  {
    "id": 4,
    "question": "What hook is used to perform side effects in functional components?",
    "options": ["useState", "useEffect", "useReducer", "useCallback"],
    "correctAnswer": 1
  },
  {
    "id": 5,
    "question": "Which of these is NOT a valid React hook?",
    "options": ["useEffect", "useContext", "useFetch", "useMemo"],
    "correctAnswer": 2
  },
  {
    "id": 6,
    "question": "What is a key in React lists used for?",
    "options": ["To identify each element uniquely", "To define styles", "To bind event listeners", "To validate props"],
    "correctAnswer": 0
  },
  {
    "id": 7,
    "question": "What is the virtual DOM?",
    "options": ["A real copy of the DOM", "A lightweight JavaScript representation of the DOM", "A library for DOM manipulation", "None of the above"],
    "correctAnswer": 1
  },
  {
    "id": 8,
    "question": "How can you lift state up in React?",
    "options": ["By using context", "By passing functions as props to child components", "By calling setState globally", "By using Redux only"],
    "correctAnswer": 1
  },
  {
    "id": 9,
    "question": "What does the useRef hook return?",
    "options": ["A DOM element", "A reactive value", "A mutable ref object", "An array"],
    "correctAnswer": 2
  },
  {
    "id": 10,
    "question": "Which command creates a new React project using Vite?",
    "options": ["npx create-react-app my-app", "npm install react-vite", "npm init vite@latest my-app", "npx react-vite my-app"],
    "correctAnswer": 2
  }
]

export default function QuizComponent() {

  const [step, setStep] = useState('instructions');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(quizData.length * 30);
  const [isLateSubmit, setIsLateSubmit] = useState(false);

  const userId = 'student-123'; // Replace with real user ID in production
  const savedAttempts = JSON.parse(localStorage.getItem('quiz-attempts') || '{}');
  const userAttempts = savedAttempts[userId] || [];
  const maxAttempts = 5;
  const canAttempt = userAttempts.length < maxAttempts;
  const timeLimit = quizData.length * 30; // 30s per question

  // useEffect(() => {
  //   let interval;
  //   if (step === 'quiz' && canAttempt && !finished) {
  //     if (!startTime) setStartTime(Date.now());
  //     interval = setInterval(() => {
  //       setRemainingTime((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(interval);
  //           setIsLateSubmit(true);
  //           handleSubmit(true);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [step, canAttempt, finished]);


  useEffect(() => {
    let interval;

    if (step === 'quiz' && startTime && !finished) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsLateSubmit(true);
            handleSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step, startTime, finished]);


  // const handleNext = () => {
  //   const newAnswers = [...answers];
  //   newAnswers[current] = { questionId: quizData[current].id, selected: selectedOption };
  //   setAnswers(newAnswers);
  //   setCurrent(current + 1);
  //   setSelectedOption(newAnswers[current + 1]?.selected || null);
  // };

  // const handlePrev = () => {
  //   const newAnswers = [...answers];
  //   newAnswers[current] = { questionId: quizData[current].id, selected: selectedOption };
  //   setAnswers(newAnswers);
  //   setCurrent(current - 1);
  //   setSelectedOption(newAnswers[current - 1]?.selected || null);
  // };


  useEffect(() => {
    setSelectedOption(answers[current]?.selected ?? null);
  }, [current]);

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = { questionId: quizData[current].id, selected: selectedOption };
    setAnswers(newAnswers);
    const nextIndex = current + 1;
    setCurrent(nextIndex);
  };

  const handlePrev = () => {
    const newAnswers = [...answers];
    newAnswers[current] = { questionId: quizData[current].id, selected: selectedOption };
    setAnswers(newAnswers);
    const prevIndex = current - 1;
    setCurrent(prevIndex);
  };

  const handleSubmit = (autoSubmit = false) => {
    const newAnswers = autoSubmit
      ? [...answers]
      : [...answers.slice(0, current), { questionId: quizData[current].id, selected: selectedOption }];

    const endTime = Date.now();
    // const duration = Math.floor((endTime - startTime) / 1000);
    const duration = startTime
      ? Math.floor((endTime - startTime) / 1000)
      : timeLimit;
    const newScore = newAnswers.reduce((acc, ans, i) => {
      return acc + (quizData[i].correctAnswer === ans.selected ? 1 : 0);
    }, 0);

    setTimeTaken(duration);
    setScore(newScore);
    setAnswers(newAnswers);
    setFinished(true);

    const updatedAttempts = {
      ...savedAttempts,
      [userId]: [...userAttempts.slice(0, maxAttempts - 1), { score: newScore, time: duration }],
    };
    localStorage.setItem('quiz-attempts', JSON.stringify(updatedAttempts));
  };


  if (step === 'instructions') {
    return (
      // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto mt-10 p-4">
      //   <Card>
      //     <CardContent className="space-y-4 mt-10 mb-10">
      //       <h2 className="text-2xl font-bold text-center mb-10">Quiz Instructions 📘</h2>
      //       <ul className="list-disc list-inside space-y-2 mb-10">
      //         <li>Total Questions: {quizData.length}</li>
      //         <li>Total Marks: {quizData.length}</li>
      //         <li>Total Time: {timeLimit} seconds</li>
      //         <li>You have up to <strong>{maxAttempts} attempts</strong> to complete this quiz.</li>
      //       </ul>
      //       <br />
      //       <center>
      //         {/* <Button className='text-center' onClick={() => setStep('quiz')} >Start Quiz</Button> */}
      //         <Button
      //           className='text-center'
      //           onClick={() => {
      //             setStartTime(Date.now());
      //             setStep('quiz');
      //           }}
      //         >
      //           Start Quiz
      //         </Button>
      //       </center>
      //     </CardContent>
      //   </Card>
      // </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto mt-10 p-4">
  <Card>
    <CardContent className="space-y-4 mt-10 mb-10">
      <h2 className="text-2xl font-bold text-center mb-10">Quiz Instructions 📘</h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Total Questions: {quizData.length}</li>
        <li>Total Marks: {quizData.length}</li>
        <li>Total Time: {timeLimit} seconds</li>
        <li>You have up to <strong>{maxAttempts} attempts</strong> to complete this quiz.</li>
      </ul>

      {canAttempt ? (
        <div className='text-center'>
          <Button
            className="mt-4"
            onClick={() => {
              setStartTime(Date.now());
              setStep('quiz');
            }}
          >
            Start Quiz
          </Button>
        </div>
      ) : (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 text-center">
          <strong>Oops! 🛑</strong> You've reached the maximum number of attempts.
        </div>
      )}

      {userAttempts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 underline">Previous Attempts 📊</h3>
          <ul className="space-y-2 text-sm">
            {userAttempts.map((attempt, index) => (
              <li key={index} className="flex justify-between border-b pb-1">
                <span>Attempt {index + 1}</span>
                <span>Score: {attempt.score}/{quizData.length}, Time: {attempt.time}s</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
</motion.div>

    );
  }

  if (finished) {
    const quizLink = `${window.location.origin}/quiz`;
    const correct = score;
    const wrong = quizData.length - score;


    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto mt-10 p-4">
        <Card>
          <CardContent className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold text-center">Quiz Completed ✅</h2>
            {isLateSubmit && <p className="text-red-500 font-semibold text-lg">⏰ Time's up! Auto-submitted.</p>}
            <p><strong>Score:</strong> {score} / {quizData.length}</p>
            <p><strong>Time Taken:</strong> {timeTaken} seconds</p>
            <p><strong>Correct Answers:</strong> {correct}</p>
            <p className='mb-10'><strong>Wrong Answers:</strong> {wrong}</p>
            <div className='mt-10 box-content border-2 p-5 border-gray-400 border-r-slate-400 rounded-xl justify-center text-center shadow-xl shadow-slate-200'>
              <strong>Sharable Link :</strong>{' '}

              <span className="text-blue-600 underline cursor-pointer" onClick={() => navigator.clipboard.writeText(quizLink)}>{quizLink}</span>
            </div>
            <div>
              <h3 className="font-semibold mt-5 mb-4 text-xl underline">Review:</h3>
              {quizData.map((q, i) => (
                <div key={q.id} className="mb-4">
                  <p className="font-medium mb-2">{q.question}</p>
                  {q.options.map((opt, j) => (
                    <div
                      key={j}
                      className={`px-2 py-1 rounded mb-2 ${j === q.correctAnswer
                          ? 'bg-green-100'
                          : j === answers[i]?.selected && j !== q.correctAnswer
                            ? 'bg-red-100'
                            : ''
                        }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* <Button onClick={handleContinueCourse}>Back to Course</Button> */}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto mt-10 p-4 relative mb-5">
      {/* <div className="absolute right-4 top-4 text-sm text-gray-500">⏱️ {remainingTime}s left</div> */}

      <div className="absolute right-4 top-4 mt-10 mr-10">
        <div className="bg-gray-300  border border-gray-300 rounded-xl shadow-md px-4 py-1 text-sm font-medium text-gray-700">
          ⏱️ {remainingTime}s left
        </div>
      </div>




      <Card>
        <CardContent className="space-y-4 mt-20">
          <h2 className="text-xl font-bold">{quizData[current].question}</h2>
          <div className="space-y-2">
            {quizData[current].options.map((opt, i) => (
              <Button
                key={i}
                variant={selectedOption === i ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedOption(i)}
              >
                {opt}
              </Button>
            ))}
          </div>
          <p className="text-right text-sm text-gray-500">Question {current + 1} of {quizData.length}</p>
          <div className="flex justify-between gap-2 pt-4">
            {current > 0 && (
              <Button onClick={handlePrev}>Previous</Button>
            )}
            <div className="flex gap-2 ml-auto">
              {current < quizData.length - 1 && (
                <Button onClick={handleNext} disabled={selectedOption === null}>
                  Next
                </Button>
              )}
              {current === quizData.length - 1 && (
                <Button onClick={() => handleSubmit()} disabled={selectedOption === null}>
                  Submit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}



