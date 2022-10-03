require('dotenv').config();

const { BASE_URL } = process.env;

const urlNewPasswordToken = (passwordToken) => { 
    const urlPath = `
    <p>Шановний користувач!</p>
    <p>Створений запит на зміну пароля Вашого облікового запису застосунку Books Reading</p>
    <p>Якщо даний запит створений не Вами, то інша людина ввела Вашу адресу електронної пошти та новий пароль у форму відновлення втраченого пароля. Якщо така людина не має доступу до Вашої скриньки електронної пошти, то не зможе змінити Ваш пароль.</p>
    <p>Нижче наведене посилання для верифікації нового паролю застосунку Books Reading. Якщо Ви бажаєте підтвердити новий пароль натисніть на наведене нижче посилання.</p>
    <a target="_blank" href="${BASE_URL}/api/user/forgotPassword/${passwordToken}">
    Натисніть, щоб підтвердити зміну пароля
    </a>
    <p>Є запитання? Потрібна допомога? Зверніться до нас за адресою <a href="mailto:griffon.aneroid-0a@icloud.com">griffon.aneroid-0a@icloud.com</a></p>
    <p>З повагою</p>
    <p>Books Reading Application Team</p>

    <p>-----------------------------</p>

    <p>Dear User,</p>
    <p>A request was made to change password for Books Reading Application account.</p>
    <p>If you did not make the request, then someone else put in your email address and new password at the "Forgot Password?" form. If they don't have access to your email, they won't be able to reset your password.</p>
    <p>Here is the information to verify Books Reading account new password. If You wish to vefiry new password click on the link below.</p>
    <a target="_blank" href="${BASE_URL}/api/user/forgotPassword/${passwordToken}">
    Click to confirm password change
    </a>
    <p>Have questions? Need help? Contact us at <a href="mailto:griffon.aneroid-0a@icloud.com">griffon.aneroid-0a@icloud.com</a></p>
    <p>Sincerely,</p>
    <p>Books Reading Application Team</p>
    `;
    return urlPath;
};

module.exports = urlNewPasswordToken;