import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import Item from '../components/Item';
import { getPlaylist, getcat } from "../services/ApiCall";

const IntialList = (props) => {
    const [initialdata, setInitialData] = useState([]);
    const [catdata, setCatData] = useState([]);

    // Call Categories and Playlist Api 
    useEffect(() => {
        getcat().then(response => setCatData(response));
        getPlaylist("toplists").then(response => setInitialData(response));
    }, []);

    // Redirection on Tracks on click of playlist
    const OnClick_PlayList = (item) => {
        props.navigation.navigate("Tracks", { item: item })
    }

    //UI for list of playlist item
    const renderItem = ({ item, index }) => (
        <Item key={index} item={item} OnClick_PlayList={() => OnClick_PlayList(item)} />
    );
    
    //UI for list of categories 
    const renderCatItem = ({ item, index }) => (
        <TouchableOpacity style={styles.item} onPress={() => getPlaylist(item.id).then(response => setInitialData(response))}>
            <Image source={{ uri: item.icons.length > 0 ? item.icons[0].url : null }} style={styles.imageStyle} />
            <Text style={[styles.title, { color: '#fff' }]}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <View style={{ height: '30%' }}>
                    <Text style={styles.titleText}>Categories </Text>
                    <FlatList
                        horizontal
                        data={catdata}
                        renderItem={renderCatItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={{ height: '70%' }}>
                    <Text style={styles.titleText}>Playlist </Text>
                    <FlatList
                        data={initialdata}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#161616',
        padding: 5,
        marginVertical: 4,
        marginHorizontal: 5,
        borderRadius: 15,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 14,
        marginHorizontal: 5
    },
    imageStyle: {
        height: 100,
        width: 100,
        margin: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFF',
        margin: '2%'
    }
});

export default IntialList;
