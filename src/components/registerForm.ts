import { Role } from '../enums/role';

class RegisterForm {
  public form: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private surnameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private roleSelect: HTMLSelectElement;

  constructor(parentId: string) {
    this.form = document.createElement('form');
    this.form.className = 'login-form';

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Enter your name';
    this.nameInput.name = 'name';
    this.nameInput.required = true;

    this.surnameInput = document.createElement('input');
    this.surnameInput.type = 'text';
    this.surnameInput.placeholder = 'Enter your surname';
    this.surnameInput.name = 'name';
    this.surnameInput.required = true;

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

    this.roleSelect = document.createElement('select');
    this.roleSelect.name = 'role';
    Object.keys(Role)
      .filter((key) => isNaN(Number(key)))
      .forEach((key) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        this.roleSelect.appendChild(option);
      });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Register';

    this.form.appendChild(this.nameInput);
    this.form.appendChild(this.surnameInput);
    this.form.appendChild(this.emailInput);
    this.form.appendChild(this.passwordInput);
    this.form.appendChild(this.roleSelect);
    this.form.appendChild(submitButton);

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.form);
    } else {
      console.error(`Parent element with id "${parentId}" not found.`);
    }
  }

  public setOnSubmit(
    onSubmitHandler: (
      event: Event,
      name: string,
      surname: string,
      email: string,
      password: string,
      role: Role
    ) => void
  ): void {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      const name = this.nameInput.value;
      const surname = this.surnameInput.value;
      const email = this.emailInput.value;
      const password = this.passwordInput.value;
      const role = Role[this.roleSelect.value as keyof typeof Role];
      onSubmitHandler(event, name, surname, email, password, role);
    };
  }
}

export default RegisterForm;
