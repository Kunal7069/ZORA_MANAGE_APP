import 'nativewind';
import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';

export default function RoundButton({navigation, onclick, icon, customclass}) {
  return (
    <TouchableOpacity
      className={`rounded-full flex bg-[#5d5885] items-center justify-center ${customclass}`}
      onPress={onclick}>
      <Image source="C:/Users/jaink/Desktop/ZORA_APP/zora-app/assets/icon.png" alt="" className="h-[35px] w-[35px]" />
    </TouchableOpacity>
  );
}
