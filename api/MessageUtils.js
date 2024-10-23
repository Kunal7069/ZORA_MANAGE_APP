import SendSMS from 'react-native-sms';
import {Alert, PermissionsAndroid, Platform } from 'react-native';

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

export const sendSMS = async (phoneNumber) => {
    const smsPermissionGranted = await requestSmsPermission();
    if (smsPermissionGranted) {
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