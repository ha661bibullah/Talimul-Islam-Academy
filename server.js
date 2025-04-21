const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // আপনার জিমেইল
        pass: process.env.EMAIL_PASS, // App Password
    },
});

// OTP ইমেইলে পাঠানোর রাউট
app.post('/send-email-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'আপনার OTP কোড',
            text: `আপনার OTP হলো: ${otp}`,
        });

        res.json({ success: true, message: 'OTP ইমেইলে পাঠানো হয়েছে' });
    } catch (err) {
        console.error('ইমেইল পাঠাতে ব্যর্থ:', err);
        res.status(500).json({ success: false, message: 'OTP পাঠাতে ব্যর্থ হয়েছে' });
    }
});

// রেন্ডারে হোস্ট করার জন্য
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
