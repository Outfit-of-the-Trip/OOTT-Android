import {
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';

import { Modal } from 'react-native';


const toggleisfriendmodal = () =>{

return(
<Modal 팝업창
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
            >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:24}}>같이 가는 친구가 없습니다</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:24}}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
    </Modal> )
}

export default toggleisfriendmodal