import { Box, Button, Container, Grid, TextField } from "@mui/material";
import {
  DateOfIncident,
  EmployeeName,
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
  WorkingTitle,
  DescribeTheWork,
  IndicateWhichPart,
  ToAvoid,
  safetyRuleViolated,
  Affirm,
  Signature,
  DateSigned,
  Revision,
  Description,
  By,
  RevisionDate,
  InitialRelease,
  DocumentUncontrolled,
  Affirmation,
  TimeOfIncident,
} from "../../Languages/English";
import TitleT from "../../components/TitleT";
import LabelT from "../../components/LabelT";
import InputField from "../../components/InputField";
import DateSelect from "../../components/DateSelect";

import React, { useState } from "react";

import TimeSelect from "../../components/TimeSelect";
import SendIcon from '@mui/icons-material/Send';

export default function Home(children: any) {
  const [_EmployeeName, setEmployeeName] = useState("");
  const [_WorkingTittle, setWorkingTittle] = useState("");
  const [_PersonalNumber, setPersonalNumber] = useState("");
  const [_DateOfIncident, setDateOfIncident] = useState("");
  const [_TimeOfIncident, setTimeOfIncident] = useState("");
  const [_Srs, setSrs] = useState("");
  const [_SiteLocation, setSiteLocation] = useState("");
  const [_Supervisor, setSupervisor] = useState("");
  const [_SupEmail, setSupEmail] = useState("");
  const [_SupTelephone, setSupTelephone] = useState("");
  const [_SupervisorName, setSupervisorName] = useState("");
  const [_WitnessEmployeeData, setWitnessEmployeeData] = useState("");
  const [_WorkingTitle, setWorkingTitle] = useState("");
  const [_DescribeTheWork, setDescribeTheWork] = useState("");
  const [_IndicateWhichPart, setIndicateWhichPart] = useState("");
  const [_ToAvoid, setToAvoid] = useState("");
  const [_safetyRuleViolated, setsafetyRuleViolated] = useState("");
  const [_Affirm, setAffirm] = useState("");
  const [_Signature, setSignature] = useState("");
  const [_DateSigned, setDateSigned] = useState("");
  const [_, set] = useState("");

  return (
    //  <TitleT>{Instructions}</TitleT>
    <form>
      <Box>
        <Container>
          <Grid container columnGap={1}>
            <Grid item md={11}>
              <TitleT>{Instructions}</TitleT>
              <LabelT>{PleaseState}</LabelT>
              <TitleT>{WitnessEmployeeData}</TitleT>
            </Grid>

            <Grid item md={4}>
              <LabelT>{EmployeeName}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={4}>
              <LabelT>{WorkingTitle}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={3}>
              <LabelT>{PersonalNumber}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={4}>
              <DateSelect label="Date of Incident"></DateSelect>
            </Grid>

            <Grid item md={4}>
              <LabelT>{TimeOfIncident}</LabelT>
              <TimeSelect></TimeSelect>
            </Grid>

            <Grid item md={3}>
              <LabelT>{Srs}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={11}>
              <LabelT>{SiteLocation}</LabelT>
              <InputField multiLine></InputField>
            </Grid>

            <Grid item md={4}>
              <LabelT>{SupervisorName}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={4}>
              <LabelT>{SupTelephone}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={3}>
              <LabelT>{SupEmail}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={11}>
              <TitleT>{IncidentDescription}</TitleT>
            </Grid>

            <Grid item md={11}>
              <LabelT>{PleaseDescribe}</LabelT>
              <InputField multiLine></InputField>
            </Grid>

            <Grid item md={11}>
              <LabelT>{DescribeTheWork}</LabelT>
              <InputField multiLine></InputField>
            </Grid>

            <Grid item md={11}>
              <LabelT>{IndicateWhichPart}</LabelT>
              <InputField multiLine></InputField>
            </Grid>

            <Grid item md={11}>
              <LabelT>{ToAvoid}</LabelT>
              <InputField multiLine></InputField>
            </Grid>

            <Grid item md={11}>
              <LabelT>{safetyRuleViolated}</LabelT>
              <InputField multiLine></InputField>
            </Grid>

            <Grid item md={11}>
              <TitleT>{Affirm}</TitleT>
            </Grid>

            <Grid item md={11}>
              <LabelT>{Affirmation}</LabelT>
              {/* <InputField></InputField> */}
            </Grid>

            <Grid item md={6}>
              <LabelT>{Signature}</LabelT>
              <InputField></InputField>
            </Grid>

            <Grid item md={5}>
              <LabelT>{DateSigned}</LabelT>
              <LabelT>a</LabelT>
            </Grid>

            <Grid item md={11}>
              <TitleT>{Revision}</TitleT>
            </Grid>

            <Grid item md={3}>
              <LabelT>Rev</LabelT>
              <LabelT>A</LabelT>
            </Grid>

            <Grid item md={3}>
              <LabelT>{Description}</LabelT>
              <LabelT>{InitialRelease}</LabelT>
            </Grid>

            <Grid item md={3}>
              <LabelT>{By}</LabelT>
              <LabelT>Angela Valentine</LabelT>
            </Grid>

            <Grid item md={2}>
              <LabelT>{RevisionDate}</LabelT>
              <LabelT>{RevisionDate}</LabelT>
            </Grid>

            <Grid item md={11}>
              <LabelT>{DocumentUncontrolled}</LabelT>
            </Grid>
            <Grid item md={12}>
              <Button variant="contained" 
              endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </form>
  );
}
function dayjs(arg0: string): any {
  throw new Error("Function not implemented.");
}
