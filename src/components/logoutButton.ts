import { UserService } from '../services/userService';

export class LogoutButton {
  private button: HTMLButtonElement;

  constructor(idName: string, parentId: string) {
    this.button = document.createElement('button');
    this.button.textContent = 'Logout';
    this.button.id = idName;
    this.button.onclick = this.logoutUser.bind(this);
    if (!UserService.isLoggedIn()) this.button.style.display = 'none';

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.button);
    } else {
      console.error(`Parent element with id "${parentId}" not found`);
    }
  }

  private async logoutUser() {
    await UserService.logoutUser();
    location.reload();
  }
}
