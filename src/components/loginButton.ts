export class LoginButton {
  private button: HTMLButtonElement;

  constructor(idName: string, parentId: string) {
    this.button = document.createElement('button');
    this.button.textContent = 'Login';
    this.button.id = idName;
    this.button.onclick = this.navigateToLoginPage.bind(this);

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.button);
    } else {
      console.error(`Parent element with id "${parentId}" not found`);
    }
  }

  private navigateToLoginPage(): void {
    window.location.href = `src/views/loginView.html`;
  }
}
