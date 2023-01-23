var User = require('../models/UserSchema');
var bcrypt = require('bcrypt');

export async function registration(req: any) {
  const {
    email,
    password,
    firstname,
    lastname,
    street,
    housenumber,
    zipcode,
    city,
    phone,
    birthday,
    iban,
    cardnumber,
    cardexpire,
    cardcvc,
    paypalmail,
  } = req.body;

  const user = new User({
    // id,
    email,
    password: bcrypt.hashSync(password, 10),
    firstname,
    lastname,
    street,
    housenumber,
    zipcode,
    city,
    phone,
    birthday,
    iban: iban ? iban : null,
    cardnumber: cardnumber ? cardnumber : null,
    cardexpire: cardexpire ? cardexpire : null,
    cardcvc: cardcvc ? cardcvc : null,
    paypalmail: paypalmail ? paypalmail : null,
  });

  try {
    user.save();
    return 201;
  } catch (err) {
    console.log(err);
    return 500;
  }
}

export async function login(req: any) {
  const { email, password } = req.body;

  try {
    const response = await User.findOne({ email: email }).exec();

    if (bcrypt.compareSync(password, response.password)) {
      return response;
    }

    return 401;
  } catch (err) {
    return 500;
  }
}

export async function deleteUser(req: any) {
  const { email, password } = req.body;

  try {
    const response = await User.findOne({ email: email }).exec();

    if (bcrypt.compareSync(password, response.password)) {
      await User.deleteOne({ email }).exec();
      return 200;
    }
  } catch (err) {
    console.error(err);
    return 500;
  }
}

export async function updateUser(req: any) {
  try {
    const {
      currentEmail,
      email,
      password,
      firstname,
      lastname,
      street,
      housenumber,
      zipcode,
      city,
      phone,
      birthday,
      iban,
      cardnumber,
      cardexpire,
      cardcvc,
      paypalmail,
    } = req.body;

    const response = await User.findOne({ email: email }).exec();

    if (bcrypt.compareSync(password, response.password)) {
      await User.updateOne(
        { email: currentEmail },
        {
          $set: {
            firstname: firstname ? firstname : response.firstname,
            lastname: lastname ? lastname : response.lastname,
            street: street ? street : response.street,
            housenumber: housenumber ? housenumber : response.housenumber,
            zipcode: zipcode ? zipcode : response.zipcode,
            city: city ? city : response.city,
            phone: phone ? phone : response.phone,
            birthday: birthday ? birthday : response.birthday,
            iban: iban ? iban : response.iban,
            cardnumber: cardnumber ? cardnumber : response.cardnumber,
            cardexpire: cardexpire ? cardexpire : response.cardexpire,
            cardcvc: cardcvc ? cardcvc : response.cardcvc,
            paypalmail: paypalmail ? paypalmail : response.paypalmail,
          },
        }
      ).exec();
      return 200;
    } else {
      return 401;
    }
  } catch (err) {
    console.error(err);
    return 500;
  }
}
