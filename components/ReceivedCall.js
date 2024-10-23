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
import effect from "../assets/icon/effect.png";
import mic from "../assets/icon/mic.png";
import camera from "../assets/icon/camera.png";
import bar from "../assets/icon/bar.png";
import cross from "../assets/icon/cross.png";
import video from "../assets/icon/video.png";
import speaker from "../assets/icon/speaker.png";
import user from "../assets/user.png";

export default function Received_call() {
  return (
    <View className="flex-1 bg-black justify-between mt-12 pt-10">
      <View className="flex flex-row items-center gap-6 px-10">
        <Image source={user} alt="" className="w-[80px] h-[80px]" />
        <View className="flex">
          <Text className="text-white capitalize text-2xl font-semibold">
            sher modh
          </Text>
          <Text className="text-white capitalize opacity-70 text-lg">
            connecting...
          </Text>
        </View>
      </View>
      <View className="flex bg-[#f1f1f150] px-6">
        <TouchableOpacity className="flex items-center pt-2">
          <Image source={bar} alt="" className="w-[50px] h-[4px]" />
        </TouchableOpacity>
        <View className="flex flex-row justify-between px-8 pt-10">
          <View className="flex gap-1 items-center">
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-[#f1f1f170] items-center justify-center">
              <Image source={effect} alt="" className="w-5 h-5" />
            </TouchableOpacity>
            <Text className="text-white">effects</Text>
          </View>
          <View className="flex gap-1 items-center">
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-[#f1f1f170] items-center justify-center">
              <Image source={mic} alt="" className="w-5 h-5" />
            </TouchableOpacity>
            <Text className="text-white">mute</Text>
          </View>
          <View className="flex gap-1 items-center">
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-[#f1f1f170] items-center justify-center">
              <Image source={camera} alt="" className="w-5 h-5" />
            </TouchableOpacity>
            <Text className="text-white">flip</Text>
          </View>
          <View className="flex gap-1 items-center">
            <TouchableOpacity className="w-[50px] h-[50px] rounded-full bg-[#F95721] items-center justify-center">
              <Image source={cross} alt="" className="w-5 h-5" />
            </TouchableOpacity>
            <Text className="text-white">end</Text>
          </View>
        </View>
        <View className="flex flex-row justify-between px-8 py-10">
          <TouchableOpacity className="w-[150px] py-4 rounded-full bg-[#f1f1f170] items-center justify-center flex-row">
            <Image source={video} alt="" className="w-5 h-5" />
            <Text className="text-white pl-2 text-[16px]">Camera Off</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[150px] py-4 rounded-full bg-[#f1f1f170] flex-row items-center justify-center">
            <Image source={speaker} alt="" className="w-5 h-5" />
            <Text className="text-white pl-2 text-[16px]">Speaker</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
