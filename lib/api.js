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

    if (!res.ok) throw new Error("Failed to send message");

    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};
