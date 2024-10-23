import 'nativewind';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import avatar from '../../assets/user.png';
import back from '../../assets/icon/Back.png';

export default function HeaderBack({navigation, username, guesture, onClick}) {
  return (
    <View className="flex flex-row items-center pt-4">
      <TouchableOpacity onPress={onClick}>
        <Image source={back} alt="" className="w-[50px] h-[50px]" />
      </TouchableOpacity>
      <Image source={avatar} alt="" className="w-[50px] h-[50px]" />
      <View className="flex pl-4">
        <Text className="text-white capitalize text-lg font-semibold">
          Hey, {username}
        </Text>
        <Text className="text-white capitalize opacity-70">{guesture}</Text>
      </View>
    </View>
  );
}
