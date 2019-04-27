import { Rol } from './rol.model';
import { Authority } from './authority.model';

export class User {
  id: number;
  username: string;
  password: string;
  profile: UserProfile;
  work: UserWork;
  contacts: UserContacts;
  social: UserSocial;
  settings: UserSettings;
}

export class UserProfile {
  name: string;
  surname: string;
  birthday: Object;
  gender: string;
  image: string;
}

export class UserWork {
  company: string;
  position: string;
  salary: number;
}

export class UserContacts {
  email: string;
  phone: string;
  address: string;
}

export class UserSocial {
  facebook: string;
  twitter: string;
  google: string;
}

export class UserSettings {
  isActive: boolean;
  isDeleted: boolean;
  registrationDate: Date;
  joinedDate: Date;
}

export class UserSession {
  username: string;
}

export class UserAllInfo {
  userid: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  token: string;
  status: string;
  expiredDateTime: string;
  issuedDateTime: string;
  confirmedDateTime: string;
  prtoken: string;
  prstatus: string;
  prexpiredDateTime: string;
  prissuedDateTime: string;
  prconfirmedDateTime: string;
  packagePurchased: string;
  paymentid: string;
  transactionid: string;
  amount: string;
  currency: string;
  purchasedate: string;
  pkgexpirydate: string;
  packageid: string;
  payeremail: string;
  paymentstatus: string;
  packageexpired: string;
  roles: Rol[];
  username: string;
  enabled: boolean;
  active: boolean;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

