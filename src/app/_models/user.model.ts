export interface IUser {
  id: number,
  username: string,
  password: string,
  email: string,
  token?: string
}

export class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string,
    public token?: string
  ) {}
}
