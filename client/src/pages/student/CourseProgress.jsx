// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import {
//   useCompleteCourseMutation,
//   useGetCourseProgressQuery,
//   useInCompleteCourseMutation,
//   useUpdateLectureProgressMutation,
// } from "@/features/api/courseProgressApi";
// import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";

// const CourseProgress = () => {
//   const params = useParams();
//   const courseId = params.courseId; // Get courseId from URL
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);

//   // Fetch course progress data
//   const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

//   // Mutations for marking course as complete or incomplete
//   const [updateLectureProgress] = useUpdateLectureProgressMutation();
//   const [
//     completeCourse,
//     { data: markCompleteData, isSuccess: completedSuccess },
//   ] = useCompleteCourseMutation();
//   const [
//     inCompleteCourse,
//     { data: markInCompleteData, isSuccess: inCompletedSuccess },
//   ] = useInCompleteCourseMutation();

//   // Handle success of course completion or incompletion
//   useEffect(() => {
//     if (completedSuccess) {
//       refetch();
//       toast.success(markCompleteData.message);
//     }
//     if (inCompletedSuccess) {
//       refetch();
//       toast.success(markInCompleteData.message);
//     }
//   }, [completedSuccess, inCompletedSuccess]);

//   const [currentLecture, setCurrentLecture] = useState(null);

//   // Loading and error states
//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Failed to load course details</p>;

//   const { courseDetails, progress, completed } = data.data;
//   const { courseTitle } = courseDetails;

//   const initialLecture =
//     currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

//   // Check if a lecture is completed
//   const isLectureCompleted = (lectureId) => {
//     return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
//   };

//   // Update lecture progress
//   const handleLectureProgress = async (lectureId) => {
//     await updateLectureProgress({ courseId, lectureId });
//     refetch();
//   };

//   // Select and set the current lecture
//   const handleSelectLecture = (lecture) => {
//     setCurrentLecture(lecture);
//     handleLectureProgress(lecture._id);
//   };

//   // Mark course as completed
//   const handleCompleteCourse = async () => {
//     await completeCourse(courseId);
//   };

//   // Mark course as incomplete
//   const handleInCompleteCourse = async () => {
//     await inCompleteCourse(courseId);
//   };

//   // Navigate to the quiz page for this course
//   const handleTakeQuiz = () => {
//     navigate(`/quiz/${courseId}`);  // Passing the courseId as a part of the URL
//   };
//   return (
//     <div className="max-w-7xl mx-auto p-4 bg-white">
//       <div className="flex justify-between mb-4 items-center flex-wrap gap-2">
//         <h1 className="text-2xl font-bold">{courseTitle}</h1>
//         <div className="flex gap-2">
//           <Button
//             onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
//             variant={completed ? "outline" : "default"}
//           >
//             {completed ? (
//               <div className="flex items-center">
//                 <CheckCircle className="h-4 w-4 mr-2" />
//                 <span>Completed</span>
//               </div>
//             ) : (
//               "Mark as completed"
//             )}
//           </Button>



//           {user?.role === 'instructor' && (
//             <Button variant="outline"
//               className="btn-primary bg-green-300"
//               onClick={handleTakeQuiz}
//             >
//               Create Quiz
//             </Button>
//           )}




//           {user?.role === 'student' && (
//             <Button variant="outline"
//               className="btn-primary bg-green-300"
//               onClick={handleTakeQuiz}
//             >
//               Take Quiz
//             </Button>
//           )}

//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Video Section */}
//         <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
//           <video
//             src={currentLecture?.videoUrl || initialLecture.videoUrl}
//             controls
//             className="w-full h-auto md:rounded-lg"
//             onPlay={() =>
//               handleLectureProgress(currentLecture?._id || initialLecture._id)
//             }
//           />
//           <div className="mt-2">
//             <h3 className="font-medium text-lg">
//               {`Lecture ${courseDetails.lectures.findIndex(
//                 (lec) =>
//                   lec._id === (currentLecture?._id || initialLecture._id)
//               ) + 1
//                 } : ${currentLecture?.lectureTitle || initialLecture.lectureTitle
//                 }`}
//             </h3>
//           </div>
//         </div>

//         {/* Lecture Sidebar */}
//         <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
//           <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
//           <div className="flex-1 overflow-y-auto">
//             {courseDetails?.lectures.map((lecture) => (
//               <Card
//                 key={lecture._id}
//                 className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id
//                     ? "bg-gray-200 dark:dark:bg-gray-800"
//                     : ""
//                   }`}
//                 onClick={() => handleSelectLecture(lecture)}
//               >
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div className="flex items-center">
//                     {isLectureCompleted(lecture._id) ? (
//                       <CheckCircle2 size={24} className="text-green-500 mr-2" />
//                     ) : (
//                       <CirclePlay size={24} className="text-gray-500 mr-2" />
//                     )}
//                     <CardTitle className="text-lg font-medium">
//                       {lecture.lectureTitle}
//                     </CardTitle>
//                   </div>
//                   {isLectureCompleted(lecture._id) && (
//                     <Badge
//                       variant="outline"
//                       className="bg-green-200 text-green-600"
//                     >
//                       Completed
//                     </Badge>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseProgress;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const CourseProgress = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Fetch course progress
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  // Mutations for lecture progress and course completion
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: completeMsg, isSuccess: completeSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: incompleteMsg, isSuccess: incompleteSuccess }] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completeSuccess) {
      refetch();
      toast.success(completeMsg.message || "Course marked as completed");
    }
    if (incompleteSuccess) {
      refetch();
      toast.success(incompleteMsg.message || "Course marked as incomplete");
    }
  }, [completeSuccess, incompleteSuccess]);

  if (isLoading) return <p className="p-4">Loading course progress...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load course progress.</p>;

  const { courseDetails, progress, completed } = data.data;
  const initialLecture = currentLecture || (courseDetails.lectures?.[0] || {});
  const isLectureCompleted = (lectureId) => progress.some((p) => p.lectureId === lectureId && p.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const handleQuizAction = () => {
    if (user?.role === 'instructor') {
      navigate(`/quiz/create/${courseId}`); // Instructor creates a quiz
    } else {
      navigate(`/quiz`); // Student views instructions or takes quiz
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      <div className="flex justify-between mb-4 items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
        <div className="flex gap-2">
          <Button
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
          >
            {completed ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </div>
            ) : (
              "Mark as completed"
            )}
          </Button>



          <Button variant="outline"
            className="btn-primary bg-green-300"
            onClick={handleQuizAction}
          >
            {user?.role === 'instructor' ? 'Create Quiz' : 'Take Quiz'}
          </Button>

        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <video
            src={currentLecture?.videoUrl || initialLecture.videoUrl}
            controls
            className="w-full h-auto rounded-lg"
            onPlay={() =>
              handleLectureProgress(currentLecture?._id || initialLecture._id)
            }
          />
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${courseDetails.lectures.findIndex(
                (lec) =>
                  lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1} : ${currentLecture?.lectureTitle || initialLecture.lectureTitle
                }`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 transition cursor-pointer ${lecture._id === currentLecture?._id ? "bg-gray-100" : ""
                  }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <CardTitle className="text-lg font-medium">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge variant="outline" className="bg-green-200 text-green-600">
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
