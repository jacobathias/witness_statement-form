
import React, { useState, useRef,useEffect } from "react";
import {Container,Grid,TextField,Button,Card,Divider, Box} from "@mui/material";

import TitleT from "../../components/TitleT";
import LabelT from "../../components/LabelT";
import LanguageSelect from "../../components/LanguageSelect";
import SelectEHS from "../../components/SelectEHS";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { sendContactForm } from "../../lib/api";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Translate } from "../Translate";
import dayjs from "dayjs";
import {emptyValues, enValues, esValues} from "../initValues"
import { useTranslation, i18n } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router'
import SignatureCanvas from 'react-signature-canvas'

const initState = { values: enValues };

export default function Home (){
  //Hooks
  const { t } = useTranslation('common');
  // function t(x) {return x} 
  const [state, setState] =         useState(initState);
  const [touched, setTouched] =     useState({});
  const [timeValue, setTimeValue] = useState(dayjs());
  const [dateValue, setDateValue] = useState(dayjs());
  const [language, setLanguage] =   useState("en");
  const [ehs, setEHS] =             useState('jathias@pgtindustries.com');
  const [isSigned, setIsSigned] =   useState(false);
  const [theSignature, setSignature] =   useState('');
  const [canSubmit, setCanSubmit] = useState(false)

  let sigPad = useRef({});
  
  const { values, isLoading, error } = state;
  const router = useRouter()

  // Handles
  const handleEHs = (event) =>  {
    setEHS(event.target.value);
  };


  const handleLang = (event) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
    i18n.changeLanguage(newLocale);
    setLanguage(newLocale);
  };

   useEffect(()=> {
      allowSubmit()
  })

    
    const handleChange = ({ target }) =>  setState((prev) =>   ({ ...prev, values:{ ...prev.values, [target.name]: target.value },[target.name]: true}));
    const onBlur       = ({ target }) =>  setTouched((prev) => ({ ...prev, [target.name]: true }));
    const handleTime   =  (newValue)  => {setTimeValue(newValue);};
    const handleDate   =  (newValue)  => {setDateValue(newValue);};
    const handleSigned =  (target)    => {setIsSigned(target);}



    
    let Signature;

  //Busines Rules
  const onSubmit = async () => {setState((prev) => ({ ...prev, isLoading: true }));    
  try {
    var tObj;
    if (language !='en') {
      var str = await Translate(language, makeLongString())
      const [employeeName, workingTitle, personalNumber, siteLocation, supervisorName, supTelephone, supEmail, pleaseDescribe, describeTheWork, indicateWhichPart, toAvoid, safetyRuleViolated] = str.split(" || ");
       tObj = {employeeName,workingTitle,personalNumber,siteLocation,supervisorName,supTelephone,supEmail,pleaseDescribe,describeTheWork,indicateWhichPart,toAvoid,safetyRuleViolated};
    }
      //Criando um novo objeto com os values do form e adicionando o sdo tempo de data
      const new_values = {...values,
        dateOfIncident: dateValue.format("MM-DD-YYYY"),
        timeOfIncident: timeValue.format("HH:mm A"),
        to: [ehs, values.supEmail],
        Translation:  tObj == undefined ? undefined : tObj,
        Signature: `<img src=${theSignature} />`
      };
      // debugger;
      await sendContactForm(new_values);
      setTouched({});
      setState(initState);
    } catch (error) {setState((prev) => ({...prev,isLoading: false,error: error.message,}))}
  };
  
  function clear(){
    sigPad.current.clear()
    setIsSigned(false)
  }
  function saveSignature(){
    console.log('Signature saved')
    Signature = sigPad.current.toDataURL()
    setSignature(sigPad.current.toDataURL())
    setIsSigned(true)
  }

  function allowSubmit(){
    setCanSubmit(false) 
    if (!values.employeeName) return 
    if (!values.pleaseDescribe) return 
    if (!values.describeTheWork) return 
    if (!values.indicateWhichPart) return 
    if (!values.toAvoid) return 
    if (!values.safetyRuleViolated) return 
    if (isSigned== false) return
    setCanSubmit(true) 
  }

  // CONVERT AVERY ATRIBUTE INTO ONE STRING FOR TRANSLATION
  function makeLongString(){ return (Object.values(values).join(' || '));} 

  return (
    
    <Box>    
    <Container>
  
      {/*  ######################################################################################################### HEADER */}
      <Grid container spacing={3}  >
          <Grid item md={6} xs={12}>
            <LanguageSelect
              onChange={handleLang}
              value={language}
            ></LanguageSelect>
          </Grid>
       

        <Grid item md={12} xs={12} sm={12}>
          <TitleT>{t("Instructions")}</TitleT>
          <LabelT>{t("PleaseState")}</LabelT>
          <TitleT>{t("WitnessEmployeeData")}</TitleT>
        </Grid>

        {/*  ######################################### Witness Employee Data */}

        <Grid item md={4} sm={6} xs={12}>
          {/* <LabelT>{EmployeeName}</LabelT> */}
          <TextField
            type="text"
            inputMode="text"
            label={t("EmployeeName")}
            required
            fullWidth
            name="employeeName"
            error={touched.employeeName && !values.employeeName}
            value={values.employeeName}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <TextField
            type="input"
            label={t("WorkingTitle")}
            fullWidth
            name="workingTitle"
            // error={touched.workingTitle && !values.workingTitle}
            value={values.workingTitle}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField
            type="tel"
            inputMode="tel"
            inputProps={{ inputMode: 'tel'}}
            label={t("PersonalNumber")}
            fullWidth
            name="personalNumber"
            value={values.personalNumber}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>
        {/* <PdfComp></PdfComp> */}

        <Grid item md={4} xs={6}>
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

        <Grid item md={4} xs={6}>
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

        <Grid item md={12} sm={12} xs={12}>
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

        <Grid item md={4} sm={6} xs={12}>
          <TextField
            type="text"
            label={t("SupervisorName")}
            fullWidth
            name="supervisorName"
            // error={touched.supervisorName && !values.supervisorName}
            value={values.supervisorName}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <TextField
            type="tel"
            label={t("SupTelephone")}
            fullWidth
            name="supTelephone"
            // error={touched.supTelephone && !values.supTelephone}
            value={values.supTelephone}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField
            type="email"
            inputMode="email"
            label={t("SupEmail")}
            fullWidth
            name="supEmail"
            value={values.supEmail}
            onChange={handleChange}
            onBlur={onBlur}
          ></TextField>
        </Grid>

        {/*  ######################################### Incident Description */}
        <Grid item md={12} xs={12}>
          <TitleT>{t("IncidentDescription")}</TitleT>
        </Grid>

        <Grid item md={12} xs={12}>
          <LabelT>{t("PleaseDescribe")+' *'}</LabelT>
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

        <Grid item md={12} xs={12}>
          <LabelT>{t("DescribeTheWork")+' *'}</LabelT>
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

        <Grid item md={12} xs={12}>
          <LabelT>{t("IndicateWhichPart")+' *'}</LabelT>
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

        <Grid item md={12} xs={12}>
          <LabelT>{t("ToAvoid")+' *'}</LabelT>
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

        <Grid item md={12} xs={12}>
          <LabelT>{t("SafetyRuleViolated")+' *'}</LabelT>
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

        <Grid item md={12} xs={12}>
          <LabelT>{t("Signature")+' *'}</LabelT>
          <Card elevation={5}>
            <SignatureCanvas 
              penColor='blue' 
              backgroundColor ='white' 
              onEnd={saveSignature}
              ref = {sigPad}
                canvasProps={{
                  width: 750, 
                  height: 200,
                  className: 'sigCanvas'}} />,
          </Card>
          
            <Grid item md={9} xs={12}></Grid>
            <Grid item md={3} xs={12}>
              <Button onClick={clear}>{t("ClearSignature")}</Button>
            </Grid>
          
        </Grid>

        <Grid item md={12} xs={12}><Divider></Divider></Grid>
        
          <Grid item md={6} sm={6} xs={12}>
            <SelectEHS value={ehs} onChange={handleEHs}></SelectEHS>
          </Grid>

          <Grid item md={6} sm={6} xs={12} marginBottom={15}>          
            <LoadingButton size="large"
              variant="contained"
              

              // disabled={!isSigned}
              disabled={!canSubmit}
              // disabled={!values.name && !values.workingTitle && isSigned}
              // disabled={!Signature}
              endIcon={<SendIcon />}
              onClick={onSubmit}
              loading={isLoading}
            >
              {t("SubmitStatement")}
            </LoadingButton>         
          
        </Grid>
      </Grid>
    </Container>
    </Box>
    );
}



//getServeSideProps wors too
export const getStaticProps  = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};
