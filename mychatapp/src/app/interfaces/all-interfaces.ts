export interface MyUser {
  id: string;
  login: string;
  mail: string;
  password: string;
  chats: any;
}

export interface Mes {
  date: number;
  text: string;
  user: string;
}

export interface Chat {
  idChat: string;
  messages: Mes;
}

export interface Login {
  login?: any;
  email: any;
  password: any;
}

export interface DictionaryInterface<T> {
  [key: string]: T;
}
