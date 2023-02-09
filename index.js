const sgMail = require("@sendgrid/mail");
// Imports the Google Cloud client library
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send_email = async ({ subject, message, name }, from) => {
  return await sgMail.send({
    to: "alsigman@gmail.com",
    from: from,
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
  try {
    const { name, subject, email, message } = req.body;
    send_email({ subject, message, name }, email).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log("got error: ", error);
    res.status(400).send(error);
  }
};
