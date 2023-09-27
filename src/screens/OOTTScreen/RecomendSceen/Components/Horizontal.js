import React, {useState, useEffect } from 'react'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { recommendDetailStates } from '../../../../states/atoms';


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

const Horizontal = ({clothes}) => {

    const navigation = useNavigation();

    const gotoDetail = (outter) => {
      return navigation.navigate('RecomendDetail', {detail: outter});
    };
    const gotoTop = () => {
        return navigation.navigate('RecomendTop');
    };
    const gotoBottom = () => {
        return navigation.navigate('RecomendBottom');
    };
    const gotoShoes = () => {
        return navigation.navigate('RecomendShose');
    };


    return (
        <Swiper 
            style={styles.wrapper} 
            horizontal={true} 
            activeDotColor="black"
         >   
           {clothes.map((item, index) =>(
                <View style={styles.root} key={index}>


                    <View style={styles.outterContainer}>
                        <TouchableOpacity onPress={()=>gotoDetail(item.outter.detail)}>
                            <Image
                                style={styles.outter}
                                source={{uri: item.outter.img}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>

                        <TouchableOpacity onPress={()=>console.log("top")}>
                            <Image
                                style={styles.top}
                                source={{uri: item.top.img}}
                            />
                        </TouchableOpacity>
                        

                        <TouchableOpacity onPress={()=>{console.log("bottom")}}>
                            <Image
                                style={styles.bottom}
                                source={{uri: item.bottom.img}}
                            />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>console.log("shoes")}>
                            <Image
                                style={styles.shoes}
                                source={{uri: item.shoes.img}}
                            />
                        </TouchableOpacity>

                    </View>

                   

                </View>
            ))}
        </Swiper>

    )
}

const styles = StyleSheet.create({
    wrapper: {},
    root:{
        flex:1,
        margin: 10,
        flexDirection: "row",
        // backgroundColor: "lightgreen"
    },

    outterContainer: {
        flex: 1,
        // backgroundColor:"tomato"
    },

    container:{
        flex: 1,
        // backgroundColor: "skyblue"
    },

    
    outter:{
        width: 200,
        height: 200,
    },
    top: {
        width: 200,
        height: 200,
    },
    bottom: {
        width: 150,
        height: 150,
    },
    shoes: {
        width: 100,
        height: 100,
    },

})

export default Horizontal