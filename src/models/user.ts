import { Role } from '../enums/role';

export class User {
  public uuid: string;
  public name: string;
  public surname: string;
  public email: string;
  public role: Role;

  constructor(
    uuid: string,
    name: string,
    surname: string,
    email: string,
    role: Role
  ) {
    this.uuid = uuid;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
  }
}
