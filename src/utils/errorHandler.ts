import { toast } from 'react-hot-toast';

export const handleApiError = (error: any, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  const message = 
    error.response?.data?.message || 
    error.message || 
    defaultMessage;
  
  toast.error(message);
  return message;
};

export const handleApiSuccess = (message: string) => {
  toast.success(message);
};
