import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Alert, PermissionsAndroid, Platform } from 'react-native';
import SendSMS from 'react-native-sms';

const SendSMSComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  // Function to request SMS permissions
  const requestSmsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'SMS Permission',
            message: 'This app needs permission to send SMS messages.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // No need to request for other platforms
  };

  // Use useEffect to request permissions on mount
  useEffect(() => {
    const requestPermissions = async () => {
      const smsPermissionGranted = await requestSmsPermission();
      if (!smsPermissionGranted) {
        Alert.alert('Permission Denied', 'SMS permission is required to send messages.');
      }
    };

    requestPermissions();
  }, []);

  const sendSMS = () => {
    if (phoneNumber) {
      SendSMS.send({
        body: '',
        recipients: [phoneNumber],
        successTypes: ['sent', 'queued'], // You can specify success types
        // Optionally handle success/error
        onSuccess: (e) => {
          Alert.alert('Success', 'SMS sent successfully!');
        },
        onError: (e) => {
          Alert.alert('Error', 'Failed to send SMS: ' + e);
        },
      });
    } else {
      Alert.alert('Error', 'Please enter both phone number and message.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10 }}
      />
    
      <Button title="Send SMS" onPress={sendSMS} />
    </View>
  );
};

export default SendSMSComponent;
