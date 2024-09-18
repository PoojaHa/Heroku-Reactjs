import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useLoginMutation, useRegisterMutation } from '../redux/Auth/authApi';
import { saveToken } from '../redux/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState(""); // For signup
  const [isLogin, setIsLogin] = React.useState(true); // Toggle between login and signup

  const [login, { isLoading: loginLoading, isError: loginError }] = useLoginMutation();
  const [signup, { isLoading: signupLoading, isError: signupError }] = useRegisterMutation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (isLogin) {
        const res = await login({ email, password }).unwrap();
        console.log("res",res)
        dispatch(saveToken(res));
        navigate('/task');
      } else {
        const res = await signup({ name, email, password }).unwrap();
        dispatch(saveToken(res.token));
        navigate('/login');
      }
    } catch (err) {
      console.error(`${isLogin ? 'Login' : 'Signup'} failed: `, err);
    }
  };

  return (
    <Box sx={{ width: 500, maxWidth: '100%', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
        )}
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        
        {/* Error Messages */}
        {(isLogin && loginError) && (
          <Typography color="error" variant="body2">
            Login failed. Please check your credentials.
          </Typography>
        )}
        {(!isLogin && signupError) && (
          <Typography color="error" variant="body2">
            Signup failed. Please try again.
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLogin ? loginLoading : signupLoading}
          sx={{ mt: 2 }}
        >
          {isLogin
            ? (loginLoading ? <CircularProgress size={24} /> : 'Login')
            : (signupLoading ? <CircularProgress size={24} /> : 'Signup')}
        </Button>

        {/* Toggle between login and signup */}
        <Typography align="center" sx={{ mt: 2 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Signup' : 'Login'}
          </Button>
        </Typography>
      </form>
    </Box>
  );
}