import { GENDER } from '../constants';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: GENDER;
  birthdate: number;  // unix timestamp
}
