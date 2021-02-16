import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity, 
    Image, View
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const Item = (props) => {
    const { colors } = useTheme();
    const { item, OnClick_PlayList } = props;
    return (
        <TouchableOpacity style={styles.item} onPress={() => OnClick_PlayList()}>
            <Image source={{uri: item.images.length > 0 ? item.images[0].url : null}} style={styles.imageStyle}/>
            <View>
                <Text style={[styles.title, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.subtitle, { color: colors.text }]}>{item.tracks.total} {'Song'}{item.tracks.total > 1 ? 's': ''}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({   
    item: {
        backgroundColor: '#161616',
        padding: 5,
        marginVertical: 4,
        marginHorizontal: 16,
        flexDirection: 'row', 
        borderRadius: 15      
    },
    title: {
        fontSize: 18, 
        paddingVertical: 8,
        marginHorizontal: 5
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

export default Item;