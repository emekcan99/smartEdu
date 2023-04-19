import nodemailer from "nodemailer";
import { Course } from "../modals/Course.mjs";
import { User } from "../modals/User.mjs";

export const getIndexPage = async (req, res) => {
  const courses = await Course.find().sort("-createdAt").limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });

  res.status(200).render("index", {
    page_name: "index",
    courses,
    totalCourses,
    totalStudents,
    totalTeachers
  });
};

export const getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

export const getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

export const getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

export const getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

export const sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  <h1>Message Deatils</h1>
    <ul>
     <li>
        Name: ${req.body.name}
      </li>
      <li>
        Email: ${req.body.email}
      </li>
    </ul>
  <h1>Message</h1>
    <p>
      ${req.body.message}
    </p>`;

    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.com.tr",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "smartEduContact@yandex.com", // yandex mail account
        pass: "pzedxyyfycyyhjwp", // yandex mail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart Edu Contact Form " <smartEduContact@yandex.com>', // sender address
      to: "smartEduContact@yandex.com", // list of receivers
      subject: "Smart Edu Contact Form New Mesage", // Subject line
      text: "Hello world?", // plain text body
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash("success", "We Recived your message succesfully");
    res.status(200).redirect("contact");
  } catch (err) {
    req.flash("error", `something happend!`);
  }
};
