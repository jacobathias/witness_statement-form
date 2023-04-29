// import { mailOptions, transporter } from "../../../config/nodemailer";

const WITNESS_FIELDS = {
  name: EmployeeName,
  name: EmployeeName,
  workingTitle: WorkingTitle,
  personalNumber: PersonalNumber,
  dateOfIncident: DateOfIncident,
  timeOfIncident: TimeOfIncident,
  siteLocation: SiteLocation,
  supEmail: SupEmail,
  supTelephone: SupTelephone,
  supervisorName: SupervisorName,
  witnessEmployeeData: WitnessEmployeeData,
  describeTheWork: DescribeTheWork,
  indicateWhichPart: IndicateWhichPart,
  toAvoid: ToAvoid,
  safetyRuleViolated: safetyRuleViolated,
  affirm: Affirm,
  signature: Signature,
  dateSigned: DateSigned,
  
};
const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) => (str += `${WITNESS_FIELDS[key]}: \n ${val}} \n \n `),
    ""
  );

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 >${WITNESS_FIELDS[key]}</h3><p>${val}</p>`);
  }, "");

  return {
    text: stringData,
    html: `<div class="form-container">${htmlData}</div>`,
  };
};
let b = "";
// import { stringify } from "querystring";
import { Affirm, DateOfIncident, DateSigned, DescribeTheWork, EmployeeName, IndicateWhichPart, PersonalNumber, Signature, SiteLocation, Srs, SupEmail, SupTelephone, SupervisorName, TimeOfIncident, ToAvoid, WitnessEmployeeData, WorkingTitle, safetyRuleViolated } from "../../../Languages/English";
import { transporter, mailOptions } from "../../../config/nodemailer";
const handler = async (req, res) => {
  if (req.method === "POST") {
    b = req.body;
    console.log(b.name);
    if (!b.name) {
      return res.status(400).json({ message: "Bad request" });
    }
  }
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(b),
      subject: `Witness Statement - ${b.name}`,
      // text: "This is test string",
      //  html: `<h1>${b.name} - ${b.workingTitle}</h1>`,
      // html: html,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  res.status(400).json({ message: "Bad Request" });
};

export default handler;

function page() {
  return <p>asdasdasd</p>;
}
