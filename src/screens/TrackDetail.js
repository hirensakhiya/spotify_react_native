import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { getTrackDetail } from "../services/ApiCall";
import { BlurView, VibrancyView } from "@react-native-community/blur";
const DESIRED_HEIGHT = '120%';
const { width } = Dimensions.get('window')

const TrackDetail = (props) => {
  const [cover, setCover] = useState("");

  useEffect(() => {
    setCover(props.route.params.item.track.album.images[0].url)
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={[styles.containerStyle, styles.blur]} source={{ uri: cover != null ? cover : null }}>
          <BlurView
            style={styles.containerStyle}
            blurType="materialDark"
            reducedTransparencyFallbackColor="white"
          />
        </ImageBackground>
        <Text style={{ fontSize: 12, color: '#FFF', marginVertical: '5%', alignSelf: 'center' }}>{props.route.params.item.track.name}</Text>
        <ImageBackground resizeMode="contain"
          source={{ uri: cover != null ? cover : null }}
          style={{ width: '100%', height: 350, marginVertical: '2%' }}>
        </ImageBackground>
        <View style={{ marginHorizontal: '5%' }}>
          <Text style={[styles.title, { fontSize: 25, fontWeight: 'bold' }]}>{props.route.params.item.track.name}</Text>
          <Text style={[styles.title, { fontSize: 14 }]}>Album : {props.route.params.item.track.album.name}</Text>
          <Text style={[styles.title, { fontSize: 14 }]}>Artist : {props.route.params.item.track.artists[0].name}</Text>
          <Text style={[styles.title, { fontSize: 14 }]}>Duration : {Math.floor(props.route.params.item.track.duration_ms / 60000)} min</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#161616',
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 15
  },
  containerStyle: {
    height: DESIRED_HEIGHT,
    width: '100%',
  },
  imageStyle: {
    height: 200,
    width: '100%',
  },
  blur: {
    ...StyleSheet.absoluteFill,
  },
  title: {
    fontSize: 15,
    paddingVertical: 8,
    marginHorizontal: 4,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    marginHorizontal: 5
  },
  imageStyle: {
    height: 40,
    width: 40,
    margin: 10
  }
});



export default TrackDetail;
