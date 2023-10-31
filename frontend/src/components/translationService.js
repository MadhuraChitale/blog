// translationService.js
import axios from "axios";

// const API_KEY = "AIzaSyBB1Z6uHBynISBxVIEO91L41XyBU8Snk_c"; //remove

const API_KEY = process.env.REACT_APP_TRANSLATE_KEY;

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        target: targetLanguage,
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation error";
  }
};
