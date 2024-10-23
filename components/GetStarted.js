import 'nativewind';
import {View, ImageBackground, Text, Image} from 'react-native';
import bg_main from '../assets/bg_main.png';
import Button from '../sharedcomponent/button/Button';
import HeaderLogo from '../sharedcomponent/header/HeaderLogo';
import icon from '../assets/icon.png';

export default function Get_started({navigation}) {
  return (
    <View className="flex-1 bg-black">
      <ImageBackground source={bg_main} className="mt-10 bg-no-repeat h-screen">
        <HeaderLogo />
        <View className="flex items-center gap-2 px-6">
          <Text className="text-white text-md text-center pt-6">
            Your advanced personal AI voice assistant. Zora simplifies your
            daily online tasks, boosts productivity, and improves work-life
            balance.
          </Text>
          <Image source={icon} alt="" className="w-screen h-[400px]" />
        </View>
        <View className="flex px-6">
          <Button
            name="Continue"
            navigation={navigation}
            onclick={() => navigation.navigate('UserInformation')}
            routeName="UserInformation"
          />
        </View>
      </ImageBackground>
    </View>
  );
}
