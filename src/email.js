'use client'
import {useRef} from 'react';
import dynamic from "next/dynamic";

const GeneratePDF = dynamic(()=>import("./../components/GeneratePDF"),{ssr:false});

export const HtmlLayout = (data) => {
  const REF = useRef();

return (<> 
<div className="Box-Email" ref={REF}>
  <h2>Instructions</h2>
  <div className="form2"> 
  <div className="form-group">
  <p className="text-center">Please state your account of the incident below clearly, honestly, as fully as possible, and to the best of your recollection. The purpose of an investigation is to gather facts and pertinent information about the incident.</p>
    </div>
  </div>
  <br/>
  <h2>Witness Employee Data</h2>
  <div className="form1"> 
    <div className="form-group">
      <label>Employee Name</label>
      <p>{data.employeeName}</p>
    </div>
    <div className="form-group">
      <label>Working Title</label>
      <p>{data.workingTitle}</p>
    </div>
    <div className="form-group">
      <label>Personal Number</label>
      <p>{data.personalNumber}</p>
    </div>
    <div className="form-group">
      <label>Date of Incident</label>
      <p>{data.dateOfIncident}</p>
    </div>
    <div className="form-group">
      <label>Time of Incident</label>
      <p>{data.timeOfIncident}</p>
    </div>
    <div className="form-group">
      <label>Site Location/Department</label>
      <p>{data.siteLocation}</p>
    </div>
    <div className="form-group">
      <label>Supervisor</label>
      <p>{data.supervisorName}</p>
    </div>
    <div className="form-group">
      <label>Supervisor Phone Number</label>
      <p>{data.supTelephone}</p>
    </div>
    <div className="form-group">
      <label>Supervisor Email</label>
      <p>{data.supEmail}</p>
    </div>
  </div> 
  <br/>
  <h2>Incident Description</h2>
  
  <div className="form2">
    <div className="form-group">
      <label>Please describe in your own words (in detail) the sequence of events that led to this incident:</label>
      <p>{data.pleaseDescribe}</p>
    </div>
    <div className="form-group">
      <label>Indicate which part(s) of the body were injured (if any):</label>
      <p>{data.indicateWhichPart}</p>
    </div>
    <div className="form-group">
      <label>Describe what the employee could have done to avoid this incident and what steps should be taken to prevent a similar occurrence:</label>
      <p>{data.toAvoid}</p>
    </div>
    <div className="form-group">
      <label>To your knowledge, was a safety rule violated?</label>
    
      <p>{data.safetyRuleViolated}</p>
      <br/>
      <br/>
      <br/>
      <p>I, {data.employeeName}, affirm that the facts contained in this statement are true and correct to be best of my belief.</p>
      
    </div>
  </div>
  <p>{data.Signature}</p>
  {
      data.Translation != undefined &&
      (<>
        <p style="page-break-after: always;">&nbsp;</p>
        <p style="page-break-before: always;">&nbsp;</p>
      
        <div className="form2">
          <div className="form-group">
            <label>Please describe in your own words (in detail) the sequence of events that led to this incident:</label>
            <p>{data.Translation.pleaseDescribe}</p>
          </div>
          <div className="form-group">
            <label>Indicate which part(s) of the body were injured (if any):</label>
            <p>{data.Translation.indicateWhichPart}</p>
          </div>
          <div className="form-group">
            <label>Describe what the employee could have done to avoid this incident and what steps should be taken to prevent a similar occurrence:</label>
            <p>{data.Translation.toAvoid}</p>
          </div>
          <div className="form-group">
            <label>To your knowledge, was a safety rule violated?</label>
            <p>{data.Translation.safetyRuleViolated}</p>
          </div>
        </div>
      </>)
  
  }
  
</div>
<GeneratePDF html={REF}/>
</>);
      
}
