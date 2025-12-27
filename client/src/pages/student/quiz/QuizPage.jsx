// import { BASE_URL } from "@/config";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner"; // Assuming you're using this for notifications
// // 👈 Import the base URL
// const QuizPage = () => {
//   const { courseId } = useParams(); // Getting the courseId from the URL
//   const [quizData, setQuizData] = useState(null); // State to store quiz data
//   const [isLoading, setIsLoading] = useState(true); // Loading state
//   const [isError, setIsError] = useState(false); // Error state

//   // Fetch quiz data function
//   // const fetchQuiz = async () => {
//   //   try {
//   //     setIsLoading(true); // Set loading to true while fetching
//   //     const response = await fetch(`/api/quiz/${courseId}`); // Make sure the endpoint is correct
//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }
//   //     const data = await response.json(); // Parse the JSON response
//   //     setQuizData(data); // Set the quiz data to state
//   //     setIsLoading(false); // Set loading to false after fetching
//   //   } catch (error) {
//   //     console.error("Fetch error:", error);
//   //     setIsError(true); // Set error state if there's an error
//   //     setIsLoading(false); // Set loading to false
//   //     toast.error("Failed to load quiz data."); // Show error message to the user
//   //   }
//   // };

//   const fetchQuiz = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/quizzes/course/${courseId}`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setQuizData(data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };
  
//   // Call fetchQuiz when the component mounts
//   useEffect(() => {
//     fetchQuiz();
//   }, [courseId]); // The effect runs again if courseId changes

//   // Show loading or error message if necessary
//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Failed to load quiz data.</p>;






//   return (
//     <div className="max-w-7xl mx-auto p-4 bg-white">
//       <h1 className="text-2xl font-bold mb-4">Quiz for Course {courseId}</h1>

//       {/* Render quiz data here */}
//       {quizData && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">{quizData.title}</h2>
//           {/* Loop through the quiz questions */}
//           {quizData.questions.map((question, index) => (
//             <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <p className="font-medium">{question.questionText}</p>
//               <div className="space-y-2 mt-2">
//                 {question.options.map((option, i) => (
//                   <div key={i} className="flex items-center">
//                     <input
//                       type="radio"
//                       id={`option-${index}-${i}`}
//                       name={`question-${index}`}
//                       value={option}
//                       className="mr-2"
//                     />
//                     <label htmlFor={`option-${index}-${i}`} className="text-gray-700">
//                       {option}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching quiz data from an API or database
  useEffect(() => {
    // Mock function to simulate fetching quiz data based on courseId
    // const fetchQuizData = async () => {
    //   try {
    //     setLoading(true);
    //     // Example of fetching data (replace with your actual API call)
    //     const response = await fetch(`/api/quiz/${courseId}`);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch quiz data');
    //     }
    //     const data = await response.json();
    //     setQuizData(data);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/quiz/${courseId}`);
    
        const text = await response.text(); // Read the raw response as text
        console.log(text); // Log the response for debugging
    
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
    
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = JSON.parse(text); // Parse the response as JSON
          setQuizData(data);
        } else {
          throw new Error("Expected JSON response, but got something else");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchQuizData();
  }, [courseId]);

  // Loading state
  if (loading) {
    return <div>Loading quiz...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If quiz data exists, display it
  return (
    <div className="quiz-page">
      <h1>Quiz for Course {courseId}</h1>
      {quizData ? (
        <div>
          <h2>{quizData.title}</h2>
          <p>{quizData.description}</p>
          
          <div className="questions">
            {quizData.questions.map((question, index) => (
              <div key={index} className="question">
                <p>{index + 1}. {question.text}</p>
                <ul>
                  {question.options.map((option, i) => (
                    <li key={i}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                      />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button className="submit-quiz">Submit Quiz</button>
        </div>
      ) : (
        <p>No quiz data available.</p>
      )}
    </div>
  );
};

export default QuizPage;
