export default function LayoutPdf({data,ref}){
    return (<> 
        <div className="Box-Email" ref={ref}>
          <h2>Instructions</h2>
          <div className="form2"> 
          <div className="form-group">
          <p className="text-center">PLEASE STATE YOUR ACCOUNT OF THE INCIDENT BELOW CLEARLY, HONESTLY, AS FULLY AS POSSIBLE, AND TO THE BEST OF YOUR RECOLLECTION. THE PURPOSE OF AN INVESTIGATION IS TO GATHER FACTS AND PERTINENT INFORMATION ABOUT THE INCIDENT.</p>
            </div>
          </div>
          <br/>
          
          <h2>Involved Person Information</h2>
          
          <div className="form1"> 
            <div className="form-group">
              <label>EMPLOYEE NAME</label>
              <p>{data.employeeName}</p>
            </div>
            <div className="form-group">
              <label>WORKING TITLE</label>
              <p>{data.workingTitle}</p>
            </div>
            <div className="form-group">
              <label>PERSONAL NUMBER</label>
              <p>{data.personalNumber}</p>
            </div>
            <div className="form-group">
              <label>DATE OF INCIDENT</label>
              <p>{data.dateOfIncident}</p>
            </div>
            <div className="form-group">
              <label>TIME OF INCIDENT</label>
              <p>{data.timeOfIncident}</p>
            </div>
            <div className="form-group">
              <label>SITE LOCATION/DEPARTMENT</label>
              <p>{data.siteLocation}</p>
              </div> 
            </div> 
        
            <br /><br />
            <h2>Supervisor Information</h2>
            
            <div className="form1">  
              <div className="form-group">
                <label>NAME</label>
                <p>{data.supervisorName}</p>
              </div>
              <div className="form-group">
                <label>PHONE NUMBER</label>
                <p>{data.supTelephone}</p>
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <p>{data.supEmail}</p>
              </div>
            </div>
            
            
        
        
          <br/>  
       
          <h2>Incident Description</h2>

          <div className="form2">
            <div className="form-group">
              <label>PLEASE DESCRIBE IN YOUR OWN WORDS (IN DETAIL) THE SEQUENCE OF EVENTS THAT LED TO THIS INCIDENT:</label>
              <p>{data.pleaseDescribe}</p>
            </div>
            <div className="form-group">
              <label>INDICATE WHICH PARTS(S) OF TH EBODY WERE INJURED (IF ANY):</label>
              <p>{data.indicateWhichPart}</p>
            </div>
            <div className="form-group">
              <label>DESCRIBE WHAT THE EMPLOYEE COULD HAVE DONE TO AVOID THIS INCIDENT AND WHAT STEPS SHOULD BE TAKEN TO PREVENT A SIMILAR OCCURANCE:</label>
              <p>{data.toAvoid}</p>
            </div>
            <div className="form-group">
              <label>TO YOUR KNOWLEDGE, WAS A SAFETY RULE VIOLATED? IF YES, WHAT COULD YOU HAVE DONE TO AVOID IT?</label>
              <p>{data.isSafetyRuleViolated}</p>
              <p>{data.SafetyRuleViolated}</p>
            </div>
            <div className="form-group">
              <label>ACKNOWLEDGEMENT</label>
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
                    <h2 className="text-center">THIS IS AN AUTOMATIC TRANSLATION OF THE ORIGINAL STATEMENT</h2>
                  <div className="form-group">
                  <label>PLEASE DESCRIBE IN YOUR OWN WORDS (IN DETAIL) THE SEQUENCE OF EVENTS THAT LED TO THIS INCIDENT:</label>
                    <p>{data.Translation.pleaseDescribe}</p>
                  </div>
                  <div className="form-group">
                    <label>INDICATE WHICH PARTS(S) OF TH EBODY WERE INJURED (IF ANY) Indicate which part(s) of the body were injured (if any):</label>
                    <p>{data.Translation.indicateWhichPart}</p>
                  </div>
                  <div className="form-group">
                    <label>DESCRIBE WHAT THE EMPLOYEE COULD HAVE DONE TO AVOID THIS INCIDENT AND WHAT STEPS SHOULD BE TAKEN TO PREVENT A SIMILAR OCCURANCE:</label>
                    <p>{data.Translation.toAvoid}</p>
                  </div>
                  <div className="form-group">
                    <label>TO YOUR KNOWLEDGE, WAS A SAFETY RULE VIOLATED? IF YES, WHAT COULD YOU HAVE DONE TO AVOID IT?</label>
                    <p>{data.Translation.isSafetyRuleViolated}</p>
                    <p>{data.Translation.SafetyRuleViolated}</p>
                  </div>
                </div>
              </div>)
            }
            </>
        )
}