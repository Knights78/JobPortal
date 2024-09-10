import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { gapi } from 'gapi-script';
import { useEffect } from 'react'
const Navbar = () => {
    // const { user } = useSelector(store => store.auth);
    const navigate=useNavigate();
    // const dispatch=useDispatch();
    const logoutHandler = async () => {
        try {
          const auth2 = gapi.auth2.getAuthInstance();
          console.log(auth2)
          if (auth2 && auth2.isSignedIn.get()) {
            console.log("Inside")
            await auth2.signOut();
            console.log('User signed out from Google');
      
            // Check if the user is signed out
            const isLoggedOut = !auth2.isSignedIn.get();
            if (isLoggedOut) {
              console.log('Google logout successful');
            } else {
              console.log('Google logout failed');
            }
          }
      
          // Proceed with backend logout
          const res = await axios.get(`http://localhost:3000/api/v1/user/logout`, { withCredentials: true });
          
          if (res.data.success) {
           // dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || 'Logout failed');
        }
      };
      
      // Ensure gapi.auth2 is initialized properly on component mount
      useEffect(() => {
        gapi.load('auth2', () => {
          gapi.auth2.init({
            clientId: '110336232874-1vqqams19gtugdgcja15hqmoirnj5hu3.apps.googleusercontent.com',
          });
        });
      }, []);
    const user=false
  return (
    <div className='bg-white'>
    <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
            <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
            <ul className='flex text-xl items-center gap-5'>
                    {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:underline hover:decoration-black">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:underline hover:decoration-black">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                            <li><Link to="/" className="hover:underline hover:decoration-black">Home</Link></li>
                                            <li><Link to="/jobs" className="hover:underline hover:decoration-black">Jobs</Link></li>
                                            <li><Link to="/browse" className="hover:underline hover:decoration-black">Browse</Link></li>
                                </>
                            )
                        }
                  


            </ul>
            
                { !user ? ( 
                        <div className='flex items-center gap-2'>
                        <Link to="/login"><Button className="text-xl" variant="outline">Login</Button></Link>
                        <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-xl">Signup</Button></Link>

                    </div>
                ):(
                    <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage  className='w-20 h-15 rounded-full' src="https://github.com/shadcn.png" alt="@shadcn" />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className=''>
                            <div className='flex gap-2 space-y-2'>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                                <div className='mx-1.5 mb-4 '>
                                    <h4 className='font-medium mx-1.5'>MOHD SAIF</h4>
                                    <p className='text-sm text-muted-foreground'>WEB DEVELOPER</p>
                                </div>
                            </div>
                            <div className='flex flex-col my-2 text-gray-600'>
                                
                                    
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                        </div>
                                    
                                

                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <LogOut />
                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
           
                )
                }
                    
               
                    

        </div>
    </div>

</div>
  )
}

export default Navbar