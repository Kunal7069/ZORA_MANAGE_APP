import React from 'react';
import { View, Button, Alert, Platform, Linking } from 'react-native';
import IntentLauncher from 'react-native-intent-launcher';

const OpenApps = () => {
  // Function to open calendar (Android/iOS)
  const openCalendar = () => {
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

  // Function to open messaging app (Android/iOS)
  const openMessaging = () => {
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

  // Function to open contacts app (Android/iOS)
  const openContacts = () => {
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

  // Function to open settings app (Android/iOS)
  const openSettings = () => {
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



  // Function to open YouTube (Android/iOS)
  const openYouTube = () => {
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

  // Improved function to open Play Store / App Store (Android/iOS)
  const openAppStore = () => {
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
  
  const openCalculator = () => {
    const calculatorURL = 'https://www.google.com/search?q=online+calculator';

    Linking.openURL(calculatorURL).catch(() => {
      Alert.alert('Error', 'Unable to open online calculator.');
    });
  };
  

  return (
    <View style={{ padding: 20 }}>
      <Button title="Open Calendar" onPress={openCalendar} />
      <Button title="Open Messaging" onPress={openMessaging} />
      <Button title="Open Contacts" onPress={openContacts} />
      <Button title="Open Settings" onPress={openSettings} />
      <Button title="Open YouTube" onPress={openYouTube} />
      <Button title="Open App Store" onPress={openAppStore} />
      <Button title="Open Calculator" onPress={openCalculator} />
    </View>
  );
};

export default OpenApps;