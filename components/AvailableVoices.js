import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import Tts from 'react-native-tts';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';

const AvailableVoices = () => {
  const [voices, setVoices] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Check and request permissions when the component mounts
    checkAndRequestPermissions();
  }, []);

  const checkAndRequestPermissions = async () => {
    try {
      let result;
      if (Platform.OS === 'android') {
        result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
        if (result !== RESULTS.GRANTED) {
          result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        }
      }
      if (result === RESULTS.GRANTED) {
        setPermissionGranted(true);
        fetchVoices(); // Fetch voices after permission is granted
      } else {
        Alert.alert('Permission required', 'Please grant audio permission to use TTS');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const fetchVoices = () => {
    // Fetch available voices and store them in the state
    Tts.voices()
      .then(availableVoices => {
        setVoices(availableVoices);
      })
      .catch(error => {
        console.error('Error fetching voices:', error);
      });
  };

  const playVoiceSample = (voiceId, message = 'Opening the Camera') => {
    // Stop any ongoing TTS
    Tts.stop();

    // Set the selected voice
    Tts.setDefaultVoice(voiceId);

    // Speak the sample message with the selected voice
    Tts.speak(message);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Available Voices:</Text>
      {permissionGranted ? (
        voices.map(voice => (
          <TouchableOpacity
            key={voice.id}
            onPress={() => {
              playVoiceSample(voice.id);
              Alert.alert(`Playing voice: ${voice.name}`);
            }}
            style={{
              padding: 10,
              backgroundColor: '#000',
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <Text>Voice ID: {voice.id}</Text>
            <Text>Name: {voice.name}</Text>
            <Text>Language: {voice.language}</Text>
            <Text>Quality: {voice.quality}</Text>
            <Text>Gender: {voice.gender}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Audio permission is required to use TTS features.</Text>
      )}
    </ScrollView>
  );
};

export default AvailableVoices;
