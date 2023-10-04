import React, {useState} from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { categoryState } from '../../../states/atoms';
import BitSwiper from 'react-native-bit-swiper';
import {useNavigation} from '@react-navigation/native';


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';


const TravelCategory = () => {

    const navigation = useNavigation()
    const gotoRecommendSceen = () => {
        saveCategorysData(categoryIdx)
        return navigation.navigate('RecommendScreen');
    };

    const saveCategorysData = useSetRecoilState(categoryState)

    const [categoryIdx, setcategoryIdx] = useState("핫플레이스")



    const category = ["핫플레이스", "전통", "놀이공원", "바닷가", "산"]

    const catImages = [
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png",
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png",
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png",
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png",
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png"
    ]

    return(
        <View style={styles.rootContainer} >
            <View style={styles.headerContainer}>
                <Text style={styles.header}>어떤 스타일의{'\n'}여행을 할 계획인가요?</Text>
            </View>
            <View style={styles.imgSlider}>
                <BitSwiper
                    items={category}
                    itemWidth="80%" // 활성 아이템의 넓이
                    inactiveItemScale={0.8} // 비활성 아이템의 스케일
                    inactiveItemOpacity={0.5} // 비활성 아이템의 투명도
                    inactiveItemOffset={30} // 비활성 아이템 표시 넓이
                    onItemIndexChange={item=>{
                        setcategoryIdx(category[item])
                    }}
                    onItemRender={(item, index) => (
                        
                        <View>
                             <View>
                                <Text style={styles.text}># {item}</Text>
                            </View>

                            <View key={index} style={{height: 250}}>
                                <Image
                                    source={{uri: catImages[index]}}
                                    style={{width: '100%', height: '100%', borderRadius: 10}}
                                />
                            </View>
                            
                        </View>
                        
                    )}
                />
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity 
                    onPress={gotoRecommendSceen}
                    style={{          
                        margin: 10,
                        backgroundColor: "black",
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{
                        color: "white",
                        marginTop: 5,
                        marginBottom: 5,
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 17,
                        fontWeight: 'normal'
                    }}>선택</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )


}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor: "white"
    },
    headerContainer:{
        flex: 1,
        justifyContent: "center",
    },
    header:{
        fontSize: 25,
        color: 'black',
        margin: 20,
        fontWeight: "bold",
    },
    imgSlider: {
        flex: 3,
    },
    text:{
        fontSize: 20,
        color: "black",
        marginBottom: 10
    },
    nextButton: {
        flex: 1,
    }

        
})


export default TravelCategory