import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    };
    console.log(user);

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User log out");
            navigate("/login");
        }
    }, [isSuccess])

    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 flxed top-0 left-0 right-0 duration-300 z-10'>
            {/* Desktop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <Link to="/" className='text-black hover:text-black'>
                        <h1 className='hidden md:block font-extrabold text-2xl dark:text-gray-100'>
                            E-Learning
                        </h1>
                    </Link>
                </div>
                {/* User icons and dark mode icon */}
                <div className='flex items-center gap-8'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"}
                                            alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem><Link to="my-learning" className="text-black font-normal hover:text-gray-700 dark:text-gray-100">My Learning</Link></DropdownMenuItem>
                                        <DropdownMenuItem><Link to="profile" className='text-black font-normal hover:text-gray-700 dark:text-gray-100'>Edit Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {
                                        user?.role === "instructor" && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem><Link to="/admin/dashboard" className='text-black font-normal hover:text-gray-700 dark:text-gray-100'>Dashboard</Link></DropdownMenuItem>
                                            </>
                                        )
                                    }

                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/login")}>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>
            </div>
            {/* Mobile device */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl dark:text-gray-100'>E-Learning</h1>
                <MobileNavbar user={user} />
            </div>
        </div>
    );
};
export default Navbar;

// const MobileNavbar = ({user}) => {
//     const navigate = useNavigate();
//     const role = "instructor";
//     return (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button size='icon' className="rounded-full  hover:bg-gray-200" variant="outline">
//                     <Menu />
//                 </Button>
//             </SheetTrigger>
//             <SheetContent className="flex flex-col">
//                 <SheetHeader className="flex flex-row items-center justify-between mt-5 ">
//                     <SheetTitle><Link to="/" className="text-black font-normal hover:text-gray-700 dark:text-gray-100">E-Learning</Link></SheetTitle>
//                     <DarkMode />
//                 </SheetHeader>
//                 <Separator className='mr-2' />
//                 <nav className='flex flex-col space-y-4'>
//                     <Link to="/my-learning" className="text-black font-normal hover:text-gray-700 dark:text-gray-100">My Learning</Link>
//                     <Link to="/profile" className="text-black font-normal hover:text-gray-700 dark:text-gray-100">Edit Profile</Link>
                   
//                     <p>Log out</p>
//                 </nav>
//                 {
//                     user?.role === "instructor" && (
//                         <SheetFooter>
//                             <SheetClose asChild>
//                                 <Button type="submit" onClick={()=> navigate("/admin/dashboard")}>Dashboard</Button>
//                             </SheetClose>
//                         </SheetFooter>
//                     )
//                 }

//             </SheetContent>
//         </Sheet>
//     )
// }

const MobileNavbar = ({ user }) => {
    const navigate = useNavigate();
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

    const logoutHandler = async () => {
        await logoutUser();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User logged out");
            navigate("/login");
        }
    }, [isSuccess]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full hover:bg-gray-200" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-5 ">
                    <SheetTitle>
                        <Link to="/" className="text-black font-normal hover:text-gray-700 dark:text-gray-100">
                            E-Learning
                        </Link>
                    </SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr-2' />
                <nav className='flex flex-col space-y-4'>
                    <Link to="/my-learning" className="text-black font-normal hover:text-gray-700 dark:text-gray-100">My Learning</Link>
                    <Link to="/profile" className="text-black font-normal hover:text-gray-700 dark:text-gray-100">Edit Profile</Link>

                    {/* 🔧 Proper logout logic here */}
                    <p onClick={logoutHandler} className="text-left text-black font-normal hover:text-gray-700 dark:text-gray-100">
                        Log out
                    </p>
                </nav>
                {
                    user?.role === "instructor" && (
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet>
    );
};
