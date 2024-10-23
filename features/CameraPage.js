import React, { useState } from 'react';
import { View, Button, Image, PermissionsAndroid, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { requestCameraPermission,openCamera } from '../api/CameraUtils';
const CameraPage = () => {
    const [imageUri, setImageUri] = useState(null);

    const handleCameraPress = async () => {
      const hasPermission = await requestCameraPermission();
      if (hasPermission) {
        openCamera(setImageUri);
      }
    };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Camera" onPress={handleCameraPress} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
    </View>
  );
};

export default CameraPage;
