const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { uuid } = require('uuidv4');
const Jimp = require('jimp');
const sgMail = require('@sendgrid/mail');
const { User } = require('../models/users');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async ({ email, password }) => {
  const verificationToken = uuid();
  const avatarURL = gravatar.url(email);
  const user = new User({
    email,
    password,
    avatarURL,
    verificationToken,
  });
  await user.save();
  await sendVerificationMail(email, verificationToken);
};

const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (
    !user ||
    !(await bcrypt.compare(password, user.password)) ||
    user.verify === false
  ) {
    return null;
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return token;
};

const currentUser = async userId => {
  const user = await User.findOne({ _id: userId }).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });

  return user;
};

const changeSubscription = async (userId, { subscription }) => {
  await User.findByIdAndUpdate({ _id: userId }, { $set: { subscription } });
};

const changeAvatar = async ({ userId, filename }) => {
  const orinalFileDir = path.resolve('./tmp');
  const [, extension] = filename.split('.');
  const orinalFile = path.resolve('./tmp', filename);
  const avatarURL = path.resolve('./public/avatars', `${uuid()}.${extension}`);
  Jimp.read(orinalFile)
    .then(avatar => {
      return avatar
        .resize(250, 250) // resize
        .write(avatarURL); // save
    })
    .catch(err => {
      console.error(err);
      return err;
    });
  await fs.unlink(`${orinalFileDir}/${filename}`);
  await User.findByIdAndUpdate({ _id: userId }, { $set: { avatarURL } });
  return avatarURL;
};

const verification = async verificationToken => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return null;
  }
  await User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { verificationToken: null, verify: true } }
  );
  return user;
};

const sendVerificationMail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: 'exemple@mail.com',
    subject: 'Thank you for registration!',
    text: `Please, confirm your email address http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`,
    html: `Please, confirm your email address http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`,
  };
  await sgMail.send(msg);
};

module.exports = {
  registration,
  login,
  findUserByEmail,
  currentUser,
  changeSubscription,
  changeAvatar,
  verification,
  sendVerificationMail,
};
