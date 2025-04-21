import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleAuth } from '../api/GoogleAuthApi.js';

const useGoogleAuth = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, name, image } = result.data.user;
        const token = result.data.token;

        const obj = { email, name, image, token };
        localStorage.setItem('token', token); 
        localStorage.setItem('user-info', JSON.stringify(obj));

        console.log('result.data.user---', result.data.user);
        console.log(token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error While Requesting Google Code', err);
    }
  };

  return useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });
};

export default useGoogleAuth;
