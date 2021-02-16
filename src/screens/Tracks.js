import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { getTracks } from "../services/ApiCall";
import { BlurView } from "@react-native-community/blur";
const DESIRED_HEIGHT = 300;
const { width } = Dimensions.get('window')

const Tracks = (props) => {
    const [tracksData, setTracksData] = useState([]);
    const [img, setimg] = useState("");
    const [item, setItem] = useState();

    // Call Get Tracks api as per selected playlist 
    useEffect(() => {
        setimg(props.route.params.item.images[0].url)
        setItem(props.route.params.item)
        getTracks(props.route.params.item.id).then(response => {
            setTracksData(response)
        });
    }, []);

    useEffect(() => {
    }, [img]);

    // Redirection on Track Detail on click of Track
    const OnClick_TrackList = (item) => {
        props.navigation.navigate("TrackDetail", { item: item })
    }

    // UI for List of tracks
    const renderItem = ({ item, index }) => {
        var artist = ""
        item.track.album.artists.map((item) => {
            if (artist.length == 0) {
                artist = item.name
            }
            else {
                artist = artist + ", " + item.name
            }
        })

        return (
            <TouchableOpacity key={index} style={styles.item} onPress={() => OnClick_TrackList(item)}>
                <Image source={{ uri: item.track.album.images.length > 0 ? item.track.album.images[0].url : null }} style={styles.imageStyle} />
                <View>
                    <Text style={[styles.title, { color: '#fff' }]}>{item.track.name}</Text>
                    <Text style={[styles.subtitle, { color: '#a9a9a9' }]}>{artist}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground style={[styles.containerStyle, styles.blur]} source={{ uri: img }}>
                    <BlurView
                        style={styles.containerStyle}
                        blurType="dark"
                        reducedTransparencyFallbackColor="white"
                    />
                </ImageBackground>
                <ImageBackground resizeMode="contain"
                    source={{ uri: img }}
                    style={{ width: '100%', height: 200, marginVertical: '8%' }}>
                </ImageBackground>
                <FlatList
                    data={tracksData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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
        width,
    },
    imageStyle: {
        height: 200,
        width: '100%',
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        fontSize: 15,
        paddingVertical: 8,
        marginHorizontal: 4,
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
export default Tracks;