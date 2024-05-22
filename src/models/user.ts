import { Role } from '../enums/role';

export class User {
  public readonly uuid: string;
  public name: string;
  public surname: string;
  public password: string;
  public role: Role;

  constructor(name: string, surname: string, password: string, role: Role) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.role = role;
  }
}
