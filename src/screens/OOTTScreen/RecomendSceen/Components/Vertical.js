import React, {useState, useEffect } from 'react'
import Swiper from 'react-native-swiper'
import { RecomendGarmet } from '../../../../constants/RecomendGarmet';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { recommendDetailStates, userInfoState, dateState, searchState, reasonState, friendsState, categoryState } from '../../../../states/atoms';
import { Modal, NativeBaseProvider, Button } from "native-base";
import Icon  from 'react-native-vector-icons/Ionicons';
import Horizontal from './Horizontal';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';


const ModalButton = (props) => {
    const [placement, setPlacement] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(false);

  
    const openModal = placement => {
      setOpen(true);
      setPlacement(placement);
    };

  
    return(
        <NativeBaseProvider>
            <Icon 
                onPress={() => openModal("center")}
                name={select ? "heart" : "heart-outline"}
                size={30}
                color={'red'}
            />

            <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
            <Modal.Content maxWidth="350" {...styles[placement]}>
                <Modal.CloseButton />
                <Modal.Header>이 코디를 선택하시겠습니까?</Modal.Header>
                    <Modal.Footer>
                        <Button.Group space={2}>

                            <Button 
                                variant="ghost" 
                                colorScheme="blueGray" 
                                onPress={() => {setOpen(false)}}
                            >더 둘러보기</Button>

                            <Button 
                                onPress={() => {
                                    setOpen(false)
                                    props.setFunc(props.clothesData)
                                    setSelect(true)
                                }}
                            >선택</Button>

                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </NativeBaseProvider>
    )
};

const Vertical = () => {

    const recommendClothes = useRecoilValue(recommendDetailStates)

    const place = useRecoilValue(searchState);
    const date = useRecoilValue(dateState);
    const [clothes, setClothes] = useState({})

    return(
        <Swiper 
            style={styles.wrapper} 
            horizontal={false} 
            activeDotColor="black"
        >
            {recommendClothes.map((item, index) =>(
                <View style={styles.root} key={index}>

                    <View style={styles.header}>
                        <View style={styles.line1}>
                            <View style={styles.iconContainer}>
                                <Icon 
                                    name={"airplane"}
                                    size={25}
                                    color={'blue'}
                                />
                            </View>
                            <View style={styles.lookContainer}>
                                <Text style={styles.text}>{item.date} Look</Text>
                            </View>
                        </View>
                        <View style={styles.line2}>
                            <Text>{date[0]} ~ {date[date.length - 1]} to {place}</Text>
                        </View>
                    </View>


                    <View style={styles.horizontalContainer}>
                        <Horizontal clothes={item.clothes} date={date}/>
                    </View>


                    <View style={styles.footer}>
                        <ModalButton setFunc={setClothes} dateData={item.date} clothesData={item.clothes}/>
                    </View>


                </View>
            ))}
        </Swiper>
    )

}

const styles = StyleSheet.create({

    wrapper: {},
    root:{
        flex: 1,
    },
    header: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "skyblue"
    },
    line1:{
        flex:1,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    iconContainer:{
        margin:5,
    },
    line2:{
        flex:1,
    },

    horizontalContainer:{
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato'
    },
    footer:{
        flex: 2,
        backgroundColor: 'rosybrown'
    },
    image:{
        width: 300,
        height: 300
    },

    text: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold'
    },

      
})

export default Vertical