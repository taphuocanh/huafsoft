export interface IUser {
  id: string,
  username: string,
  password: string,
  email: string,
  token?: string
}

export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public email: string,
    public token?: string
  ) {}
}
