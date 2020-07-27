import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import styles from '../styles/styles';

export default function PlantItem ({ title, image, navigation, id }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PlantInfoPage', {id: id});
        navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false });
      }} >

      <View>
        <Image style={styles.meetAPlant} source={{uri: image}}/>
        <Text>{ title }</Text>
      </View>
    </TouchableOpacity>
  );
}
