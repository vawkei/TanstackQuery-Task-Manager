export interface User {
  name: string;
  email: string;
  password: string;
}
export interface AuthState {
  isLoggedIn: boolean;
  isSuccess: boolean;
  // isError: boolean,
  // isLoading: boolean,
  message: string;
  user: null;
  //   token: string;
}
export interface TaskProps {
  title: string;
  desciption: string;
  status: boolean;
  dateDue: null | Date;
}
