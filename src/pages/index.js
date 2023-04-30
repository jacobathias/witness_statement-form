import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";
// import {
//   DateOfIncident,
//   EmployeeName,
//   WorkingTitle,
//   IncidentDescription,
//   Instructions,
//   PersonalNumber,
//   PleaseDescribe,
//   PleaseState,
//   SiteLocation,
//   Srs,
//   SupEmail,
//   SupTelephone,
//   SupervisorName,
//   WitnessEmployeeData,
//   DescribeTheWork,
//   IndicateWhichPart,
//   ToAvoid,
//   safetyRuleViolated,
//   Affirm,
//   Signature,
//   DateSigned,
//   Affirmation,
//   TimeOfIncident,
// } from "../../Languages/English";
import TitleT from "../../components/TitleT";
import LabelT from "../../components/LabelT";
import LanguageSelect from "../../components/LanguageSelect";
import SelectEHS from "../../components/SelectEHS";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { sendContactForm } from "../../lib/api";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Translate } from "../pages/fetchCode.js";
import { useTranslation } from "react-i18next";
import i18next from "../i18n";

import dayjs from "dayjs";
import "../i18n";

const initValues = {
  employeeName: "Jacob Athias",
  workingTitle: "EHS - Coordinator",
  personalNumber: "4078790195",
  siteLocation: "EHS Office - Venice",
  supervisorName: "K.Kauffman",
  supTelephone: "42312356",
  supEmail: "kk@pgt.com",
  pleaseDescribe: "I was walking and I tripped and fell",
  describeTheWork: "Running inside the office",
  indicateWhichPart: " Left buttocks",
  toAvoid: "I won't run anymore inside the office",
  safetyRuleViolated: "No rule violated, it's ok to run inside the office",
  // affirm: "",

  // signature: "",

  // dateSigned: "",
};

// Cria um objeto values e armazena o objeto com initValues
const initState = { values: initValues };

