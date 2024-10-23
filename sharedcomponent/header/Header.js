import 'nativewind';
import {Text, View, Image} from 'react-native';
import avatar from '../../assets/user.png';

export default function Header({navigation, username, guesture}) {
  return (
    <View className="flex flex-row items-center gap-6">
      <Image source={avatar} alt="" className="w-[50px] h-[50px]" />
      <View className="flex">
        <Text className="text-white capitalize text-lg font-semibold">
          Hey, {username}
        </Text>
        <Text className="text-white capitalize opacity-70">{guesture}</Text>
      </View>
    </View>
  );
}
