import 'nativewind';
import React from 'react';
import {Text, View} from 'react-native';

export default function Chat ({ message, timestamp, customclass }){
  return (
    <View className={`relative w-[85%] py-2 rounded-lg bg-[#2E2C3D] flex px-3 ${customclass}`}>
      <Text className="text-white opacity-50 text-justify leading-[16px]">
        {message}
      </Text>
      {timestamp && (
        <Text className="absolute top-2 right-3 text-white opacity-30 text-justify leading-[14px]">
          {timestamp}
        </Text>
      )}
    </View>
  );
};
