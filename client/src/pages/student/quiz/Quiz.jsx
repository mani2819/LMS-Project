import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardTitle } from "@/components/ui"; // Use your UI components

const Quiz = () => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  // Fetch quiz data based on courseId
  const fetchQuizQuestions = async () => {
    try {
      const category = getCategoryByCourse(courseId);  // Map courseId to category
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`);
      setQuizQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  useEffect(() => {
    fetchQuizQuestions();
  }, [courseId]);  // Trigger fetch when courseId changes

  const getCategoryByCourse = (courseId) => {
    // Map courseId to category. Customize this as needed.
    if (courseId === "docker") return 18; // Example category ID for Docker (technology)
    return 18; // Default category
  };

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] === quizQuestions[currentQuestionIndex]?.correct_answer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitQuiz = () => {
    // Final submission and display score
    alert(`Quiz Finished! Your score: ${score}`);
  };

  if (quizQuestions.length === 0) return <p>Loading quiz...</p>;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <Card className="mb-4">
        <CardContent>
          <CardTitle>{`Question ${currentQuestionIndex + 1}: ${currentQuestion?.question}`}</CardTitle>
          <div>
            {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort().map((answer, index) => (
              <Button key={index} onClick={() => handleAnswerSelect(answer)}>
                {answer}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="navigation-buttons">
        {currentQuestionIndex < quizQuestions.length - 1 ? (
          <Button onClick={handleNextQuestion}>Next Question</Button>
        ) : (
          <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
