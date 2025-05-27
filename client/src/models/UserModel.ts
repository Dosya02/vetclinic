export interface UserModel {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface DoctorModel extends UserModel {
  position: string;
}