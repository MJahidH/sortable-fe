import * as Speech from "expo-speech";



 const textToSpeech = (text) => {
  Speech.stop();
  Speech.speak(text, {
    language: `en-UK`,
    rate: 1.1,
    pitch: 1.2,
  });
};


export default textToSpeech