require('dotenv').config();

const { BASE_URL } = process.env;

const urlVereficationToken = (token) => { 
    const urlPath = `
    <p>Шановний користувач!</p>
    <p>Дякуємо за створення облікового запису Books Reading Application. Заради власної безпеки підтвердьте свій обліковий запис, натиснувши посилання нижче.</p>
    <a target="_blank" href="${BASE_URL}/api/user/verify/${token}">Підтвердити свій обліковий запис Books Reading Application</a>
    <p>Є запитання? Потрібна допомога? Зверніться до нас за адресою <a href="mailto:griffon.aneroid-0a@icloud.com">griffon.aneroid-0a@icloud.com</a></p>
    <p>Залишайтеся на зв’язку,</p>
    <p>Books Reading Application Team</p>
    
    <p>-----------------------------</p>
    
    <p>Dear User,</p>
    <p>We are grateful for the creation of an account for Books Reading Application. For Your own safety please verify Your account by clicking the link below.</p>
    <a target="_blank" href="${BASE_URL}/api/user/verify/${token}">Verify My Books Reading Application Account</a>
    <p>Have questions? Need help? Contact us at <a href="mailto:griffon.aneroid-0a@icloud.com">griffon.aneroid-0a@icloud.com</a></p>
    <p>Stay in touch,</p>
    <p>Books Reading Application Team</p>
    `;

    return urlPath;
};

module.exports = urlVereficationToken;