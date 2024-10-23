import 'nativewind';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import avatar from '../../assets/user.png';
import back from '../../assets/icon/Back.png';

export default function HeaderBackTitle({navigation, screen, onClick}) {
  return (
    <View className="flex flex-row items-center justify-between pt-4">
      <View className="flex flex-row">
        <TouchableOpacity onPress={onClick}>
          <Image source={back} alt="" className="w-[50px] h-[50px]" />
        </TouchableOpacity>
      </View>
      <Text className="text-white uppercase text-lg font-semibold">
        {screen}
      </Text>
      <Image source={back} alt="" className="w-[50px] h-0" />
    </View>
  );
}
