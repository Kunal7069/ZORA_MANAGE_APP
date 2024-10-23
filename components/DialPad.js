import "nativewind";
import React, { useState, useRef, useEffect  } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { useSelector } from 'react-redux';
import main_icon from "../assets/main_icon.png";
import call from "../assets/icon/call.png";

export default function Dial_pad_screen() {
  const [inputValue, setInputValue] = useState("+91");
  const textInputRef = useRef(null);
  const userInfo_2 = useSelector(state => state.user.userInfo);
  const handleFocus = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  const handleKeyPress = (key) => {
    if (inputValue.length < 13) {
      setInputValue((prevValue) => prevValue + key);
    }
  };
  useEffect(() => {
    console.log("Current user info in Redux:", userInfo_2);
  }, [userInfo_2]);
  return (
    <View className="flex-1 bg-black pb-10 gap-8 justify-end px-10">
      <View className="w-full flex px-10">
        <TextInput
          ref={textInputRef}
          className="border-none mb-4 text-white text-4xl font-bold"
          value={inputValue}
          onFocus={handleFocus}
          editable={true}
          placeholderTextColor="white"
        />
      </View>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("1")}
        >
          <Text className="text-white text-4xl font-extrabold">1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("2")}
        >
          <Text className="text-white text-4xl font-extrabold">2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("3")}
        >
          <Text className="text-white text-4xl font-extrabold">3</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("4")}
        >
          <Text className="text-white text-4xl font-extrabold">4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("5")}
        >
          <Text className="text-white text-4xl font-extrabold">5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("6")}
        >
          <Text className="text-white text-4xl font-extrabold">6</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("7")}
        >
          <Text className="text-white text-4xl font-extrabold">7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("8")}
        >
          <Text className="text-white text-4xl font-extrabold">8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("9")}
        >
          <Text className="text-white text-4xl font-extrabold">9</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("*")}
        >
          <Text className="text-white text-4xl font-extrabold">*</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("0")}
        >
          <Text className="text-white text-4xl font-extrabold">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[90px] h-[90px] rounded-full bg-[#7958fc] items-center justify-center"
          onPress={() => handleKeyPress("#")}
        >
          <Text className="text-white text-4xl font-extrabold">#</Text>
        </TouchableOpacity>
      </View>
      <View className="flex items-center">
        <TouchableOpacity className="w-[90px] h-[90px] rounded-full bg-[#28BEBA] items-center justify-center">
          <Image source={call} alt="" className="w-10 h-10" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
