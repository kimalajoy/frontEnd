import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import styles from '../../styles/styles';
import backgroundImg from '../../assets/plant_info_background.jpg';
import api from '../../api/plantAPI';

export default function PlantInfo ({route, navigation}) {
  
  const [plantInfo, setPlantInfo] = useState({});

  useEffect(() => {
     const getPlant = navigation.addListener('focus', () => {
       getPlantId(route.params.id)
     });

     return getPlant;
   }, [navigation]);

  const getPlantId = (id) => {
    api.getPlantById(id)
    .then(response => setPlantInfo(response.data))
    .catch(err => console.log(err))
  }

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={backgroundImg}
          style={styles.greenCropBackground}
          >
          <View style={styles.plantInfoHeader}>
          {/*The style below may need to be changed since we switched these in the plantProfile page*/}
            <Text style={styles.plantChildName}>{plantInfo.plant_type}</Text>
          </View>
          <View style={styles.transparentSubHeader}></View>
          <View style={styles.plantImgContainer}>
            <Image
              style={styles.plantImg}
              source={{uri: plantInfo.plant_image}}/>
          </View>
          <View style={styles.plantContentContainer}>
            <View style={styles.plantContent}>
              <Text style={styles.plantAttrLabel}>Lighting:</Text>
              <Text style={styles.plantAttrValue}>{plantInfo.lighting}</Text>
              <Text style={styles.plantAttrLabel}>How Often To Water:</Text>
              <Text style={styles.plantAttrValue}>{plantInfo.days_between_water} days</Text>
              <Text style={styles.plantAttrLabel}>Seed To Harvest:</Text>
              <Text style={styles.plantAttrValue}>{plantInfo.days_to_harvest_from_seed} days</Text>
              <Text style={styles.plantAttrLabel}>Root Depth:</Text>
              <Text style={styles.plantAttrValue}>{plantInfo.root_depth_in} inches</Text>
              <Text style={styles.plantAttrLabel}>Plant Lifecycle: </Text>
              <Text style={styles.plantAttrValue}>{plantInfo.lifecycle}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
              navigation.navigate('NamePlant', {id: plantInfo.id})}
            }>
            <View>
              <Text 
              style={styles.text}>Add Plant to Garden</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => {
              navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true })
              navigation.navigate('SearchPage')}
            }
            >
            <Text style={styles.backButton}>Go Back to Search</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
}
