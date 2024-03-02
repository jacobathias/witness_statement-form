export async function Translate(langSource, textToTranslate) {
  if (langSource === "en") {
    return; //

    
  } else {
    console.log("Translating");
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "0536704df5mshe4ffa38d0c8c63cp12990djsn8f24c47578db",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: new URLSearchParams({
        source_language: langSource,
        target_language: "en",
        text: textToTranslate,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data.translatedText);
      return (result.data.translatedText)
    } catch (error) {
      console.error(error);
      return error
    }
	
  }
}
