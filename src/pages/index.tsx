import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  DateOfIncident,
  EmployeeName,
  WorkingTitle,
  IncidentDescription,
  Instructions,
  PersonalNumber,
  PleaseDescribe,
  PleaseState,
  SiteLocation,
  Srs,
  SupEmail,
  SupTelephone,
  SupervisorName,
  WitnessEmployeeData,
  DescribeTheWork,
  IndicateWhichPart,
  ToAvoid,
  safetyRuleViolated,
  Affirm,
  Signature,
  DateSigned,
  Affirmation,
  TimeOfIncident,
} from "../../Languages/English";
import TitleT from "../../components/TitleT";
import LabelT from "../../components/LabelT";
import InputField from "../../components/InputField";
import DateSelect from "../../components/DateSelect";

import React, { useState } from "react";

import TimeSelect from "../../components/TimeSelect";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { sendContactForm } from "../../lib/api";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const initValues = {
  name: "",
  workingTitle: "",
  personalNumber: "",
  dateOfIncident: dayjs("2014-08-18T21:11:54"),
  timeOfIncident: dayjs("2014-08-18T21:11:54"),
  siteLocation: "",
  supervisor: "",
  supEmail: "",
  supTelephone: "",
  supervisorName: "",
  witnessEmployeeData: "",
  pleaseDescribe: "",
  describeTheWork: "",
  indicateWhichPart: "",
  toAvoid: "",
  safetyRuleViolated: "",
  affirm: "",
  signature: "",
  dateSigned: "",
};
const initState = { values: initValues };

export default function Home(children: any) {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }: any) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }: any) =>
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [target.name]: target.value },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    //  <TitleT>{Instructions}</TitleT>
    <Container>
      {/*  ######################################### HEADER */}
      <Grid container spacing={1}>
        <Grid item md={12}>
          <TitleT>{Instructions}</TitleT>
          <LabelT>{PleaseState}</LabelT>
          <TitleT>{WitnessEmployeeData}</TitleT>
        </Grid>

        {/*  ######################################### Witness Employee Data */}

        <Grid item md={4} sm={4}>
          {/* <LabelT>{EmployeeName}</LabelT> */}

          <TextField
            type="text"
            label={EmployeeName}
            required
            fullWidth
            name="name"
            error={touched.name && !values.name}
            value={values.name}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <TextField
            type="input"
            label={WorkingTitle}
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
            label={PersonalNumber}
            fullWidth
            name="personalNumber"
            value={values.personalNumber}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DesktopDatePicker
              name='dateOfIncident'
              label={DateOfIncident}
              inputFormat="MM/DD/YYYY"
              value={values.dateOfIncident}
              onChange={handleChange }
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item md={4} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              // components={{ OpenPickerIcon: AccessTimeIcon }}
              value={values.timeOfIncident}
              label={TimeOfIncident}
              onChange={handleChange}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item md={12} sm={12}>
          <TextField
            type="text"
            label={SiteLocation}
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
            label={SupervisorName}
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
            label={SupTelephone}
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
            label={SupEmail}
            fullWidth
            name="supEmail"
            value={values.supEmail}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        {/*  ######################################### Incident Description */}
        <Grid item md={12} sm={12}>
          <TitleT>{IncidentDescription}</TitleT>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{PleaseDescribe}</LabelT>
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
          <LabelT>{DescribeTheWork}</LabelT>
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
          <LabelT>{IndicateWhichPart}</LabelT>
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
          <LabelT>{ToAvoid}</LabelT>
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
          <LabelT>{safetyRuleViolated}</LabelT>
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

        <Grid item md={12} sm={12}>
          <TitleT>{Affirm}</TitleT>
        </Grid>

        <Grid item md={12} sm={12}>
          <LabelT>{Affirmation}</LabelT>
          {/* <InputField></InputField> */}
        </Grid>

        <Grid item md={6} sm={6}>
          <LabelT>{Signature}</LabelT>
          <InputField></InputField>
        </Grid>

        <Grid item md={6} sm={6}>
          <DateSelect label={DateSigned} />
        </Grid>

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

        <Grid item md={12} sm={12} marginTop={2}>
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
    </Container>
  );
}
