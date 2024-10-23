import 'nativewind';
import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

export default function MessageCard({
  navigation,
  icon,
  lines,
  username,
  message,
  userline,
  onclick,
  customclass,
  timestamp,
}) {
  return (
    <TouchableOpacity
      className={`flex flex-row ${customclass} mt-10 justify-between`}
      onPress={onclick}>
      <View className="flex flex-row w-[70%]">
        <Image
          source={icon}
          alt=""
          className="w-[60px] h-[60px] rounded-full"
        />
        <View className="pl-3 flex items-start justify-start gap-x-4">
          <Text
            className="text-white text-center capitalize"
            numberOfLines={userline}>
            {username}
          </Text>
          <Text
            className="text-white opacity-80 text-wrap"
            numberOfLines={lines}
            ellipsizeMode="tail">
            {message}
          </Text>
        </View>
      </View>
      <Text className="text-white opacity-50">{timestamp}</Text>
    </TouchableOpacity>
  );
}
