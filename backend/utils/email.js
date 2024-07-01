const nodemailer = require("nodemailer");

const fs = require("fs");
const path = require("path");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    console.log(user.email)
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ayesha Firdaus <${process.env.email_from}>`;
  }
  newTransport() {
    console.log(process.env.Node_Env.trim()==='production')
    if (process.env.Node_Env.trim() === 'production') {
console.log(process.env.SMTP_LOGIN,process.env.SMTP_PASSWORD)

      // Production transport configuration
      return nodemailer.createTransport({
        service:"gmail",
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.SMTP_LOGIN,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }

    // Development transport configuration
    return nodemailer.createTransport({
      host: process.env.email_host,
      port: process.env.email_port,
      auth: {
        user: process.env.email_address,
        pass: process.env.email_password,
      },
    });
  }

  async send(template, subject) {
    let html;
    if (template === "Welcome") {
      const htmlFilePath = path.join(__dirname, 'Welcome.html');
      html = fs.readFileSync(htmlFilePath, 'utf-8');
    } else if (template === "PasswordReset") {
      const htmlFilePath = path.join(__dirname, 'PasswordReset.html');
      html = fs.readFileSync(htmlFilePath, 'utf-8');
    }

    // 2. Insert the first name and URL into the HTML content
    html = html.replace('${firstname}', this.firstName);
    html = html.replace('${url}', this.url);

    // 3. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    // 4. Create a transport and send the email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the Pizza.Co Family');
  }

  async sendPasswordReset() {
    await this.send('PasswordReset', 'Your password reset token is valid for only 10 minutes');
  }
}
