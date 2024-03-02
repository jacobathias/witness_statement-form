export const htmlLayout = (data,ref) => `<head>
  <title>My Document</title>
  <style>
      body { 
             font-family: Arial, sans-serif;
             display: flex;
             flex-direction: column;
             align-items: center;
             height: 100vh;
             
           }
     
           h2 {
             margin: 0;
             font-size: 1rem;
             font-weight: bold;
             text-align: center;
             margin-bottom: 1rem;
           }
     
           h3 {
             margin: 0;
             font-size: 0.5rem;
             font-weight: bold;
             margin-bottom: 0.2rem;
           }
     
           p {
             margin: 0;
             font-size: 0.7rem;
             margin-bottom: 0.5rem;
           }
     
           .form {
             display: grid;
             grid-template-columns: 1fr 1fr 1fr;
             grid-column-gap: 0.5rem;
             max-width: 800px;
             width: 90%;
           }
           .form2 {
             display: grid;
             grid-template-columns: 1fr;
             grid-column-gap: 0.5rem;
             max-width: 800px;
             width: 90%;
           }
     
           .form-group {
             display: flex;
             flex-direction: column;
             align-items: flex-start;
             margin-top: .5rem;
           }     

           .form-group label {
             font-weight: bold;
             margin-bottom: 0.3rem;
             font-size: 0.8rem;
           }
     
     
         </style>
</head>
<body>
<div ref=${ref}>
  <h2>Instructions</h2>
  

      <p>Please state your account of the incident below clearly, honestly, as fully as possible, and to the best of your recollection. The purpose of an investigation is to gather facts and pertinent information about the incident.</p>
  
  <h2>Witness Employee Data</h2>
  <form class="form">
    <div class="form-group">
      <label>Employee Name</label>
      <p>${data.employeeName}</p>
    </div>
    <div class="form-group">
      <label>Working Title</label>
      <p>${data.workingTitle}</p>
    </div>
    <div class="form-group">
      <label>Personal Number</label>
      <p>${data.personalNumber}</p>
    </div>
    <div class="form-group">
      <label>Date of Incident</label>
      <p>${data.dateOfIncident}</p>
    </div>
    <div class="form-group">
      <label>Time of Incident</label>
      <p>${data.timeOfIncident}</p>
    </div>
    <div class="form-group">
      <label>Site Location/Department</label>
      <p>${data.siteLocation}</p>
    </div>
    <div class="form-group">
      <label>Supervisor</label>
      <p>${data.supervisorName}</p>
    </div>
    <div class="form-group">
      <label>Supervisor Phone Number</label>
      <p>${data.supTelephone}</p>
    </div>
    <div class="form-group">
      <label>Supervisor Email</label>
      <p>${data.supEmail}</p>
    </div>
  </form>

  
      <H2>Incident Description</H2>
  
<div class="form2">
    <div class="form-group">
      <label>Please describe in your own words (in detail) the sequence of events that led to this incident:</label>
      <p>${data.pleaseDescribe}</p>
    </div>
    <div class="form-group">
      <label>Indicate which part(s) of the body were injured (if any):</label>
      <p>${data.indicateWhichPart}</p>
    </div>
    <div class="form-group">
      <label>Describe what the employee could have done to avoid this incident and what steps should be taken to prevent a similar occurrence:</label>
      <p>${data.toAvoid}</p>
    </div>
    <div class="form-group">
    <label>To your knowledge, was a safety rule violated?</label>
    
      <p>${data.safetyRuleViolated}</p>
      <br>
      <br>
      <br>
      <p>I, ${data.employeeName}, affirm that the facts contained in this statement are true and correct to be best of my belief.</p>
      
      </div>
      
      </div>
      ${data.Signature}
      ${tranlatedPart(data)}
      </body>`;

const tranlatedPart = (data) => {
if (data.Translation != undefined)
  return `
  <p style="page-break-after: always;">&nbsp;</p>
  <p style="page-break-before: always;">&nbsp;</p>

  <div class="form2">
    <div class="form-group">
      <label>Please describe in your own words (in detail) the sequence of events that led to this incident:</label>
      <p>${data.Translation.pleaseDescribe}</p>
    </div>

    <div class="form-group">
      <label>Indicate which part(s) of the body were injured (if any):</label>
      <p>${data.Translation.indicateWhichPart}</p>
    </div>
    <div class="form-group">
      <label>Describe what the employee could have done to avoid this incident and what steps should be taken to prevent a similar occurrence:</label>
      <p>${data.Translation.toAvoid}</p>
    </div>
    <div class="form-group">
      <label>To your knowledge, was a safety rule violated?</label>
      <p>${data.Translation.safetyRuleViolated}</p>
      
      </div>
      
      </div>
`
else return ""
};
