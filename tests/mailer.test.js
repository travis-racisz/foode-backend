const jwt = require('jsonwebtoken');
const sendMail = require('../mailer/mailer.js')


test("sucessfully sends a verification email", async () => { 
    const signature = jwt.sign({email: "tracisz@hotmail.com"}, process.env.SECRET, {expiresIn: "2h"})
    const email = await sendMail(null, "tracisz@hotmail.com",process.env.EMAIL,`click here to verify your account http://localhost:8174/verify/${signature}`)
    expect(email.status).toBe('successful delivery')
})
