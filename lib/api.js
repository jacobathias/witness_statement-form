export const sendContactForm = async (data) =>
  fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "Application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    else console.log('Email Sent')
    return res.json();
  });
