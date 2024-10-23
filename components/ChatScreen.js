import 'nativewind';
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Image, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import {setUserInfo} from '../redux/userSlice';
import CheckBox from '@react-native-community/checkbox';
import main_icon from '../assets/main_icon.png';
import shield from '../assets/icon/shield.png';
import PermissionPopup from '../sharedcomponent/PermissionPopup';
import Modal from 'react-native-modal';
import HeaderLogo from '../sharedcomponent/header/HeaderLogo';
import Button from '../sharedcomponent/button/Button';

export default function User_information({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accesspassword, setAccessPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  

  const handleSubmit = () => {
    const userInfo = {
      name,
      email,
      accesspassword,
      phoneNumber,
      agreedToTerms: isSelected,
    };

    dispatch(setUserInfo(userInfo));
    console.log('User info saved to Redux store:', userInfo);
  
    setModalVisible(true);
    // navigation.navigate("dial_pad_screen");
  };
  
  return (
    <View className="flex-1 bg-black pb-10 px-6 justify-between">
      <Modal isVisible={isModalVisible}>
        <PermissionPopup navigation={navigation} />
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
          <View className="w-full">
            <Text className="text-white mb-2">ACCESS PASSWORD</Text>
            <TextInput
              className="border-gray-400 border-[1px] p-3 rounded-lg mb-4 text-white"
              onChangeText={setAccessPassword}
              value={accesspassword}
            />
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
