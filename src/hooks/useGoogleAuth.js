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
        const token = result.data.accessToken; 
        const refreshToken = result.data.refreshToken;

        // ✅ Save token consistently
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user-info', JSON.stringify({ email, name, image }));

        console.log('✅ Google login user:', result.data.user);
        console.log('✅ Token saved:', token);

        navigate('/dashboard');
      }
    } catch (err) {
      console.error('❌ Error while requesting Google code:', err);
    }
  };

  return useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });
};

export default useGoogleAuth;
