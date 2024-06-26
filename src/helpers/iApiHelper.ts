export interface IApiHelper<T> {
  get(uuid: string): Promise<T | undefined>;
  getAll(): Promise<T[]>;
  create(data: T): void;
  update(data: T): void;
  delete(uuid: string): void;
}
