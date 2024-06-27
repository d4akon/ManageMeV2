import BackButton from '../components/backButton';
import LoginForm from '../components/loginForm';
import { UserService } from '../services/userService';

const backButton = new BackButton('Go back', 'login-page');

const loginForm = new LoginForm('login-page');

loginForm.setOnSubmit(async (event, email, password) => {
  if (await UserService.loginUser(email, password)) {
    window.history.back();
  } else {
    alert('wrong credentials');
  }
});
