export class Project {
  public readonly uuid: string;
  public name: string;
  public description: string;
  public isActive: boolean;

  constructor(name: string, description: string, isActive: boolean = false) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }
}
