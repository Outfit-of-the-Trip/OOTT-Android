import React, {useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { recommendDetailStates, userInfoState, dateState, searchState, reasonState, friendsState, categoryState } from '../../states/atoms';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

const windowHeight = Dimensions.get('window').height;



const TravelDetailScreen = ({route}) => {


    const navigation = useNavigation();

    // const gotoDetail = (detail) => {
    //   return navigation.navigate('RecommendDetail', { date: selectedDate, place: place, detail: detail });
    // };

    // const gotoFriendsScreen = (date) =>{
    //     return navigation.navigate('FriendsLook',{date : date})
    // }




    const [selectedDate, setSelectedDate] = useState("");
    const [selectIndex, setSelectIndex] = useState(0);



    useEffect(()=>{
        setSelectedDate(JSON.parse(route.params.travlDate)[0])
    },[])




    return(
        <View style={styles.rootContainer}>


            <View style={styles.header}>

                <View style={{flex: 7}}>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>My look to {route.params.travlPlace}</Text>
                    </View>


                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Select Date</Text>
                    </View>
                </View>

                <View style={{flex: 2}}>
                    {/* <TouchableOpacity 
                        style={{flex: 1.5, justifyContent: "center", alignItems:"center", marginTop: 20 }}
                        disabled={coordi.filter(item => 'index' in item).length == recommendClothes.length? false : true}
                        onPress={sendTravelData}
                    >
                        <Icon
                            name="check-circle"
                            size={35}
                            color={coordi.filter(item => 'index' in item).length == recommendClothes.length? 'black' : 'grey'}
                        />
                        <Text style={{
                            fontWeight: "bold",
                            color: coordi.filter(item => 'index' in item).length == recommendClothes.length ? 'black' : 'grey'
                        }}>선택 완료</Text>
                    </TouchableOpacity> */}
                    
                </View>
                
            </View>




            <View style={styles.buttonContainer}>
                <View style={styles.flalistContainer}>
                <FlatList
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={JSON.parse(route.params.travlDate)}
                        renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems:"center",
                                width:140,
                                height:32,
                                marginHorizontal: 8,
                                borderRadius: 20,
                                backgroundColor: selectedDate === item ? 'blue' : 'white',
                            }}
                            onPress={() => {
                                setSelectIndex(index)
                                setSelectedDate(item)
                            }}
                        >
                            <Text 
                                style={{ 
                                    fontSize: 17,
                                    fontWeight: "500",
                                    color: selectedDate === item ? 'white' : 'grey' 
                                }}
                            >{item}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                    />
                </View>
            </View>


            <View style={styles.clothesContainer}>

                { JSON.parse(route.params.outerSeq)[selectIndex] != "None" ? (
                    <Image
                        style={styles.outer} 
                        source={{uri: JSON.parse(route.params.outerSeq)[selectIndex]}}
                    />
                    ) : (<View></View>)
                }

                { JSON.parse(route.params.topSeq)[selectIndex] != "None" ? (
                    <Image
                        style={styles.top} 
                        source={{uri: JSON.parse(route.params.topSeq)[selectIndex]}}
                    />
                    ) : (<View></View>)
                }

                { JSON.parse(route.params.bottomSeq)[selectIndex] != "None" ? (
                    <Image
                        style={styles.bottom} 
                        source={{uri: JSON.parse(route.params.bottomSeq)[selectIndex]}}
                    />
                    ) : (<View></View>)
                }

                { JSON.parse(route.params.shoesSeq)[selectIndex] != "None" ? (
                    <Image
                        style={styles.shoes} 
                        source={{uri: JSON.parse(route.params.shoesSeq)[selectIndex]}}
                    />
                    ) : (<View></View>)
                }

            </View> 

        </View>



    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    headerContainer:{
        flex: 1,
        justifyContent: "center",
    },
    header:{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row"
    },
    titleContainer: {
        flex: 0.5,
        justifyContent: "space-between",
        flexDirection:'row'
    },
    buttonContainer:{
        flex: 1,
        justifyContent: "center",
    },
    flalistContainer:{
        justifyContent: "center",
    },
    clothesContainer:{
        flex: 7,
    },
    imageContainer:{
        height: windowHeight-280,
        borderRadius: 20,
        backgroundColor: "#f0f0f0"
    },





    headerText:{
        fontSize: 23,
        marginLeft: 10,
        color: "black",
        fontWeight: "bold"
    },    
    titleText:{
        fontSize: 22,
        marginLeft: 10,
        color: "black",
    },




    outer:{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right:0,

        width: 260,
        height: 270,
    },
    top:{
        position: "absolute",
        top: 20,
        bottom: 0,
        left: 200,
        right: 0,

        width: 230,
        height: 230,
    },
    bottom:{
        position: "absolute",
        top: 200,
        bottom: 0,
        left: 180,
        right:0,

        width: 230,
        height: 230,
    },
    shoes:{
        position: "absolute",
        top: 310,
        bottom: 0,
        left: 50,
        right:0,

        width: 120,
        height: 120,
    },
   
})

export default TravelDetailScreen