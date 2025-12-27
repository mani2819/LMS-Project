
// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateQuiz = () => {
//   const [quiz, setQuiz] = useState({
//     title: '',
//     description: '',
//     duration: 10,
//     questions: [
//       { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
//     ],
//   });

//   const handleQuizChange = (e) => {
//     setQuiz({ ...quiz, [e.target.name]: e.target.value });
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...quiz.questions];
//     updatedQuestions[index][field] = value;
//     setQuiz({ ...quiz, questions: updatedQuestions });
//   };

//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updatedQuestions = [...quiz.questions];
//     updatedQuestions[qIndex].options[optIndex] = value;
//     setQuiz({ ...quiz, questions: updatedQuestions });
//   };

//   const addQuestion = () => {
//     setQuiz({
//       ...quiz,
//       questions: [
//         ...quiz.questions,
//         { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
//       ],
//     });
//   };

//   const removeQuestion = (index) => {
//     const updatedQuestions = [...quiz.questions];
//     updatedQuestions.splice(index, 1);
//     setQuiz({ ...quiz, questions: updatedQuestions });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8080/api/v1/quizzes', quiz);
//       alert('Quiz created successfully!');
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Error creating quiz');
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           value={quiz.title}
//           onChange={handleQuizChange}
//           placeholder="Quiz Title"
//           className="w-full p-2 border mb-2"
//           required
//         />
//         <textarea
//           name="description"
//           value={quiz.description}
//           onChange={handleQuizChange}
//           placeholder="Quiz Description"
//           className="w-full p-2 border mb-2"
//           required
//         />
//         <input
//           type="number"
//           name="duration"
//           value={quiz.duration}
//           onChange={handleQuizChange}
//           placeholder="Duration (in minutes)"
//           className="w-full p-2 border mb-4"
//           required
//         />

//         {quiz.questions.map((q, qIndex) => (
//           <div key={qIndex} className="mb-6 border p-3 rounded-md">
//             <h4 className="font-semibold mb-2">Question {qIndex + 1}</h4>
//             <input
//               type="text"
//               value={q.questionText}
//               onChange={(e) =>
//                 handleQuestionChange(qIndex, 'questionText', e.target.value)
//               }
//               placeholder="Enter question"
//               className="w-full p-2 border mb-2"
//               required
//             />
//             {q.options.map((opt, optIndex) => (
//               <div key={optIndex} className="relative mb-2">
//                 <input
//                   type="text"
//                   value={opt}
//                   onChange={(e) =>
//                     handleOptionChange(qIndex, optIndex, e.target.value)
//                   }
//                   placeholder={`Option ${optIndex + 1}`}
//                   className="w-full p-2 border"
//                   required
//                 />
//               </div>
//             ))}
//             <select
//               value={q.correctAnswerIndex}
//               onChange={(e) =>
//                 handleQuestionChange(
//                   qIndex,
//                   'correctAnswerIndex',
//                   parseInt(e.target.value)
//                 )
//               }
//               className="w-full p-2 border"
//             >
//               <option value={0}>Correct Answer: Option 1</option>
//               <option value={1}>Correct Answer: Option 2</option>
//               <option value={2}>Correct Answer: Option 3</option>
//               <option value={3}>Correct Answer: Option 4</option>
//             </select>
//             {/* Remove Question Button */}
//             <button
//               type="button"
//               onClick={() => removeQuestion(qIndex)}
//               className="mt-2 text-red-500 hover:text-red-700 bg-zinc-200"
//             >
//               Remove Question
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addQuestion}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           + Add Question
//         </button>

//         <button
//           type="submit"
//           className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Save Quiz
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateQuiz;
 






import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    duration: 10,
    questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
    ],
  });

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/quizzes', quiz);
      alert('Quiz created successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error creating quiz');
    }
  };
  const handlePublishQuiz = async () => {
    if (!quiz._id) {
      alert('Quiz ID is not defined');
      return;
    }
  
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/quizzes/${quiz._id}/publish`); // Updated port
      alert(res.data.message); // 'Quiz published successfully!'
    } catch (err) {
      console.error(err);
      alert('Error publishing quiz');
    }
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={quiz.title}
          onChange={handleQuizChange}
          placeholder="Quiz Title"
          className="w-full p-2 border mb-2"
          required
        />
        <textarea
          name="description"
          value={quiz.description}
          onChange={handleQuizChange}
          placeholder="Quiz Description"
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="number"
          name="duration"
          value={quiz.duration}
          onChange={handleQuizChange}
          placeholder="Duration (in minutes)"
          className="w-full p-2 border mb-4"
          required
        />

        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6 border p-3 rounded-md">
            <h4 className="font-semibold mb-2">Question {qIndex + 1}</h4>
            <input
              type="text"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, 'questionText', e.target.value)
              }
              placeholder="Enter question"
              className="w-full p-2 border mb-2"
              required
            />
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="relative mb-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, optIndex, e.target.value)
                  }
                  placeholder={`Option ${optIndex + 1}`}
                  className="w-full p-2 border"
                  required
                />
              </div>
            ))}
            <select
              value={q.correctAnswerIndex}
              onChange={(e) =>
                handleQuestionChange(
                  qIndex,
                  'correctAnswerIndex',
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border"
            >
              <option value={0}>Correct Answer: Option 1</option>
              <option value={1}>Correct Answer: Option 2</option>
              <option value={2}>Correct Answer: Option 3</option>
              <option value={3}>Correct Answer: Option 4</option>
            </select>
            {/* Remove Question Button */}
            <button
              type="button"
              onClick={() => removeQuestion(qIndex)}
              className="mt-2 text-red-500 hover:text-red-700 bg-zinc-200"
            >
              Remove Question
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Question
        </button>

        <button
          type="submit"
          className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Quiz
        </button>

        
      </form>
      
      <button
        onClick={handlePublishQuiz}
        className=" mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-black"
      >
        Publish Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;