import 'nativewind';
import React, { useState } from 'react';
import { Text, View, Image, TextInput,Alert, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/userSlice';
import CheckBox from '@react-native-community/checkbox';
import shield from '../assets/icon/shield.png';
import PermissionPopup from '../sharedcomponent/PermissionPopup';
import Modal from 'react-native-modal';
import HeaderLogo from '../sharedcomponent/header/HeaderLogo';
import Button from '../sharedcomponent/button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function User_information({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [accesspassword, setAccessPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPermissionModalVisible, setPermissionModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const dispatch = useDispatch();
  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const handleSubmit = () => {
    // Show permission popup first
    setPermissionModalVisible(true);
  };

  const handlePermissionContinue = () => {
    // After permissions are granted, show the password modal
    setPermissionModalVisible(false);
    setPasswordModalVisible(true);
  };

  const handleAppPasswordSubmit = async () => {
    // After submitting the app password, save user info and navigate to Dashboard
    if (!accesspassword) {
      Alert.alert(
        'Password is required'
      );
    
    } else {
      const userInfo = {
        name,
        email,
        gender,
        accesspassword,
        phoneNumber,
        agreedToTerms: isSelected,
      };
  
      dispatch(setUserInfo(userInfo));
      await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));
      await AsyncStorage.setItem('mail_subject_search', JSON.stringify(0));
      const currentUserState = await AsyncStorage.getItem('userInfo');
      console.log("currentUserState",currentUserState)
      
      
      setPasswordModalVisible(false);
      navigation.navigate('Dashboard');
    }
    
  };
  
  return (
    <View className="flex-1 bg-black pb-10 px-6 justify-between">
      
      {/* Permission Modal */}
      <Modal isVisible={isPermissionModalVisible}>
        <PermissionPopup onContinue={handlePermissionContinue} />
      </Modal>

      {/* App Password Modal */}
      <Modal isVisible={isPasswordModalVisible}>
        <View className="bg-white p-6 rounded-lg">
          <Text className="text-black text-lg mb-4">Enter App Password</Text>
          <TextInput
            className="border-gray-400 border-[1px] p-3 rounded-lg mb-4 text-black"
            placeholder="App Password"
            secureTextEntry
            onChangeText={setAccessPassword}
            value={accesspassword}
          />
          <Button name="Continue" onclick={handleAppPasswordSubmit} />
        </View>
      </Modal>

      <View className="flex items-center gap-2 pt-10">
        <HeaderLogo />
        <View className="w-full">
          <View className="w-full pt-6">
            <Text className="text-white mb-2">Name</Text>
            <TextInput
              className="border-gray-400 border-[1px] p-3 rounded-lg mb-4 text-white"
              onChangeText={setName}
              value={name}
            />
          </View>
          <View className="w-full">
            <Text className="text-white mb-2">Email Address</Text>
            <TextInput
              className="border-gray-400 border-[1px] p-3 rounded-lg mb-4 text-white"
              onChangeText={setEmail}
              value={email}
            />
          </View>
        

         {/* <View className="w-full">
      <Text className="text-white mb-2">Gender</Text>
      <Text>
      <View className="border-gray-400 border-[1px] p-3 rounded-lg mb-4">
      
        {genders.map((item) => (
        
          <TouchableOpacity
            key={item.value}
            onPress={() => setGender(item.value)}
            className={`p-2 rounded-lg mb-2 ${
              gender === item.value ? 'bg-gray-300' : 'bg-transparent'
            }`} 
          >
            <Text className={`text-center ${gender === item.value ? 'font-bold' : 'text-white'}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
         
        ))}
        
      </View>
       </Text>
    </View> */}
   <View className="w-full">
      <Text className="text-white mb-2">Gender</Text>
      <View className="flex-row justify-between mb-4">
        {genders.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => setGender(item.value)}
            className={`flex-1 p-3 rounded-lg mx-1 border-2 ${
              gender === item.value ? 'bg-gray-300 border-gray-400' : 'bg-transparent border-gray-600'
            }`} 
          >
            <Text className={`text-center ${gender === item.value ? 'font-bold' : 'text-white'}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

          

          <View className="w-full">
            <Text className="text-white mb-2">Phone numbers</Text>
            <TextInput
              className="border-gray-400 border-[1px] p-3 rounded-lg mb-4 text-white"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
          </View>
          <View className="flex-row items-center justify-start mb-4 gap-1 pt-4">
            <CheckBox
              value={isSelected}
              onValueChange={() => setSelection(!isSelected)}
              tintColors={{
                true: '#29BDBA',
                false: '#FFFFFF',
              }}
            />
            <Text className="text-white">
              I agree to the terms and conditions
            </Text>
          </View>
          <View className="bg-transparent border-[1px] rounded-lg border-gray-700 flex flex-row py-4 px-4 w-full">
            <Image source={shield} alt="" className="w-10 h-10" />
            <Text className="text-white text-md px-4 w-[90%]">
              Anonymous call data will be collected for analysis and training
              purposes.
            </Text>
          </View>
        </View>
      </View>

      <View className="flex gap-y-6">
        <Button name="Submit" navigation={navigation} onclick={handleSubmit} />
        <Text className="text-white opacity-40 text-center">
          Note: Permissions are typically handled by the platform, but the app
          should guide users to grant these permissions
        </Text>
      </View>
    </View>
  );
}