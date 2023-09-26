import React, {  useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import { Divider } from '@rneui/themed';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { recommendDetailStates, userInfoState, dateState, searchState, reasonState, friendsState, categoryState } from '../../../states/atoms';

import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    Linking
} from 'react-native';


const RecomendDetail = ({ route }) => {

    const openExternalURL = (url) => {
        Linking.openURL(url)
          .catch((err) => console.error('URL 열기 오류:', err));
    };

    const place = useRecoilValue(searchState);
    const date = useRecoilValue(dateState);
    const reason = useRecoilValue(reasonState);
    const friend = useRecoilValue(friendsState);
    const category = useRecoilValue(categoryState);
    const userInfo = useRecoilValue(userInfoState);

    const recommendClothes = useRecoilValue(recommendDetailStates)

    const travelData = {
        "userId": userInfo.nickname,
        "gender": userInfo.gender,
        "place": place,
        "date": date,
        "reason": reason,
        "friend": friend,
        "category": category,
    };

    const navigation = useNavigation();
    const width = useWindowDimensions().width; //기기 폭 값


    return(

        <View style={styles.rootContainer}>



            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.text}>{travelData.date}</Text>
                    <Text style={styles.text}> to {travelData.place}</Text>
                </View>
            </View>




            <View style={styles.contentContainer}>


                <View style={styles.contents}>
                    <View style={styles.title}>
                        <Text style={styles.text}>{travelData.usrId}님에게 추천하는 아우터</Text>
                    </View>

                    <View style={styles.divider}>
                        <Divider width={1.3} />
                    </View>

                    <View style={styles.slider}>
                        <FlatList
                            data={route.params.detail.commercial}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item,index}) =>{
                                return(
                                    <TouchableOpacity 
                                        activeOpacity={0.8}
                                        style={styles.sliderContent}
                                        onPress={()=>openExternalURL(item.link)}
                                    >
                                        <Image
                                            source={{uri: item.img}}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>

               

            

                <View style={styles.contents}>
                    <View style={styles.title}>
                        <Text style={styles.text}>{travelData.usrId}님에게 추천하는 아우터</Text>
                    </View>

                    <View style={styles.divider}>
                        <Divider width={1.3} />
                    </View>


                    <View style={styles.slider}>
                        <FlatList
                            data={route.params.detail.commercial}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item,index}) =>(
                                <View style={styles.sliderContent}>
                                    <Image
                                        source={{uri: item.img}}
                                        style={styles.image}
                                    />
                                </View>
                            )}
                        />
                    </View>
                </View>

            </View>



        </View>
    )

}


const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:"white"
    },
    headerContainer:{
        flex: 2,
    },
    contentContainer:{
        flex: 13,
    },
    footerContainer:{
        flex:1,
    },


    contents:{
        flex:1,
    },


    title:{
        flex: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    text:{
        fontSize: 20,
        marginLeft: 5,
        color: "black",

    },

    slider:{
        flex: 7,
        margin: 5,
        borderRadius: 10,
    },
    sliderContent:{
        justifyContent: "center",
        marginHorizontal: 10,
    },


    image:{
        width: 220,
        height: 220,
        borderRadius: 8,
    },

    divider:{
        flex: 0.2, 
        marginHorizontal: 10,
        justifyContent: "flex-end",

    }

})


export default RecomendDetail