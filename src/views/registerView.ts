import BackButton from '../components/backButton';
import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';
import { UserService } from '../services/userService';

const backButton = new BackButton('Go back', 'register-page');

const registerForm = new RegisterForm('register-page');

registerForm.setOnSubmit(
  async (event, name, surname, email, password, role) => {
    if (await UserService.registerUser(email, password, name, surname, role)) {
      window.history.back();
    }
  }
);
