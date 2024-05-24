import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export class Story {
  public readonly uuid: string;
  public name: string;
  public description: string;
  public priority: Priority;
  public status: Status;
  public readonly dateOfCreation: Date;
  public projectUuid: string;
  public ownerUuid: string;

  constructor(
    name: string,
    description: string,
    priority: Priority,
    status: Status,
    projectUuid: string,
    ownerUuid: string
  ) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.dateOfCreation = new Date();
    this.projectUuid = projectUuid;
    this.ownerUuid = ownerUuid;
  }
}
