export interface User {
  username: string;
  email: string;
  password?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  owner_id?: string;
  owner_name?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  event_id: string;
}
