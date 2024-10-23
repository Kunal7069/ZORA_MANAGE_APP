import 'nativewind';
import React, { useState, useEffect } from 'react';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native'; // Import ActivityIndicator for the loading spinner
import mail from '../assets/icon/mail.png';
import compose from '../assets/icon/compose.png';
import message from '../assets/icon/message.png';
import call_pick from '../assets/icon/call_pick.png';
import Header from '../sharedcomponent/header/Header';
import Card from '../sharedcomponent/Card';
import RoundButton from '../sharedcomponent/button/RoundButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VoiceUtils } from '../api/VoiceUtils';
import { fetchEmailBySubject } from '../api/EmailUtils';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
export default function Dashboard({ navigation }) {
  const [emailData, setEmailData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState({}); 
  const [recognizedText, setRecognizedText] = useState('');
  const [partialResults, setPartialResults] = useState([]);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    
    const initVoiceRecognition = async () => {
      const permissionStatus = await requestMicrophonePermission();
      if (permissionStatus) {
        await setupVoiceRecognition();
      }
    };

    initVoiceRecognition();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  
  const requestMicrophonePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      handlePermissionResult(result, 'Microphone');
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
      return false;
    }
  };

  const handlePermissionResult = (result, permissionName) => {
    switch (result) {
      case RESULTS.GRANTED:
        console.log(`${permissionName} permission granted`);
        break;
      case RESULTS.DENIED:
        Alert.alert(
          'Permission denied',
          `You need to grant ${permissionName} permission to use this feature.`
        );
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission blocked',
          `${permissionName} permission is blocked and cannot be requested.`
        );
        break;
      case RESULTS.UNAVAILABLE:
        Alert.alert('This feature is not available on this device.');
        break;
    }
  };

  const setupVoiceRecognition = async () => {
    try {
      await Voice.destroy();
      
      Voice.onSpeechStart = () => console.log('Speech started');
      Voice.onSpeechEnd = () => console.log('Speech ended');
      Voice.onSpeechResults = onSpeechResults;
      // Voice.onSpeechPartialResults = onSpeechPartialResults;
      Voice.onSpeechError = onSpeechError;

      await startListening();
    } catch (error) {
      console.error('Error setting up voice recognition:', error);
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  // const onSpeechPartialResults = async (event) => {
  //   const partialText = event.value[0];
  //   const words = partialText.split(' ');
  //   console.log(words)
  //   const lowerCaseWords = words.map(word => word.toLowerCase());
  //   if (lowerCaseWords.includes("zora".toLowerCase()) || lowerCaseWords.includes("jora".toLowerCase())) {
  //     setShowButton(true);
  //     await AsyncStorage.setItem('collect_voice', JSON.stringify(1));
  //   } 
  // };

  const onSpeechResults = async (event) => {
    const mail_subject_search = await AsyncStorage.getItem('mail_subject_search');
    console.log("mail_subject_search",mail_subject_search)
    const collect_voice = await AsyncStorage.getItem('collect_voice');
    console.log("collect_voice",collect_voice)
    if(mail_subject_search==1){
      const text = event.value[0];
      fetchEmailBySubject(text);
      await AsyncStorage.setItem('mail_subject_search', JSON.stringify(0));
    }
    else if (collect_voice==0){
      const text = event.value[0];
      console.log("text",text)
      
      if (text.toLowerCase().includes('zora') || text.toLowerCase().includes('jora')){
        setShowButton(true);
        const regex = /zora|jora/i;
      const match = text.match(regex);
      const modified_text =  text.substring(match.index).trim();
      const words = modified_text.split(' ');
      console.log('Words:',words);
      if(words.length==1){
        if(words[0].toLowerCase() === "zora".toLowerCase() || words[0].toLowerCase() === "jora".toLowerCase()){
          // setShowButton(true);
          await AsyncStorage.setItem('collect_voice', JSON.stringify(1));
        }
      }
      else{
        const lowerCaseWords = words.map(word => word.toLowerCase());
        if (lowerCaseWords.includes("zora".toLowerCase()) || lowerCaseWords.includes("jora".toLowerCase())) {
              // setShowButton(true);
              const regex = /zora|jora/i;
              const match = text.match(regex);
              if (match) {
                const result = text.substring(match.index + match[0].length).trim();
                console.log("Command", result);
                setShowButton(false)
                VoiceUtils(result); 
                await AsyncStorage.setItem('collect_voice', JSON.stringify(0))
              }
            
         } 
      }
      }
   }
    else if (collect_voice==1){
      const text = event.value[0];
      console.log('Final recognized text:',text);
      let cleanedText = text.replace(/zora|jora/gi, '').trim();
      if (cleanedText && !cleanedText.endsWith('.')) {
        cleanedText += '.';
      }
      setRecognizedText(cleanedText);
      console.log('Final recognized text:', cleanedText);
      setShowButton(false)
      VoiceUtils(cleanedText); 
      await AsyncStorage.setItem('collect_voice', JSON.stringify(0));
    }

   
    startListening(); 
  };

  const onSpeechError = (event) => {
  
    startListening(); 
  };


  const cardData = [
    {
      id: 1,
      stats: '10',
      icon: mail,
      title: 'Emails Read',
      customclass: 'custom-class-1',
      onclick: () => navigation.navigate('DetailedDashboard'),
    },
    {
      id: 2,
      stats: '20',
      icon: compose,
      title: 'Email Summarized',
      customclass: 'custom-class-2',
      onclick: () => navigation.navigate('DetailedDashboard'),
    },
    {
      id: 3,
      stats: '20',
      icon: compose,
      title: 'Email Summarized',
      customclass: 'custom-class-2',
      onclick: () => navigation.navigate('DetailedDashboard'),
    },
    {
      id: 4,
      stats: '20',
      icon: compose,
      title: 'Email Summarized',
      customclass: 'custom-class-2',
      onclick: () => navigation.navigate('DetailedDashboard'),
    },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
    
        const currentUserState = await AsyncStorage.getItem('userDetails');
        
        if (currentUserState) {
          const access = JSON.parse(currentUserState);
          setUser(access)
          console.log(access)
          console.log('DASHBOARD EMAIL:',access['email']);
          console.log('DASHBOARD APP PASSWORD:',access['accesspassword']);
          const response = await fetch('https://zora-backend-5.onrender.com/fetch-emails',{
            method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email:access['email'], password:access['accesspassword'] }),
          });
          const apiData = await response.json();
          setEmailData(apiData);
          console.log("EMAILS", apiData.length);
          console.log("USER",user)
          
      }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or an error occurs
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-black pt-10 px-3">
    {loading ? ( // Conditionally render the loading indicator
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    ) : (
      <>
        <Header username={user['name']} guesture="good morning" />
        <View className="flex flex-row pt-6 justify-between flex-wrap">
          {cardData.map(card => (
            <Card
              key={card.id}
              navigation={navigation}
              stats={card.stats}
              icon={card.icon}
              title={card.title}
              customclass="flex mt-2"     
            />
          ))}
        </View>
      </>
    )}
    {showButton && (
      <View className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-6 pb-4">
        <FastImage
          className="w-[150px] h-[150px]" 
          source={require('../assets/gif/Listening.gif')}
          resizeMode={FastImage.resizeMode.cover} // Changed to cover to fill the circular area
        />
      </View>
    )}
  </View>
  );
}
