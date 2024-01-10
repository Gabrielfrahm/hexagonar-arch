import { randomUUID } from "crypto";

export type UserProps  = {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}

export type UserPropsUpdate = {
  name?: string;
  email?: string;
  password?: string;
}

export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public created_at: Date;

  constructor(props: UserProps){
    this.id = props.id || randomUUID()
    this.name = props.name;
    this.email= props.email;
    this.password = props.password;
    this.created_at = props.created_at || new Date();
  }

  update(props: Partial<UserPropsUpdate>){
    const user = new User({ ...this, ...props})
    return user;
  }
}
