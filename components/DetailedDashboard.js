import 'nativewind';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import HeaderBack from '../sharedcomponent/header/HeaderBack';

const ProgressBar = ({progress}) => {
  return (
    <View className="w-full bg-[#2E2E3A] rounded-full h-2">
      <View
        className="bg-[#28BEBA] h-2 rounded-full"
        style={{width: `${progress}%`}}></View>
    </View>
  );
};

export default function Detailed_dashboard({navigation}) {
  const [readProgress, setReadProgress] = useState(35);
  const [composedProgress, setComposedProgress] = useState(65);
  const [summarisedProgress, setSummarisedProgress] = useState(25);

  return (
    <View className="flex-1 bg-black px-3">
      <HeaderBack
        username="Sher Mohd"
        onClick={() => navigation.goBack()}
        navigation={navigation}
      />
      <View className="flex flex-row pt-12">
        <View className="bg-[#5d5885] py-4 rounded-xl w-full">
          <Text className="text-white font-bold text-xl border-b-[1px] pb-4 px-6 border-[#f1f1f140]">
            Emails
          </Text>
          <View className="flex flex-row px-6 py-4 items-start justify-between w-full">
            <Text className="text-white opacity-70 mr-4">Read</Text>
            <View className="w-[60%]">
              <ProgressBar progress={readProgress} />
              <View className="flex flex-row justify-between">
                <Text className="text-white opacity-70">0%</Text>
                <Text className="text-white opacity-70">{readProgress}%</Text>
                <Text className="text-white opacity-70">100%</Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row px-6 py-4 items-start justify-between w-full">
            <Text className="text-white opacity-70 mr-4">Composed</Text>
            <View className="w-[60%]">
              <ProgressBar progress={composedProgress} />
              <View className="flex flex-row justify-between">
                <Text className="text-white opacity-70">0%</Text>
                <Text className="text-white opacity-70">
                  {composedProgress}%
                </Text>
                <Text className="text-white opacity-70">100%</Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row px-6 py-4 items-start justify-between w-full">
            <Text className="text-white opacity-70 mr-4">Summarised</Text>
            <View className="w-[60%]">
              <ProgressBar progress={summarisedProgress} />
              <View className="flex flex-row justify-between">
                <Text className="text-white opacity-70">0%</Text>
                <Text className="text-white opacity-70">
                  {summarisedProgress}%
                </Text>
                <Text className="text-white opacity-70">100%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
