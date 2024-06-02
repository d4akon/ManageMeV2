class LoginForm {
  public form: HTMLFormElement;
  private usernameInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;

  constructor() {
    this.form = document.createElement('form');
    this.form.className = 'login-form';

    this.usernameInput = document.createElement('input');
    this.usernameInput.type = 'text';
    this.usernameInput.placeholder = 'Username';
    this.usernameInput.name = 'username';
    this.usernameInput.required = true;

    this.passwordInput = document.createElement('input');
    this.passwordInput.type = 'password';
    this.passwordInput.placeholder = 'Password';
    this.passwordInput.name = 'password';
    this.passwordInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';

    this.form.appendChild(this.usernameInput);
    this.form.appendChild(this.passwordInput);
    this.form.appendChild(submitButton);
  }

  public setOnSubmit(
    onSubmitHandler: (event: Event, username: string, password: string) => void
  ): void {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      const username = this.usernameInput.value;
      const password = this.passwordInput.value;
      onSubmitHandler(event, username, password);
    };
  }
}

export default LoginForm;
