import { PermissionsAndroid, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs camera access',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const openCamera = () => {
  const options = {
    mediaType: 'photo',
    saveToPhotos: true,
  };
  launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      const uri = response.assets[0].uri;
      console.log('User clicked the pic');
      // setImageUri(uri);
    }
  });
};
