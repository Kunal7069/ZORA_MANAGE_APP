import "nativewind";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import icon from "../assets/icon.png";
import call_pick from "../assets/icon/call_pick.png";
import cross from "../assets/icon/cross.png";
import caller from "../assets/caller.png";

export default function Incoming_calls() {
  return (
    <View className="flex-1 bg-black pb-10 justify-between px-10 mt-12 pt-10">
      <View className="flex items-center h-[200px]">
        <Image source={caller} alt="" className="w-[300px] h-[300px]" />
      </View>
      <View className="flex items-center gap-2">
        <Text className="text-white uppercase text-3xl font-semibold">
          sher modh
        </Text>
        <Text className="text-white capitalize opacity-70 text-lg">
          colleague
        </Text>
      </View>
      <TouchableOpacity className="flex items-center">
        <Image
          source={icon}
          alt=""
          className="w-[150px] h-[150px] rounded-full"
        />
        <Text className="text-white">Let ZORA answer</Text>
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity className="w-[90px] h-[90px] rounded-full bg-[#F95721] items-center justify-center">
          <Image source={cross} alt="" className="w-10 h-10" />
        </TouchableOpacity>
        <TouchableOpacity className="w-[90px] h-[90px] rounded-full bg-[#28BEBA] items-center justify-center">
          <Image source={call_pick} alt="" className="w-10 h-10" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
