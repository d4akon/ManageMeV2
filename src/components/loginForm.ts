class LoginForm {
  public form: HTMLFormElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;

  constructor(parentId: string) {
    this.form = document.createElement('form');
    this.form.className = 'login-form';

    this.emailInput = document.createElement('input');
    this.emailInput.type = 'email';
    this.emailInput.placeholder = 'Email';
    this.emailInput.name = 'email';
    this.emailInput.required = true;

    this.passwordInput = document.createElement('input');
    this.passwordInput.type = 'password';
    this.passwordInput.placeholder = 'Password';
    this.passwordInput.name = 'password';
    this.passwordInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';

    this.form.appendChild(this.emailInput);
    this.form.appendChild(this.passwordInput);
    this.form.appendChild(submitButton);

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.form);
    } else {
      console.error(`Parent element with id "${parentId}" not found.`);
    }
  }

  public setOnSubmit(
    onSubmitHandler: (event: Event, email: string, password: string) => void
  ): void {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      const email = this.emailInput.value;
      const password = this.passwordInput.value;
      onSubmitHandler(event, email, password);
    };
  }
}

export default LoginForm;
