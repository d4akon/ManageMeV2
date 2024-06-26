import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export class Story {
  public uuid: string;
  public name: string;
  public description: string;
  public priority: Priority;
  public status: Status;
  public readonly dateOfCreation: Date;
  public projectUuid: string;
  public ownerUuid: string;

  constructor(
    uuid: string,
    name: string,
    description: string,
    priority: Priority,
    status: Status,
    dateOfCreation: Date,
    projectUuid: string,
    ownerUuid: string
  ) {
    this.uuid = uuid;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.dateOfCreation = dateOfCreation;
    this.projectUuid = projectUuid;
    this.ownerUuid = ownerUuid;
  }
}
