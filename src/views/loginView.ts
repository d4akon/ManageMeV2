import LoginForm from '../components/loginForm';

const loginForm = new LoginForm();

loginForm.setOnSubmit((event, username, password) => {
  console.log('Username:', username);
  console.log('Password:', password);
});

document.getElementById('login-page')?.appendChild(loginForm.form);
