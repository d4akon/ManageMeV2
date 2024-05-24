class BackButton {
  private button: HTMLButtonElement;

  constructor(buttonText: string, parentId: string) {
    this.button = document.createElement('button');
    this.button.className = 'back-button';
    this.button.textContent = buttonText;
    this.button.onclick = () => this.goBack();

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.button);
    } else {
      console.error(`Parent element with id "${parentId}" not found.`);
    }
  }

  private goBack(): void {
    window.history.back();
  }
}

export default BackButton;
