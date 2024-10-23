import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchEmailBySubject = async (text) => {
    const speakMessage =async (message) => {
      const currentUserState = await AsyncStorage.getItem('userDetails');
      const access = JSON.parse(currentUserState);
      console.log("currentUserState",access['gender'])
      Tts.stop();
      if(access['gender']=='male'){
        Tts.setDefaultVoice('hi-in-x-hia-local');
      }
      else{
        Tts.setDefaultVoice('en-gb-x-gbb-network');
      }
      
      Tts.speak(message);
      };
  try {
    console.log("subject", text);

    // Fetch user details from AsyncStorage
    const userDetails = await AsyncStorage.getItem('userDetails');
    const access = JSON.parse(userDetails);
    console.log('DASHBOARD EMAIL:', access['email']);
    console.log('DASHBOARD APP PASSWORD:', access['accesspassword']);

    // Fetch emails from backend
    const response = await fetch('https://zora-backend-5.onrender.com/fetch-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: access['email'],
        password: access['accesspassword'],
      }),
    });

    // Parse the response
    const data = await response.json();

    // Find the email by subject (case-insensitive)
    const email = data.find(element => element.subject.toLowerCase() === text.toLowerCase());
    console.log(email);

    // Respond based on whether the email was found
    if (email !== undefined) {
      const sentence = email['plainText']
      const words = email['plainText'].split(' ');
      console.log(words.length);
      if(words.length<60){
        speakMessage(`SUBJECT OF THE MAIL IS ${email['subject']} AND BODY IS ${email['plainText'].split('--')[0].trim()}`);
      }
      else{
        console.log(sentence.trim().replace(/\s+/g, ' '));
        var str=`Draft a follow-up concise specific summary of the email in a brief narrative format and paragraph in directive speach: ${sentence.trim().replace(/\s+/g, ' ')}`;
        console.log(str)
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response_9 = await fetch(
          'https://zora-backend-5.onrender.com/summarize',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: str
            }),
          },
        );
        const data = await response_9.json();
        console.log("result",data)
        speakMessage(`SUMMARIZED MAIL IS ${data['generated_text']}`);
      }
    } else {
      speakMessage(`NO MAIL IS FOUND WITH THE SUBJECT ${text}`);
    }

  } catch (error) {
    console.error("Error fetching email:", error);
    speakMessage("An error occurred while fetching the email.");
  }
};
