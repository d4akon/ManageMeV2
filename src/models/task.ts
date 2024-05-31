import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export class Task {
  public uuid: string;
  public name: string;
  public description: string;
  public hoursToComplete: number;
  public priority: Priority;
  public storyUuid: string | null;
  public status: Status;
  public readonly dateOfCreation: Date;
  public dateOfStart: Date | null;
  public dateOfFinish: Date | null;
  public assignedUserUuid: string | null;

  constructor(
    name: string,
    description: string,
    hoursToComplete: number,
    priority: Priority,
    storyUuid: string | null,
    dateOfStart: Date | null,
    dateOfFinish: Date | null,
    assignedUserUuid: string | null
  ) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.hoursToComplete = hoursToComplete;
    this.priority = priority;
    this.storyUuid = storyUuid;
    this.status = Status.ToDo;
    this.dateOfCreation = new Date();
    this.dateOfStart = null;
    this.dateOfFinish = null;
    this.assignedUserUuid = assignedUserUuid;
  }
}
