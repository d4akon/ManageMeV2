export class Project {
  uuid: string;
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.description = description;
  }
}
