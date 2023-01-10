const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "sistema.sige.des@gmail.com", // generated ethereal user
    pass: "tmbuvwavkxirwhcm", // generated ethereal password
  },
});

module.exports = {
  transporter,
};
