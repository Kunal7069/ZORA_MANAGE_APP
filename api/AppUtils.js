import React from 'react';
import IntentLauncher from 'react-native-intent-launcher';

export const openCalendar = () => {
    if (Platform.OS === 'android') {
      try {
        IntentLauncher.startActivity({
          action: 'android.intent.action.VIEW',
          data: 'content://com.android.calendar/time',
        });
      } catch (error) {
        Alert.alert('Error', 'Calendar app not found.');
      }
    } else if (Platform.OS === 'ios') {
      Linking.openURL('calshow://').catch(() => {
        Alert.alert('Error', 'Unable to open Calendar on iOS.');
      });
    }
  };

export const openMessaging = () => {
    if (Platform.OS === 'android') {
      try {
        IntentLauncher.startActivity({
          action: 'android.intent.action.MAIN',
          category: 'android.intent.category.APP_MESSAGING',
        });
      } catch (error) {
        Alert.alert('Error', 'Messaging app not found.');
      }
    } else if (Platform.OS === 'ios') {
      Linking.openURL('sms:').catch(() => {
        Alert.alert('Error', 'Unable to open Messaging on iOS.');
      });
    }
  };

export const openContacts = () => {
    if (Platform.OS === 'android') {
      try {
        IntentLauncher.startActivity({
          action: 'android.intent.action.VIEW',
          data: 'content://com.android.contacts/contacts',
        });
      } catch (error) {
        Alert.alert('Error', 'Contacts app not found.');
      }
    } else if (Platform.OS === 'ios') {
      Linking.openURL('contacts://').catch(() => {
        Alert.alert('Error', 'Unable to open Contacts on iOS.');
      });
    }
  };

export const openSettings = () => {
    if (Platform.OS === 'android') {
      try {
        IntentLauncher.startActivity({
          action: 'android.settings.SETTINGS',
        });
      } catch (error) {
        Alert.alert('Error', 'Settings app not found.');
      }
    } else if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:').catch(() => {
        Alert.alert('Error', 'Unable to open Settings on iOS.');
      });
    }
  };

export const openYouTube = () => {
    if (Platform.OS === 'android') {
      try {
        IntentLauncher.startActivity({
          action: 'android.intent.action.VIEW',
          data: 'https://www.youtube.com',
          package: 'com.google.android.youtube',
        });
      } catch (error) {
        Linking.openURL('https://www.youtube.com').catch(() => {
          Alert.alert('Error', 'Unable to open YouTube.');
        });
      }
    } else if (Platform.OS === 'ios') {
      Linking.openURL('youtube://').catch(() => {
        Linking.openURL('https://www.youtube.com').catch(() => {
          Alert.alert('Error', 'Unable to open YouTube on iOS.');
        });
      });
    }
  };

export  const openAppStore = () => {
    if (Platform.OS === 'android') {
      try {
        IntentLauncher.startActivity({
          action: 'android.intent.action.VIEW',
          data: 'market://search?q=zora',
          package: 'com.android.vending'
        });
      } catch (error) {
        // If Play Store app is not available, open it in the browser
        Linking.openURL('https://play.google.com/').catch(() => {
          Alert.alert('Error', 'Unable to open Play Store.');
        });
      }
    } else if (Platform.OS === 'ios') {
      Linking.openURL('itms-apps://').catch(() => {
        Linking.openURL('https://apps.apple.com/').catch(() => {
          Alert.alert('Error', 'Unable to open App Store on iOS.');
        });
      });
    }
  };
  
