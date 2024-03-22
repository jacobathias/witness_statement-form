
import React, { useState, useRef,useEffect } from "react";
import {Container,Grid,TextField,Button,Card,Divider, Box, Switch,Collapse } from "@mui/material";

import TitleT from "../../components/TitleT";
import LabelT from "../../components/LabelT";
import LanguageSelect from "../../components/LanguageSelect";
import SelectEHS from "../../components/SelectEHS";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import { sendContactForm } from "../../lib/api";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker  } from "@mui/x-date-pickers";
import { Translate } from "../Translate";
import {emptyValues, enValues, esValues, htValues} from "../initValues"
import { useTranslation, i18n } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router'
import SignatureCanvas from 'react-signature-canvas'
import {generatePdfByImage} from '../../lib/generatePdf'
import LayoutPdf from "../layoutPdf";

const initState = { values: emptyValues };

export default function Home (){
  //Hooks
  const { t } = useTranslation('common');
  const router = useRouter()

  const [state,            setState]            = useState(initState);
  const [touched,          setTouched]          = useState({});
  const [timeValue,        setTimeValue]        = useState('');
  const [dateValue,        setDateValue]        = useState('');
  // const [timeValue,        setTimeValue]        = useState(dayjs());
  // const [dateValue,        setDateValue]        = useState(dayjs());
  const [language,         setLanguage]         = useState(router?.locale ?? "en");
  const [ehs,              setEHS]              = useState('jathias@pgtindustries.com');
  const [isSigned,         setIsSigned]         = useState(false);
  const [theSignature,     setSignature]        = useState('');
  const [isEmailValid,     setIsEmailValid]     = useState(null);
  const [canSign,          setCanSign]          = useState(false)
  const [canSubmit,        setCanSubmit]        = useState(false)
  const [isSafetyViolated, setIsSafetyViolated] = useState(true)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  
  useEffect( ()=> {allowSubmit()} )
  
  const handleEHS = (event) =>  {setEHS(event.target.value);};
  const handleLang = (event) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
    i18n.changeLanguage(newLocale);
    setLanguage(newLocale);
  };
  const handleChange = ({ target }) =>  setState((prev) =>   ({ ...prev, values:{ ...prev.values, [target.name]: target.value },[target.name]: true}));
  const onBlur       = ({ target }) =>  setTouched((prev) => ({ ...prev, [target.name]: true }));
  const handleTime   =  (newValue)  => {setTimeValue(newValue);};
  const handleDate   =  (newValue)  => {setDateValue(newValue);};
  const handleIsSafetyViolated   =  (event)  => {setIsSafetyViolated(event.target.checked);};
  // const handleSigned =  (target)    => {setIsSigned(target);}
  
  const { values, isLoading } = state;
  let sigPad = useRef({});
  let Signature;

  //Business Rules
  
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

  function checkSafetyRuleViolated(){
    if (isSafetyViolated) {
      values.isSafetyRuleViolated = 'Yes'
      return true
    }
    else {
      values.isSafetyRuleViolated = 'No'
      return false
    }
  }

  function allowSubmit(){
    
    setCanSubmit(false) 
    setCanSign(false)
    setIsEmailValid(true)
    if (!values.employeeName) return 
    if (!timeValue) return
    if (!values.pleaseDescribe) return 
    if (!values.indicateWhichPart) return 
    if (!values.toAvoid) return 
    if (checkSafetyRuleViolated() && !values.SafetyRuleViolated) return
    
    setIsEmailValid(values.supEmail === '' || emailRegex.test(values.supEmail));
    if (isEmailValid == false) return
    setCanSign(true)
    if (isSigned== false) return
    setCanSubmit(true) 

  }
  const onSubmit = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));  
    try {
      var tObj;
      if (language == undefined) {setLanguage('en')}
      if (language !='en') {
        var longString = await Translate(language, makeLongString())
        const  [employeeName, workingTitle, personalNumber, siteLocation, supervisorName, supTelephone, supEmail, pleaseDescribe, indicateWhichPart, toAvoid, isSafetyRuleViolated, SafetyRuleViolated] = longString.split(" || ");
        tObj = {employeeName, workingTitle, personalNumber, siteLocation, supervisorName, supTelephone, supEmail, pleaseDescribe, indicateWhichPart, toAvoid, isSafetyRuleViolated, SafetyRuleViolated};
      }
      //Faz um novo objeto com os values do form e adicionando os do tempo de data
      //Faz um novo objeto chamado new_values
      const new_values = {
        ...values,// Abre o array values e adiciona as outras variaveis abaixo
        dateOfIncident: dateValue.format("MM-DD-YYYY"),
        timeOfIncident: timeValue.format("HH:mm A"),
        to: [ehs, values.supEmail],
        Translation: tObj == undefined ? undefined : tObj,
        pdf:'',
        Signature: theSignature
      };
      
      //Gera o PDF
      const html = LayoutPdf({data:new_values})
      const pdf = await generatePdfByImage(html,language);
      new_values.pdf = pdf;
      
      //SEND MAIL -------------
      await sendContactForm(new_values);

      setTouched({});
      // setState(initState);
      // setState(initState);
    } catch (error) {
      setState((prev) => ({...prev,isLoading: false,error: error.message,}))}
    };

  // CONVERT EVERY ATRIBUTE INTO ONE BIG STRING FOR TRANSLATION
  function makeLongString() { return (Object.values(values).join(' || '));} 

  return (
    
    <Box>    
      <Container>    
        {/*  ################################################################################################################################################################################################################## HEADER */}
        
        <Grid spacing={2}>
          <h2>Hermes Incident Statement</h2>
        </Grid>
        <Grid container spacing={2}  >
          <Grid item md={6} xs={12}>
            <LanguageSelect
              onChange={handleLang}
              value={language}
            ></LanguageSelect>
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <SelectEHS value={ehs} onChange={handleEHS}></SelectEHS>
          </Grid>
          <Grid item md={12} xs={12} sm={12}>
            <TitleT>{t("Instructions")}</TitleT>
            <LabelT>{t("PleaseState")}</LabelT>
            <TitleT>{t("WitnessEmployeeData")}</TitleT>
          </Grid>
          {/*  ########################################################################################################################### Witness Employee Data */}
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
              value={values.workingTitle}
              onChange={handleChange}
              onBlur={onBlur}
            ></TextField>
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              type="number" 
              label={t("PersonalNumber")}
              fullWidth
              name="personalNumber"
              value={values.personalNumber}
              onChange={handleChange}
              onBlur={onBlur}
              inputMode ='tel' pattern="[0-9]*"
              inputProps={{ inputMode: 'tel' }}
            ></TextField>
          </Grid>
          {/* <PdfComp></PdfComp> */}

          <Grid item md={4} xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label={t("DateOfIncident")}
                inputFormat="MM/DD/YYYY"
                value={dateValue}
                onChange={handleDate}
                onBlur={onBlur}
                renderInput={(params) => <TextField {...params} 
                required
                name='dateOfIncident'
                error={touched.dateOfIncident && !dateValue}
                onBlur={onBlur}
                />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item md={4} xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
              required
                // components={{ OpenPickerIcon: AccessTimeIcon }}
                value={timeValue}
                label={t("TimeOfIncident")}
                onChange={handleTime}
                renderInput={(params) => <TextField {...params} 
                required
                name='timeOfIncident'
                error={touched.timeOfIncident && !timeValue}
                onBlur={onBlur}/>}
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
              value={values.supervisorName}
              onChange={handleChange}
              onBlur={onBlur}
            ></TextField>
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
          
            <TextField
              type="number"
              label={t("SupTelephone")}
              fullWidth
              name ="supTelephone"
              inputMode ='tel' pattern="[0-9]*" 
              inputProps={{ inputMode: 'tel' }}            
              
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
              error={!isEmailValid } // Set error state based on email validation
              helperText={!isEmailValid && 'Enter a valid email'} // Display error message if email is invalid
            ></TextField>
          </Grid>

          {/*  ###################################################################################################### Incident Description */}
          <Grid item md={12} xs={12}>
            <TitleT>{t("IncidentDescription")}</TitleT>
          </Grid>

          <Grid item md={12} xs={12}>
            <LabelT>{t("PleaseDescribe")+' *'}</LabelT>
            <TextField
              type="text"
              fullWidth
              multiline
              minRows={3}    
              name="pleaseDescribe"
              error={touched.pleaseDescribe && !values.pleaseDescribe}
              value={values.pleaseDescribe}
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
              minRows={3}    
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
              minRows={3}          
              name="toAvoid"
              error={touched.toAvoid && !values.toAvoid}
              value={values.toAvoid}
              onChange={handleChange}
              onBlur={onBlur}
            ></TextField>
          </Grid>

          <Grid item md={6} xs={6} ><LabelT>{t("SafetyRuleViolated")+' *'}</LabelT></Grid>          
          <Grid item md={6} xs={6}>
            <Switch checked={isSafetyViolated} 
            onChange={handleIsSafetyViolated}/>
            {isSafetyViolated ? t ("Yes"): t("No")}
          </Grid>  
            <Grid item md={12} xs={12}>
          <Collapse in={isSafetyViolated}>
          <LabelT>{t("WhichRule")+' *'}</LabelT>
              <TextField 
              type="text"
              fullWidth
              multiline
              required={isSafetyViolated}
              minRows={3}
              name="SafetyRuleViolated"
              error={touched.SafetyRuleViolated && !values.SafetyRuleViolated}
              value={values.SafetyRuleViolated}
              onChange={handleChange}
              onBlur={onBlur}
              ></TextField>
          </Collapse>
            </Grid>
      
          {/* ############################################################################## SIGANTURE */}
          <Collapse in={canSign}>
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
          {/* ##################################################################################### Submit */}
          <Grid item md={12} xs={12}><Divider></Divider></Grid>
          <Grid item md={6} sm={6} xs={12} marginBottom={15}>          
            <LoadingButton size="large"
            variant="contained"
            disabled={!canSubmit}
            endIcon={<SendIcon />}
            onClick={onSubmit}
            loading={isLoading}>
            {t("SubmitStatement")}
            </LoadingButton>
          </Grid>
          </Collapse>
        

        </Grid>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Box>
    );
}


export const getStaticProps  = async ({ locale }) => {
  return {props: {...(await serverSideTranslations(locale))}};
};
