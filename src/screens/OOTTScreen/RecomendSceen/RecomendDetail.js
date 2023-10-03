import React, {  useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { recommendDetailStates, searchState } from '../../../states/atoms';

import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Linking,
    ScrollView
} from 'react-native';

const logo = require('../../../assets/images/logo.png')

const RecomendDetail = ({route}) => {
    console.log("details", route.params.detail.closet);
    const {detail, selecteddate} = route.params;

    const openExternalURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('URL 열기 오류:', err));
    };

    const place = useRecoilValue(searchState);

    return(

        <View style={styles.rootContainer}>

            <ScrollView style={styles.scrollView}>

            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Customized OOTT{'\n'}that reflects your preference</Text>
                </View>
            </View>



            <View style={styles.infoContainer}>
                <View style={styles.datePlace}>
                    <View style={{
                        flex: 8,
                        marginVertical: 15,
                    }}>
                        <Text style={styles.dateText}>{route.params.selecteddate} to {place}</Text>
                    </View>

                    <View style={{
                        flex: 2,
                    }}>
                        <Image
                            style={styles.logo}
                            source={logo}
                        />
                    </View>
                    
                </View>
            </View>




            <View style={styles.contentContainer}>


                <View style={styles.contents}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>AI Recommendation</Text>
                    </View>

                    <View style={styles.slider}>
                        <FlatList
                            data={route.params.detail.commercial}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item, index}) =>{
                                return(

                                    <TouchableOpacity 
                                        activeOpacity={0.8}
                                        style={styles.sliderContent}
                                        onPress={()=>openExternalURL(item.link)}
                                    >
                                        <View style={styles.imageContainer}>
                                            <Image
                                                source={{uri: item.img}}
                                                style={styles.image}
                                            />
                                        </View>
                                        
                                        <View style={styles.recTextContainer}>
                                            <Text style={styles.text}>#Hip #Street{'\n'}H&M 청자켓</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>

                <Text></Text>


                <View style={styles.contents}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>similar witdh your closet</Text>
                    </View>


                    <View>
                        <FlatList
                            data={route.params.detail.closet}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item,index}) =>(
                                <View style={styles.sliderContent}>
                                    <Image
                                        source={{uri: item.img}}
                                        style={styles.image}
                                    />
                                    <View style={styles.recTextContainer}>
                                        <Text style={styles.text}>#Hip #Street{'\n'}H&M 청자켓</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>

            </View>

            </ScrollView>


        </View>
    )

}


const styles = StyleSheet.create({
    scrollView: {
    },
    rootContainer:{
        flex: 1,
        backgroundColor:"#f2f2f2"
    },
    headerContainer:{
        marginTop: 25,
        marginBottom: 10,
        justifyContent: "center",
    },
    infoContainer:{
        marginVertical: 15,
        justifyContent: "center",
    },
    contentContainer:{
        marginVertical: 15,
    },

    sliderContent:{
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: "white"
    },

    recTextContainer:{
        marginVertical: 20,
        marginLeft: 20,
    },

    datePlace:{
        flex:1,
        flexDirection: 'row',
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    dateText:{
        marginLeft: 20,
        fontSize: 21,
        color: 'black',
        fontWeight: '400'
    },
    titleText:{
        marginLeft: 10,
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold'
    },


    title:{
        marginHorizontal: 5,
        marginVertical: 20,
        justifyContent: "center",
    },
    headerText:{
        fontSize: 23,
        marginLeft: 10,
        color: "black",
        fontWeight: "bold"
    },
    text:{
        fontSize: 15,
        color: "black",
        fontWeight: "300"
    },



    image:{
        width: 200,
        height: 150,
        borderRadius: 7,
    },
    logo:{
        width: 60,
        height: 60
    }



})


export default RecomendDetail