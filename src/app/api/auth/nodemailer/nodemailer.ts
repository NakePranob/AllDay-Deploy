import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pranob.onphaeng@gmail.com',
      pass: 'oytm ulbt wvgc bjtq',
    },
});

async function sendEmail(to: string, subject: string, text: string) {
    try {
      const info = await transporter.sendMail({
        from: 'pranob.onphaeng@gmail.com',
        to,
        subject,
        html: `<h1>${subject}</h1><p>${text}</p>`,
      });
  
      // console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  
  export default sendEmail;