export default function Home(children) {

  //Hooks
  const { t } = useTranslation();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const [timeValue, setTimeValue] = useState(dayjs());
  const [dateValue, setDateValue] = useState(dayjs());
  const [language, setLanguage] = React.useState("en");

  // Handles
    const handleLang = (event) => {
    i18next.changeLanguage(event.target.value);
    setLanguage(event.target.value);
  };
    
  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [target.name]: target.value },
    }));

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));
    
    const handleTime = (newValue) => {
      setTimeValue(newValue);
    };
    const handleDate = (newValue) => {
    setDateValue(newValue);
  };

  //Busines Rules
  const onSubmit = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));    
    try {
      //Criando um novo objeto com os values do form e adicionando o sdo tempo de data
      const new_values = {
        ...values,
        dateOfIncident: dateValue.format("MM-DD-YYYY"),
        timeOfIncident: timeValue.format("HH:mm A"),
      };
      // console.log(new_values);
      await sendContactForm(new_values);
      setTouched({});
      setState(initState);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  const { values, isLoading, error } = state;
  
  return (
    //  <TitleT>{Instructions}</TitleT>
    
    <Container>
      {/*  ######################################### HEADER */}
      <Grid container spacing={1}>
        <Grid container justifyContent={"space-between"}>
          <Grid item md={6} sm={12} marginTop={2}>
            <LoadingButton
              variant="contained"
              // disabled={!values.name && !values.workingTitle}
              endIcon={<SendIcon />}
              onClick={Translate}
              // loading={isLoading}
            >
              Translate
            </LoadingButton>
          </Grid>

          <Grid item md={6}>
            <LanguageSelect
              onChange={handleLang}
              value={language}
            ></LanguageSelect>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <TitleT>{t("Instructions")}</TitleT>
          <LabelT>{t("PleaseState")}</LabelT>
          <TitleT>{t("WitnessEmployeeData")}</TitleT>
        </Grid>

        {/*  ######################################### Witness Employee Data */}

        <Grid item md={4} sm={4}>
          {/* <LabelT>{EmployeeName}</LabelT> */}

          <TextField
            type="text"
            label={t("EmployeeName")}
            required
            fullWidth
            name="employeeName"
            error={touched.name && !values.employeeName}
            value={values.employeeName}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <TextField
            type="input"
            label={t("WorkingTitle")}
            required
            fullWidth
            name="workingTitle"
            error={touched.workingTitle && !values.workingTitle}
            value={values.workingTitle}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <TextField
            type="phone"
            label={t("PersonalNumber")}
            fullWidth
            name="personalNumber"
            value={values.personalNumber}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={t("DateOfIncident")}
              inputFormat="MM/DD/YYYY"
              value={dateValue}
              onChange={handleDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item md={4} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              // components={{ OpenPickerIcon: AccessTimeIcon }}
              value={timeValue}
              label={t("TimeOfIncident")}
              onChange={handleTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item md={12} sm={12}>
          <TextField
            type="text"
            label={t("SiteLocation")}
            fullWidth
            multiline
            name="siteLocation"
            value={values.siteLocation}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <TextField
            type="text"
            label={t("SupervisorName")}
            required
            fullWidth
            name="supervisorName"
            error={touched.supervisorName && !values.supervisorName}
            value={values.supervisorName}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <TextField
            type="phone"
            label={t("SupTelephone")}
            required
            fullWidth
            name="supTelephone"
            error={touched.supTelephone && !values.supTelephone}
            value={values.supTelephone}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <TextField
            type="email"
            label={t("SupEmail")}
            fullWidth
            name="supEmail"
            value={values.supEmail}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        {/*  ######################################### Incident Description */}
        <Grid item md={12} sm={12}>
          <TitleT>{t("IncidentDescription")}</TitleT>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{t("PleaseDescribe")}</LabelT>
          <TextField
            type="text"
            fullWidth
            multiline
            name="pleaseDescribe"
            error={touched.pleaseDescribe && !values.pleaseDescribe}
            value={values.pleaseDescribe}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{t("DescribeTheWork")}</LabelT>
          <TextField
            type="text"
            fullWidth
            multiline
            name="describeTheWork"
            error={touched.describeTheWork && !values.describeTheWork}
            value={values.describeTheWork}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{t("IndicateWhichPart")}</LabelT>
          <TextField
            type="text"
            fullWidth
            multiline
            name="indicateWhichPart"
            error={touched.indicateWhichPart && !values.indicateWhichPart}
            value={values.indicateWhichPart}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{t("ToAvoid")}</LabelT>
          <TextField
            type="text"
            fullWidth
            multiline
            name="toAvoid"
            error={touched.toAvoid && !values.toAvoid}
            value={values.toAvoid}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{t("SafetyRuleViolated")}</LabelT>
          <TextField
            type="text"
            fullWidth
            multiline
            name="safetyRuleViolated"
            error={touched.safetyRuleViolated && !values.safetyRuleViolated}
            value={values.safetyRuleViolated}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        {/* <Grid item md={12} sm={12}>
          <TitleT>{Affirm}</TitleT>
        </Grid> */}

        {/* <Grid item md={12} sm={12}>
          <LabelT>{Affirmation}</LabelT>
          <InputField></InputField>
        </Grid> */}

        {/* <Grid item md={6} sm={6}>
          <LabelT>{Signature}</LabelT>
          <InputField></InputField>
        </Grid> */}

        {/* <Grid item md={6} sm={6}>
          <DateSelect label={DateSigned} />
        </Grid> */}

        {/* <Grid item md={12} sm={12}>
          <TitleT>{Revision}</TitleT>
        </Grid>

        <Grid item md={3} sm={3}>
          <LabelT>Rev</LabelT>
          <LabelT>A</LabelT>
        </Grid>

        <Grid item md={3} sm={3}>
          <LabelT>{Description}</LabelT>
          <LabelT>{InitialRelease}</LabelT>
        </Grid>

        <Grid item md={3} sm={3}>
          <LabelT>{By}</LabelT>
          <LabelT>Angela Valentine</LabelT>
        </Grid>

        <Grid item md={2} sm={3}>
          <LabelT>{RevisionDate}</LabelT>
          <LabelT>05-18-2020</LabelT>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{DocumentUncontrolled}</LabelT>
        </Grid> */}

        <Grid container marginTop={2}>
          
          <Grid item md={6} sm={12}>
            <SelectEHS></SelectEHS>
          </Grid>

          <Grid item md={6} sm={12}>
            <LoadingButton
              variant="contained"
              disabled={!values.name && !values.workingTitle}
              endIcon={<SendIcon />}
              onClick={onSubmit}
              loading={isLoading}
            >
              Send
            </LoadingButton>
          </Grid>
        </Grid>

      </Grid>
    </Container>
  );
}
