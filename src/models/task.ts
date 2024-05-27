import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export class Task {
  public uuid: string;
  public name: string;
  public description: string;
  public priority: Priority;
  public storyUuid: string | null;
  public status: Status;
  public readonly dateOfCreation: Date;
  public dateOfStart: Date | null;
  public dateOfFinish: Date | null;
  public assignedUserUuid: string;

  constructor(
    name: string,
    description: string,
    priority: Priority,
    storyUuid: string | null,
    status: Status,
    dateOfStart: Date | null,
    dateOfFinish: Date | null,
    assignedUserUuid: string
  ) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.storyUuid = storyUuid;
    this.status = status;
    this.dateOfCreation = new Date();
    this.dateOfStart = null;
    this.dateOfFinish = null;
    this.assignedUserUuid = assignedUserUuid;
  }
}
