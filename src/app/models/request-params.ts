import { GENDER } from '../constants';

export interface RegisterUserParams {
  email: string;
  password: string;
  birthdate: number;
  firstName: string;
  lastName: string;
  mobile?: string;
  gender?: GENDER;
}
