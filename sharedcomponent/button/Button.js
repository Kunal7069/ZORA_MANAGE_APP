import 'nativewind';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function Button({name, navigation, onclick, customclass}) {
  return (
    <TouchableOpacity
      className={` w-full bg-[#28BEBA] rounded-lg flex items-center justify-center py-[15px] ${customclass}`}
      onPress={onclick}>
      <Text className="text-black font-bold text-[20px]">{name}</Text>
    </TouchableOpacity>
  );
}
