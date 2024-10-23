import 'nativewind';
import { View, ScrollView, Text, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Voice , { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice'; // Make sure the import path is correct
import { useSelector } from 'react-redux';
import avatar from '../assets/user.png';
import { useRoute } from '@react-navigation/native'; 
import HeaderBackTitle from '../sharedcomponent/header/HeaderBackTitle';
import Chat from '../sharedcomponent/chat/Chat';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Message({ navigation }) {
  const [recognizedText, setRecognizedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ismessagesent,setIsmessagesent]= useState(false)
  const [message,setMessage]= useState('')
  // const currentUserState = useSelector(state => state.user);
  const route = useRoute();
  const { itemDetails,items,replies } = route.params; 
  
  const filterString = `Re: ${itemDetails.subject}`;
  const filteredItems = items.filter(item => item.subject.startsWith(filterString));
  const reversedFilteredItems = filteredItems.reverse();
  // console.log("filteredItems",itemDetails)
  
  const filterString_2 = `RE: ${itemDetails.subject}`;
  const filteredReplies = replies.filter(reply => reply.subject === filterString_2);
  // console.log("Filtered Replies:", filteredReplies);
  
  const combinedArray = [...reversedFilteredItems, ...filteredReplies];
 
  const parseDateTime = (dateStr, timeStr) => {
    const months = {
      January: 0, February: 1, March: 2, April: 3,
      May: 4, June: 5, July: 6, August: 7,
      September: 8, October: 9, November: 10, December: 11,
    };

    // Split and parse the formattedDate (e.g., "September 16, 2024")
    const [monthName, day, year] = dateStr.replace(',', '').split(' ');
    const month = months[monthName];
    const dayNumber = parseInt(day, 10);
    const yearNumber = parseInt(year, 10);

    // Split the formattedTime (e.g., "19:01:10") into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);

    // Create and return a Date object
    return new Date(yearNumber, month, dayNumber, hours, minutes, seconds);
  };

  // Sort combined array by both formattedDate and formattedTime
  const sortedArray = combinedArray.sort((a, b) => {
    const dateA = parseDateTime(a.formattedDate, a.formattedTime);
    const dateB = parseDateTime(b.formattedDate, b.formattedTime);
    return dateA - dateB; // Sort in ascending order (earliest to latest)
  });

  console.log("Sorted Combined Array:", sortedArray); 




  const getName = from => {
    const match = from.match(/^[^<]+/);
    if (match) {
      let name = match[0].trim();
      if (name.startsWith('"') && name.endsWith('"')) {
        name = name.slice(1, -1);
      }
      return name.trim();
    }
    return from; 
  };
  
  const extractEmail = (from) => {
    const emailMatch = from.match(/<([^>]+)>/);
    return emailMatch ? emailMatch[1] : null;
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Initialize TTS
    Tts.setDefaultLanguage('en-US');

    return () => {
      // Clean up Voice listeners
      Voice.destroy().then(Voice.removeAllListeners);
      
      // Stop any ongoing TTS
      Tts.stop();
    };
  }, []);

  const onSpeechStart = () => {
    setIsRecording(true);
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
  };

  const onSpeechResults =async (e) => {
    setRecognizedText(e.value[0]);
    const currentUserState = await AsyncStorage.getItem('userDetails');
    const access = JSON.parse(currentUserState);
    console.log('DASHBOARD EMAIL:',access['email']);
    console.log('DASHBOARD APP PASSWORD:',access['accesspassword']);
    console.log("Sorted Combined Array:", sortedArray); 
    console.log('Recognized Text:', e.value[0]);
    console.log("EMAILID",itemDetails.from);
    console.log("originalSubject",itemDetails.subject)
    
    try {
      const response = await fetch('https://zora-backend-6.onrender.com/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({toEmail: itemDetails.from, originalSubject:itemDetails.subject, message: e.value[0], email:access['email'], password:access['accesspassword'] }),
      });
      const result = await response.json();
      console.log('Server Response:', result);
      setIsmessagesent(true)
    } catch (error) {
      console.error('Error sending text to server:', error);
    }
  };
  

  const onSpeechError = (e) => {
    console.error('Speech Error:', e);
    Alert.alert('Speech Recognition Error', e.error.message);
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-US'); // Set the language code as needed
    } catch (e) {
      console.error(e);
    }
  };
  
  const removeLastLine = text => {
    const lines = text.split('\n');
    lines.pop(); // Remove the last line
    return lines.join('\n');
  };

  // Remove the last line from itemDetails.plainText
  const updatedPlainText = removeLastLine(itemDetails.plainText);
  const createRegexForLine = from => new RegExp(`^On.*wrote:`, 'i');

  // Function to remove text after the specific line
  const extractTextBeforeLine = (text) => {
    const regex = createRegexForLine();
    const lines = text.split('\n');
    const index = lines.findIndex(line => regex.test(line));
    return index !== -1 ? lines.slice(0, index).join('\n').trim() : text;
  };

  const speakMessage = (message) => {
    if (isSpeaking) {
      Tts.stop();
    } else {
      Tts.speak(message);
    }
  };
  return (
    <View className="flex-1 bg-black">
    <HeaderBackTitle
      screen={getName(itemDetails.from)}
      onClick={() => navigation.navigate('Inbox')}
      navigation={navigation}
    />
    <ScrollView className="flex px-6 pt-10">
    <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
          {itemDetails.formattedDate}
        </Text>
      <View style={{ margin: 1, marginVertical: 5 }}>
        <Chat message={updatedPlainText} navigation={navigation} />
        <TouchableOpacity 
          onPress={() => speakMessage(updatedPlainText)}
          style={{ marginTop: 5, padding: 5, backgroundColor: '#4a90e2', borderRadius: 5,alignSelf:  'flex-start'  }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Hear</Text>
        </TouchableOpacity>
      </View>

      {sortedArray.map((message, index) => {
  const isReply = message.subject.startsWith('Re:') || message.subject.startsWith('re:');
  const messageText = extractTextBeforeLine(message.plainText);
  // const messageText = message.plainText;
  
  // Check if it's the first message or if the date has changed
  const isNewDate = index === 0 || message.formattedDate !== sortedArray[index - 1].formattedDate;

  return (
    <View key={index}>
       {isNewDate && (
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
          {message.formattedDate}
        </Text>
      )}
      <View
        style={{
          margin: 1,
          marginVertical: 5,
          alignItems: isReply ? 'flex-start' : 'flex-end',
        }}
      >
        <Chat
          message={messageText}
          navigation={navigation}
          style={{ backgroundColor: isReply ? 'lightgray' : 'white' }}
        />
        <TouchableOpacity 
          onPress={() => speakMessage(messageText)}
          style={{ 
            marginTop: 5, 
            padding: 5, 
            backgroundColor: '#4a90e2', 
            borderRadius: 5,
            alignSelf: isReply ? 'flex-start' : 'flex-end'
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Hear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
})}

{ismessagesent && (
          <View style={{ margin: 1, marginVertical: 5, alignItems: 'flex-end' }}>
            <Chat
              message={recognizedText}
              navigation={navigation}
              style={{ backgroundColor: 'white' }}
            />
            <TouchableOpacity 
              onPress={() => speakMessage(recognizedText)}
              style={{ 
                marginTop: 5, 
                padding: 5, 
                backgroundColor: '#4a90e2', 
                borderRadius: 5,
                alignSelf: 'flex-end'
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Hear</Text>
            </TouchableOpacity>
          </View>
        )}
    </ScrollView>
    
    <View className="flex px-6 pb-4">
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? Voice.stop : startRecording }
        
      />
    </View>
  </View>
  );
}
