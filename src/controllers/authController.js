const {
  registration,
  login,
  findUserByEmail,
  currentUser,
  changeSubscription,
  changeAvatar,
  verification,
  sendVerificationMail,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    res.status(409).json({
      message: "Email in use",
    });
  }
  await registration({ email, password });

  res.status(200).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login({ email, password });
  if (!token) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

const logoutController = (req, res) => {
  req.user = null;
  req.token = null;
  res.status(201).json({
    message: "No Content",
  });
};

const currentUserController = async (req, res) => {
  const { user: userId } = req;
  const user = await currentUser(userId);

  res.status(200).json({ user });
};

const changeSubscriptionController = async (req, res) => {
  const { user: userId } = req;

  const { subscription } = req.body;

  if (!subscription) {
    res.status(400).json({
      status: "missing field subscription",
    });
  }
  await changeSubscription(userId, { subscription });
  const user = await currentUser(userId);

  res.status(200).json({ user });
};

const changeAvatarController = async (req, res) => {
  const { user: userId } = req;
  const filename = req.file.originalname;

  if (!filename) {
    res.status(400).json({
      status: "missing file ",
    });
  }

  const avatarURL = await changeAvatar({ userId, filename });
  res.status(200).json({ avatarURL });
};

const verificationController = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  const user = await verification(verificationToken);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({ message: "Verification successful" });
};

const reSendVerificationController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: "missing required field email",
    });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else if (user.verify === true) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
  } else {
    await sendVerificationMail(email, user.verificationToken);
    res.status(200).json({ message: "Verification email sent" });
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  changeAvatarController,
  verificationController,
  reSendVerificationController,
};
