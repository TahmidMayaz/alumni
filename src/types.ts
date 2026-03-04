export interface Student {
  id: string;
  name: string;
  nickname: string;
  session: string;
  roll: string;
  email: string;
  phone: string;
  bloodGroup: string;
  currentWorkplace: string;
  photoUrl: string;
  hometown: string;
  bio?: string;
  linkedin?: string;
}

export interface Batch {
  session: string;
  students: Student[];
}
