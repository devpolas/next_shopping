import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, NODEMAILER_USER, NODEMAILER_APP_PASSWORD } =
  process.env;

if (!SMTP_HOST || !SMTP_PORT || !NODEMAILER_USER || !NODEMAILER_APP_PASSWORD) {
  throw new Error("Missing SMTP configuration");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_APP_PASSWORD,
  },
});

export default transporter;
