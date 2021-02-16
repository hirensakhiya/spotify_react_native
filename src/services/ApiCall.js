import axios from 'axios';
import { Credentials } from '../common/Credentials';

const spotify = Credentials();

// Get Token Api 
const gettoken = () => {
    return axios('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
    }).then(tokenResponse => {
        return tokenResponse.data.access_token
    });
}

// Get Categories List Api
export const getcat = () => {
    return gettoken().then(token => {
        return axios('https://api.spotify.com/v1/browse/categories?locale=sv_IN', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(genreResponse => {            
            return genreResponse.data.categories.items
        });
    })
}

//Get Play List as per selected category
export const getPlaylist = (val) => {
    return gettoken().then(token => {
        return axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?country=IN&limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(playlistResponse => {            
            return playlistResponse.data.playlists.items
        }).catch((error) => {
            console.log("error", error)
        });
    })
}

// Get Tracks as per the selected Playlist
export const getTracks = (id) => {
    return gettoken().then(token => {
        return axios(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(trackResponse => {            
            return trackResponse.data.items
        }).catch((error) => {
            console.log("error", error)
        });
    })
};