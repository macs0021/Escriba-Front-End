import axios from "axios";

export async function getDefinition(word) {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { error: "No definition for this word can be found" };
      } else {
        return { error: "An error occurred while fetching the definition" };
      }
    }
  }