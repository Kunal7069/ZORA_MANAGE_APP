import 'nativewind';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function RoundButton({navigation, onclick, name, customclass}) {
  return (
    <TouchableOpacity
      className={`rounded-full flex bg-[#5d5885] items-center justify-center ${customclass}`}
      onPress={onclick}>
      <Text className="text-black font-bold text-[20px]">{name}</Text>
    </TouchableOpacity>
  );
}
