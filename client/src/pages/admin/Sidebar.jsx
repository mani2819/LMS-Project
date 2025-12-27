// import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
// import React from 'react'
// import { Link, Outlet } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <div className='flex'>
//       <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 h-screen bg-gray-100">
//         <div className="mt-8 space-y-4">
//           <Link to="dashboard" className="flex items-center gap-2">
//             <ChartNoAxesColumn size={22} className='text-black'/>
//             <span className='text-black'>Dashboard</span>
//           </Link>
//           <Link to="course" className="flex items-center gap-2">
//             <SquareLibrary size={22} className='text-black' />
//             <span className='text-black'>Courses</span>
//           </Link>
//         </div>
//       </div>
//       <div className='flex-1 md:p-16 p-2 bg-white'>
//         <Outlet />
//       </div>
//       </div>
//   );
// };

// export default Sidebar



import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen bg-gray-100 dark:bg-gray-900">
        <div className="space-y-4 ">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} className="text-black dark:text-gray-100"/>
            <span className="text-black dark:text-gray-100">Dashboard</span>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} className="text-black dark:text-gray-100"/>
            <span className="text-black dark:text-gray-100">Courses</span>
          </Link>
        </div>
      </div>
    <div className="flex-1 p-10">
        <Outlet/>
      </div>
    </div>
  );
};

export default Sidebar;
