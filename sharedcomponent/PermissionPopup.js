import 'nativewind';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function PermissionPopup({ onContinue }) {
  const [isCallAppSelected, setCallAppSelection] = useState(false);
  const [isLocationSelected, setLocationSelection] = useState(false);
  const [isCameraSelected, setCameraSelection] = useState(false);
  const [isMicrophoneSelected, setMicrophoneSelection] = useState(false);

  const requestCallPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CALL_PHONE);
      handlePermissionResult(result, 'Call App');
    } catch (error) {
      console.error(error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      handlePermissionResult(result, 'Location');
    } catch (error) {
      console.error(error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      handlePermissionResult(result, 'Camera');
    } catch (error) {
      console.error(error);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      handlePermissionResult(result, 'Microphone');
    } catch (error) {
      console.error(error);
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

  const handleContinue = () => {
    // You might want to add some validation here to ensure all permissions are granted
    if (isCallAppSelected && isLocationSelected && isCameraSelected && isMicrophoneSelected) {
      onContinue();
    } else {
      Alert.alert(
        'Permissions Required',
        'Please grant all permissions to continue.'
      );
    }
  };

  return (
    <View className="flex-1 bg-black pb-10 px-4 justify-end">
      <Text className="text-white text-lg uppercase text-center mb-6">
        To get started, we need your permission:
      </Text>
      <View className="w-full mb-6">
        <PermissionItem
          title="Call App"
          description="'Zora' is all about the visuals and sharing moments with your friends."
          isSelected={isCallAppSelected}
          onValueChange={(newValue) => {
            setCallAppSelection(newValue);
            if (newValue) requestCallPermission();
          }}
        />
        <PermissionItem
          title="Location"
          description="Allow access to your location for better suggestions and experiences."
          isSelected={isLocationSelected}
          onValueChange={(newValue) => {
            setLocationSelection(newValue);
            if (newValue) requestLocationPermission();
          }}
        />
        <PermissionItem
          title="Camera"
          description="Allow access to your camera to capture and share moments."
          isSelected={isCameraSelected}
          onValueChange={(newValue) => {
            setCameraSelection(newValue);
            if (newValue) requestCameraPermission();
          }}
        />
        <PermissionItem
          title="Microphone"
          description="Allow access to your microphone for voice interactions."
          isSelected={isMicrophoneSelected}
          onValueChange={(newValue) => {
            setMicrophoneSelection(newValue);
            if (newValue) requestMicrophonePermission();
          }}
        />
      </View>
      <TouchableOpacity
        className="bg-[#29BDBA] p-3 rounded-lg"
        onPress={handleContinue}>
        <Text className="text-black text-2xl font-semibold text-center">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const PermissionItem = ({ title, description, isSelected, onValueChange }) => (
  <View className="flex flex-row gap-4 mb-4">
    <CheckBox
      value={isSelected}
      onValueChange={onValueChange}
      tintColors={{
        true: '#29BDBA',
        false: '#FFFFFF',
      }}
    />
    <View className="w-[80%]">
      <Text className="text-white text-xl uppercase">{title}</Text>
      <Text className="text-gray-400 text-md">{description}</Text>
    </View>
  </View>
);