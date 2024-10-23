import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestCameraPermission, openCamera} from './CameraUtils';
import {getContacts, initiateCall} from './CallUtils';
import {
  openMessaging,
  openAppStore,
  openCalendar,
  openContacts,
  openSettings,
  openYouTube,
} from './AppUtils';
import {sendSMS} from './MessageUtils';
import Tts from 'react-native-tts';

export const VoiceUtils = cleanedText => {
  // const [voiceId,setvoiceId]=useState('en-gb-x-gbb-network')
  const handleCameraPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      openCamera();
    }
  };

  const speakMessage = async (message) => {
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

  fetch('https://spacy-4.onrender.com/extract-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sentence: cleanedText, // Send cleaned text as "sentence"
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data);
      if (data[0] === 'Open the Camera') {
        speakMessage('OPENING THE CAMERA');
        handleCameraPress();
      } 
      else if ( data[0] === 'Message' && (data.length === 1 ||data[1].toLowerCase() === 'message' || data[1].toLowerCase() === 'inbox')) {
        speakMessage('OPENING THE MESSAGING APP');
        openMessaging();
      } 
      else if (data[0] === 'Call' && (data.length === 1 || data[1].toLowerCase() === 'calling' || data[1].toLowerCase() === 'call' ||data[1].toLowerCase() === 'contacts') ) {
        speakMessage('OPENING THE CONTACTS');
        openContacts();
      } else if (data[0] === 'Open the Calendar') {
        speakMessage('OPENING THE CALENDAR');
        openCalendar();
      } else if (data[0] === 'Open the Settings') {
        speakMessage('OPENING THE SETTINGS');
        openSettings();
      } else if (data[0] === 'Open the Youtube') {
        speakMessage('OPENING THE YOUTUBE');
        openYouTube();
      } else if (data[0] === 'Open the PlayStore') {
        speakMessage('OPENING THE PLAYSTORE');
        openAppStore();
      } else if (data[0] === 'Call') {
        const searchTerm = data[1];
        speakMessage(`CALLING ${searchTerm}`);
        getContacts(fetchedContacts => {
          console.log(fetchedContacts.length);
          console.log('searched term', searchTerm);
          const selectedContact = fetchedContacts.find(
            contact =>
              contact.displayName &&
              contact.displayName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
          );
          console.log('Calling:', selectedContact);
          if (
            selectedContact &&
            selectedContact.phoneNumbers &&
            selectedContact.phoneNumbers.length > 0
          ) {
            initiateCall(selectedContact.phoneNumbers[0].number);
          } else {
            Alert.alert(
              'No Contact Found',
              `No Contact found as ${searchTerm}`,
            );
          }
        });
      } else if (data[0] === 'Message') {
        const searchTerm = data[1];
        getContacts(fetchedContacts => {
          console.log(fetchedContacts.length);
          console.log('searched term', searchTerm);
          const selectedContact = fetchedContacts.find(
            contact =>
              contact.displayName &&
              contact.displayName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
          );
          console.log('Calling:', selectedContact);
          if (
            selectedContact &&
            selectedContact.phoneNumbers &&
            selectedContact.phoneNumbers.length > 0
          ) {
            console.log(
              'MESSAGE NUMBER',
              selectedContact.phoneNumbers[0].number,
            );
            speakMessage(`OPENING INBOX OF ${searchTerm}`);
            sendSMS(selectedContact.phoneNumbers[0].number);
          } else {
            Alert.alert('No Person Found', `No Contact found as ${searchTerm}`);
          }
        });
      } 
      else if (data[0] === 'Read the Latest Mail') {
        const checkUserDetails = async () => {
          const userDetails = await AsyncStorage.getItem('userDetails');
          const access = JSON.parse(userDetails);
          console.log('DASHBOARD EMAIL:', access['email']);
          console.log('DASHBOARD APP PASSWORD:', access['accesspassword']);
          const response = await fetch(
            'https://zora-backend-5.onrender.com/fetch-emails',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: access['email'],
                password: access['accesspassword'],
              }),
            },
          );
          const data = await response.json();
          console.log(data[0]);
          const sentence = data[0]['plainText']
          const words = data[0]['plainText'].split(' ');
          console.log(words.length);
          if(words.length<60){
            speakMessage(`SUBJECT OF THE MAIL IS ${data[0]['subject']} AND
              BODY IS ${data[0]['plainText'].split('--')[0].trim()}`);
          }
          else{
            console.log(sentence.trim().replace(/\s+/g, ' '));
            var str=`Draft a follow-up concise specific summary of the email in a brief narrative format and paragraph in directive speach: ${sentence.trim().replace(/\s+/g, ' ')}`;
            console.log(str)
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
          }
          
        checkUserDetails();
      } else if (data[0] === 'Reply the Latest Mail') {
        const checkUserDetails = async () => {
          const userDetails = await AsyncStorage.getItem('userDetails');
          const access = JSON.parse(userDetails);
          console.log('DASHBOARD EMAIL:', access['email']);
          console.log('DASHBOARD APP PASSWORD:', access['accesspassword']);
          const response = await fetch(
            'https://zora-backend-5.onrender.com/fetch-emails',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: access['email'],
                password: access['accesspassword'],
              }),
            },
          );
          const data = await response.json();
          console.log(data[0]);
          const sentence = data[0]['plainText']
          console.log(sentence.trim().replace(/\s+/g, ' '));
          var str_9=`Generate a concise, specific reply to the following email: ${sentence.trim().replace(/\s+/g, ' ')}`;
          console.log(str_9)
          const response_9 = await fetch(
            'https://zora-backend-5.onrender.com/summarize',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: str_9
              }),
            },
          );
          const data_9 = await response_9.json();
          console.log("Result Final:",data_9['generated_text'])
          speakMessage('SENDING THE REPLY TO LATEST MAIL');
          const response_1 = await fetch(
            'https://zora-backend-5.onrender.com/reply',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                toEmail: data[0]['from'],
                originalSubject: data[0]['subject'],
                message: data_9['generated_text'],
                email: access['email'],
                password: access['accesspassword'],
              }),
            },
          );
          const result_1 = await response_1.json();
          console.log('Server Response:', result_1);
        };
        checkUserDetails();
      } else if (data[0] === 'Read the Mail with Given Subject') {
        const setvalue = async () => {
          await AsyncStorage.setItem('mail_subject_search', JSON.stringify(1));
        };
        setvalue();
        speakMessage('TELL THE EXTACT SUBJECT OF THE MAIL YOU WANT TO HEAR');
      } else {
        speakMessage('SORRY I DIDNT GET HOW TO HELP YOU OUT!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
