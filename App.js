import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from '@react-native-voice/voice';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Button, Alert, View, Image, StyleSheet} from 'react-native';
import icon from './assets/icon.png';
import { VoiceUtils } from './api/VoiceUtils';
import { fetchEmailBySubject } from './api/EmailUtils';
import Tts from 'react-native-tts';
// Import your components
import AvailableVoices from './components/AvailableVoices';
import GetStarted from './components/GetStarted';
import UserInformation from './components/UserInformation';
import PermissionPopup from './sharedcomponent/PermissionPopup';
import DetailedDashboard from './components/DetailedDashboard';
import Dashboard from './components/Dashboard';
import DialPad from './components/DialPad';
import ReceivedCall from './components/ReceivedCall';
import IncomingCall from './components/IncomingCall';
import Inbox from './components/Inbox';
import Message from './components/Message';
import OpenApps from './features/OpenApps';
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    const checkUserDetails = async () => {
      await AsyncStorage.setItem('collect_voice', JSON.stringify(0));
      const userDetails = await AsyncStorage.getItem('userDetails');
      setIsLoggedIn(!!userDetails);
    };
    checkUserDetails();
  }, []);

  if (isLoggedIn === null) {
    return null; // Optionally show a loading indicator
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Dashboard' : 'GetStarted'}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted" component={GetStarted } />
          <Stack.Screen name="UserInformation" component={UserInformation} />
          <Stack.Screen name="PermissionPopup" component={PermissionPopup} />
          <Stack.Screen name="DetailedDashboard" component={DetailedDashboard} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Inbox" component={Inbox} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="DialPad" component={DialPad} />
          <Stack.Screen name="IncomingCall" component={IncomingCall} />
          <Stack.Screen name="ReceivedCall" component={ReceivedCall} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

