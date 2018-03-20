export interface MyUser {
  id: string;
  login: string;
  mail: string;
  password: string;
  chats: Chat[];
}

export interface Mes {
  date: number;
  text: string;
  user: string;
  type?: string;
}

export interface Chat {
  [key: string]: string;
}

export interface Login {
  newLogin?: string;
  email: string;
  password: string;
}

export interface DictionaryInterface<T> {
  [key: string]: T;
}
