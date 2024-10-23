import 'nativewind';
import {Text, View, Image} from 'react-native';
import main_icon from '../../assets/main_icon.png';

export default function Get_started({navigation}) {
  return (
    <View className="flex items-center gap-2">
      <Image source={main_icon} alt="" className="w-[90px] h-[90px]" />
      <Text className="text-[#29BDBA] font-semibold text-2xl capitalize">
        ZebiOps Technology
      </Text>
      <Text className="text-[#29BDBA] font-semibold text-sm uppercase">
        a disruptive technology company
      </Text>
    </View>
  );
}
