import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  // Set up Axios interceptor for handling token expiration
  axios.interceptors.response.use(
    response => response, 
    error => {
      if (error.response && error.response.status === 401) {
        // Token is expired or invalid, redirect to login page
        toast.error("Session expired. Please log in again.");

        // Remove token from localStorage or cookies
        localStorage.removeItem('token');
        
        // Redirect to login page
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
};

export default useAxiosInterceptor;
