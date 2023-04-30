import { useTranslation } from "react-i18next";
import { Affirm, DateOfIncident, DateSigned, DescribeTheWork, EmployeeName, IndicateWhichPart, PersonalNumber, PleaseDescribe, SafetyRuleViolated, Signature, SiteLocation, Srs, SupEmail, SupTelephone, SupervisorName, TimeOfIncident, ToAvoid, WitnessEmployeeData, WorkingTitle, safetyRuleViolated } from "../../../Languages/English";
import { transporter, mailOptions } from "../../../config/nodemailer";
// import i18next from "i18next";
import i18next from "../../i18n";


const WITNESS_FIELDS = {
  employeeName:EmployeeName,
  workingTitle: WorkingTitle,
  personalNumber: PersonalNumber,
  
  siteLocation: SiteLocation,

  supervisorName: SupervisorName,
  supTelephone: SupTelephone,
  supEmail: SupEmail,

  pleaseDescribe: PleaseDescribe,
  
  describeTheWork: DescribeTheWork,
  
  indicateWhichPart: IndicateWhichPart,
  
  toAvoid: ToAvoid,
  
  safetyRuleViolated: SafetyRuleViolated,
  
  // affirm: Affirm,
  
  // signature: Signature,
  // dateSigned: DateSigned,
  // add with spread ops
  dateOfIncident: DateOfIncident,
  timeOfIncident: TimeOfIncident,
  
};
const generateEmailContent = (data) => {

  const stringData = Object.entries(data).reduce((str, [key, val]) => (str += `${WITNESS_FIELDS[key]}: \n ${val}} \n \n `),"");
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {return (str += `<h3 >${WITNESS_FIELDS[key]}</h3><p>${val}</p>`);}, "");
  return {text: stringData,html: `<div class="form-container">${htmlData}</div>`,};
};

const handler = async (req, res) => {
  let body = "";
  if (req.method === "POST") {
    body = req.body;
    console.log(body.name);
    if (!body.employeeName) {
      return res.status(400).json({ message: "Bad request" });
    }
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(body),
      subject: `Witness Statement - ${body.employeeName}`,

    });
    console.log('Email Sent')

  } 
  
  catch (error) {
    // console.log(error);
    return res.status(400).json({ message: error.message });
  }

  res.status(400).json({ message: "Bad Request" });
};

export default handler;
