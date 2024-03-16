'use client'
import {useRef} from 'react';
import dynamic from "next/dynamic";

const GeneratePDF = dynamic(()=>import("./../components/GeneratePDF"),{ssr:false});

export const HtmlEmailLayout = ({data}) => { const ref = useRef(null);
return (<> 
  <div className="Box-Email" ref={ref}>
    <h2>Instructions</h2>
    <div className="form2"> 
    <div className="form-group">
    <p className="text-center">PLEASE STATE YOUR ACCOUNT OF THE INCIDENT BELOW CLEARLY, HONESTLY, AS FULLY AS POSSIBLE, AND TO THE BEST OF YOUR RECOLLECTION. THE PURPOSE OF AN INVESTIGATION IS TO GATHER FACTS AND PERTINENT INFORMATION ABOUT THE INCIDENT.</p>
      </div>
    </div>
    
    <h2>Involved Person Information</h2>
    
    <div className="form1"> 
      <div className="form-group">
        <label>EMPLOYEE NAME: {data.employeeName}</label>
      </div>
      <div className="form-group">
        <label>WORKING TITLE: {data.workingTitle}</label>
      </div>
      <div className="form-group">
        <label>PERSONAL NUMBER: {data.personalNumber}</label>
      </div>
      <div className="form-group">
        <label>DATE OF INCIDENT: {data.dateOfIncident}</label>
      </div>
      <div className="form-group">
        <label>TIME OF INCIDENT: {data.timeOfIncident}</label>
      </div>
      <div className="form-group">
        <label>SITE LOCATION/DEPARTMENT: {data.siteLocation}</label>
        </div> 
      </div> 
  
      
      <h2>Supervisor Information</h2>
      
        <div className="form-group">
          <label>NAME: {data.supervisorName}</label>
        </div>
        <div className="form-group">
          <label>PHONE NUMBER: {data.supTelephone}</label>
        </div>
        <div className="form-group">
          <label>EMAIL: {data.supEmail}</label>
        </div>
      
      
      
  
  
    <br/>  
    <h2>Incident Description</h2>
    
    <div className="form2">
      <div className="form-group">
        <h4>PLEASE DESCRIBE IN YOUR OWN WORDS (IN DETAIL) THE SEQUENCE OF EVENTS THAT LED TO THIS INCIDENT:</h4>
        <p>{data.pleaseDescribe}</p>
      </div>
      <div className="form-group">
        <h3>INDICATE WHICH PARTS(S) OF TH EBODY WERE INJURED (IF ANY):</h3>
        <p>{data.indicateWhichPart}</p>
      </div>
      <div className="form-group">
        <h3>DESCRIBE WHAT THE EMPLOYEE COULD HAVE DONE TO AVOID THIS INCIDENT AND WHAT STEPS SHOULD BE TAKEN TO PREVENT A SIMILAR OCCURANCE:</h3>
        <p>{data.toAvoid}</p>
      </div>
      <div className="form-group">
        <h3>TO YOUR KNOWLEDGE, WAS A SAFETY RULE VIOLATED? IF YES, WHAT COULD YOU HAVE DONE TO AVOID IT?</h3>
        <p>{data.isSafetyRuleViolated}</p>
        <p>{data.SafetyRuleViolated}</p>
        <h3>ACKNOWLEDGEMENT</h3>
        <p>I, {data.employeeName}, affirm that the facts contained in this statement are true and correct to be best of my belief.</p>
      </div>
    </div>
    <div><img src={data.Signature} width='400'/></div>

  </div>
    {
      /**-------------------- PAGE 2 --------------------- */
        data.Translation != undefined &&
        (<div className="Box-Email-Translated" ref={ref}>
       
          <div className="form2">
            <div className="form-group">
            <h2 className="text-center warning">SELF TRANSLATION</h2>
            <h3 className="text-center warning">DICLAIMER: THIS IS AN AUTOMATICALLY TRANSLATION OF THE ORIGINAL STATEMENT</h3>

              <h3>PLEASE DESCRIBE IN YOUR OWN WORDS (IN DETAIL) THE SEQUENCE OF EVENTS THAT LED TO THIS INCIDENT:</h3>
              <p>{data.Translation.pleaseDescribe}</p>
            </div>
            <div className="form-group">
              <h3>INDICATE WHICH PARTS(S) OF THE BODY WERE INJURED (IF ANY) Indicate which part(s) of the body were injured (if any):</h3>
              <p>{data.Translation.indicateWhichPart}</p>
            </div>
            <div className="form-group">
              <h3>DESCRIBE WHAT THE EMPLOYEE COULD HAVE DONE TO AVOID THIS INCIDENT AND WHAT STEPS SHOULD BE TAKEN TO PREVENT A SIMILAR OCCURANCE:</h3>
              <p>{data.Translation.toAvoid}</p>
            </div>
            
            <div className="form-group">
              <h3>TO YOUR KNOWLEDGE, WAS A SAFETY RULE VIOLATED? IF YES, WHAT COULD YOU HAVE DONE TO AVOID IT?</h3>
              <p>{data.Translation.isSafetyRuleViolated}</p>
              <p>{data.Translation.SafetyRuleViolated}</p>
            </div>
          </div>
        </div>)
      }
      </>);
      
}
