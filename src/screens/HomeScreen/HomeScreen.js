import React, { useContext } from 'react';
import { AuthContext } from '../../utils/Auth';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


const HomeScreen = () => {

    const {login} = useContext(AuthContext);

    return (
        <View style={ styles.container }>

            <View style={ styles.header } />

            <View style={ styles.landing } >
                <Text style={styles.logoText}>#OOTT</Text>
                <Text style={styles.text}>Outfit Of Today Travel</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('images/logo.png')}
                />
            </View>
            
            <View style={ styles.kakaoLogin } >
                <TouchableOpacity onPress={() => login()}>
                    <Image
                        sytle={styles.KakaoLoginButton}
                        source={require('images/kakao.png')}
                    />
                </TouchableOpacity>
            </View> 
    
        </View>
    );
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        padding: 0,
        backgroundColor: 'white',
    },

    header :{
        flex : 1.5,
        backgroundColor: "rgb(73, 73, 223)"
    },

    landing :{
        flex : 4,
        backgroundColor: "rgb(73, 73, 223)",
        alignItems: "center"
    },

    kakaoLogin:{
        flex : 2,
        backgroundColor : "rgb(73, 73, 223)",
        alignItems: "center"
    },

    tinyLogo:{
        resizeMode: "contain",
        width: 200,
        height: 200
    },

    logoText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },

    text:{
        color: 'skyblue',
        fontWeight: 'bold',
        fontSize: 30,
    },

    KakaoLoginButton:{
        resizeMode: "contain",
    },
})

export default HomeScreen;