import nodemailer from "nodemailer";
import MailGenerator from "mailgen";

export const sendEmail = async (options) => {
  const config = {
    service: process.env.SMPT_SERVICE, // Make sure this is set to "gmail" for Gmail.
    auth: {
      user: process.env.SMPT_MAIL, // Your Gmail email address.
      pass: process.env.SMPT_PASSWORD, // Your Gmail password or App Password.
    },
  };
  const transporter = nodemailer.createTransport(config);

  const MailGen = new MailGenerator({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });

  const response = {
    body: {
      name: "Uttam Makwana",
      intro: "Your reset password link is now open",
      table: {
        data: [
          {
            messsage: options.message,
          },
        ],
      },
      outro:
        "Please make sure you provide a good strenght password that you can't forget again",
    },
  };

  const mail = MailGen.generate(response);
  const mailOptions = {
    from: process.env.SMPT_MAIL, // Your Gmail email address.
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: mail,
  };

  await transporter.sendMail(mailOptions);
};
