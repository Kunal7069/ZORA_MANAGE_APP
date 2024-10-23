import 'nativewind';
import {Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';

export default function Tabs({tab1, tab2, onTabChange}) {
  const [activeTab, setActiveTab] = useState(tab1);

  const handleTabPress = tab => {
    setActiveTab(tab);
    onTabChange(tab); // Notify the parent component of the tab change
  };

  return (
    <View className="flex flex-row items-center bg-[#2E2C3D] rounded-xl p-2 mt-4">
      <TouchableOpacity
        onPress={() => handleTabPress(tab1)}
        className={`flex-1 py-2 px-4 rounded-xl ${
          activeTab === tab1 ? 'bg-[#28BEBA]' : 'bg-transparent'
        }`}>
        <Text
          className={`text-center capitalize font-bold text-lg ${
            activeTab === tab1 ? 'text-black' : 'text-gray-300'
          }`}>
          {tab1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTabPress(tab2)}
        className={`flex-1 py-2 px-4 rounded-xl ${
          activeTab === tab2 ? 'bg-[#28BEBA]' : 'bg-transparent'
        }`}>
        <Text
          className={`text-center capitalize font-bold text-lg ${
            activeTab === tab2 ? 'text-black' : 'text-gray-300'
          }`}>
          {tab2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
