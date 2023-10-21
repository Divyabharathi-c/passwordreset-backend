import { User } from "../models/user.js"
import { createTransport } from "nodemailer"
import crypto from "crypto"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

//forgot password request using route
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    //email exists in database using if
    const user = await User.findOne({ email });
   if (!user) {
    return res.status(404).json({ message: 'User not found' });
   }

   //Generate reset token
   const resetToken = crypto.randomBytes(20).toString('hex');
   user.resetToken = resetToken;
   await user.save();

   //send email with reset token
//    const resetUrl = `resetPassword?token=${resetToken}`;
const resetUrl = `http://localhost:5173/repass/reset/${resetToken}`;
   var transporter = createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMEIL_PASSWORD
    }
   });

   var mailoptions = {
    from: 'divyabharathi.csit@gmail.com',
    to: email,
    subject: "Reset Password",
    html:`<h1>Reset Password</h1><h2>Click on the link to reset your password</h2><h3>${resetUrl}</h3>`
   };

   await transporter.sendMail(mailoptions, function (error, info) {
    if (error) {
        console.log(error)
    } else {
        console.log('Email sent: ' + info.response)
    }
   });

   res.status(200).json({ message: 'A link to reset your password have been sent to your email.' });
};

//  Route to handle password reset request
const resetPassword = async (req, res) => {
    const { password } = req.body;
   
    
    // // Verify reset token
    // console.log("token: ", token);
    // const user = await User.findOne({ resetToken:token });
    const user = await User.findOne({ token: req.params.resetToken });
    if (!user) {
      return res.status(400).json({ message: 'Invalid user not found' });
    }
    
    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    await user.save();
    
    res.status(200).json({ message: 'Password reset successful' });
  };
 export {forgotPassword, resetPassword}
  