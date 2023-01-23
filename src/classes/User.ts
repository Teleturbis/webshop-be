var { parse, formatDistanceToNowStrict } = require('date-fns');

export class User {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  street: string;
  housenumber: string;
  zipcode: string;
  city: string;
  phone: string;
  birthday: string;
  legalAge: boolean;
  iban?: string;
  cardnumber?: string;
  cardexpire?: string;
  cardcvc?: string;
  paypalmail?: string;

  constructor(UserSchema: any) {
    this.id = UserSchema.id;
    this.email = UserSchema.email;
    this.password = UserSchema.password;
    this.firstname = UserSchema.firstname;
    this.lastname = UserSchema.lastname;
    this.street = UserSchema.street;
    this.housenumber = UserSchema.housenumber;
    this.zipcode = UserSchema.zipcode;
    this.city = UserSchema.city;
    this.phone = UserSchema.phone;
    this.birthday = UserSchema.birthday;
    this.legalAge =
      parseFloat(
        formatDistanceToNowStrict(
          parse(this.birthday, 'dd.MM.yyyy', new Date()),
          {
            addSuffix: false,
            roundingMethod: 'floor',
          }
        ).replaceAll(' years', '')
      ) >= 18;
    this.iban = UserSchema.iban;
    this.cardnumber = UserSchema.cardnumber;
    this.cardexpire = UserSchema.cardexpire;
    this.cardcvc = UserSchema.cardcvc;
    this.paypalmail = UserSchema.paypalmail;
  }
}
