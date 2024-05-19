export class AddButton {
  private button: HTMLButtonElement;

  constructor(
    label: string,
    idName: string,
    parentId: string,
    onClick: () => void
  ) {
    this.button = document.createElement("button");
    this.button.textContent = label;
    this.button.id = idName;
    this.button.onclick = onClick;

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.button);
    } else {
      console.error('Parent element with id "${parentId}" not found');
    }
  }
}
export default AddButton;
