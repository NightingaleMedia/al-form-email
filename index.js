const sgMail = require("@sendgrid/mail");
// Imports the Google Cloud client library
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send_email = async ({ subject, message, name }, from) => {
  return await sgMail.send({
    to: "alsigman@gmail.com",
    from: "alsigman@gmail.com",
    replyTo: from,
    subject: subject,
    templateId: "d-756afa560cf24b9fb37d206858fa05ea",
    dynamicTemplateData: {
      message,
      name,
      email: from,
      subject,
    },
  });
};

exports.main = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { name, subject, email, message } = JSON.parse(req.body);

    if (!name || !subject || !email || !message) throw "Missing fields!";

    await send_email({ subject, message, name }, email);

    return res.json({ message: "Thank you for reaching out!" });
  } catch (error) {
    console.log("got error: ", error);
    res.status(400).json({ message: error.toString() });
  }
};
