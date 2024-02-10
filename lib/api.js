import Swal from 'sweetalert2'

export const sendContactForm = async (data) => {

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      // If not OK, sent failed alert
      Swal.fire({
        title: '<strong>Something went wrong... </strong>',
        html: '<i>Try again later</i>',
        icon: "error",
      });
      throw new Error("Failed to send message")};      
      
      // If  OK, sent Success alert      
      Swal.fire({
        title: '<strong>Thank you!</strong>',
        html: '<i>Email Sent</i>',
        icon: "success",
      });
    const json = await res.json();
    return json;


  } catch (error) {
    throw new Error(error.message);
  }
};
