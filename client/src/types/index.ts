export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login?: string | null;
  avatar?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Chatrabash {
  id: number;
  name: string;
  description?: string | null;
  location: string;
  ownerId: number;
  owner: User;
}
