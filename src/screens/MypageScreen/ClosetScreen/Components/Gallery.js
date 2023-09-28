import React from 'react';
import {Modal, Pressable, View, StyleSheet, Image, Text} from 'react-native';
import Camera from '../../../../assets/images/camera.png';

const Gallery = ({visible, onClose, onLaunchImageLibrary}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Image source={Camera} style={styles.icon} />
            <Text style={styles.actionText}>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default Gallery;
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0,6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: '50%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
    justifyContent: 'center',
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: '40%',
  },
  text: {
    fontSize: 26,
  },
});
