import 'nativewind';
import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

export default function Card({
  navigation,
  stats,
  icon,
  title,
  onclick,
  customclass,
}) {
  return (
    <TouchableOpacity
      className={`w-[49%] py-4 rounded-lg bg-[#5d5885] flex items-center justify-center px-3 ${customclass}`}
      onPress={onclick}>
      <View className="flex flex-row gap-5 items-start w-full ">
        <View className="bg-[#f1f1f140] p-2 rounded-full">
          <Image source={icon} alt="" className="w-[20px] h-[18.5px]" />
        </View>
        <Text className="text-[#28BEBA] text-5xl font-bold">{stats}</Text>
      </View>
      <Text className="text-white opacity-80 text-center">{title}</Text>
    </TouchableOpacity>
  );
}
