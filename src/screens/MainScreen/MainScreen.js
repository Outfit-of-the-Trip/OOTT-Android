import React, { useContext } from 'react';
import { AuthContext } from '../../utils/Auth';


import {
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

const MainScreen = () => {
  
  const {logout} = useContext(AuthContext);

    return (
        <View>
            <View>
                <Text>This is mainscreen</Text>
            </View>
            <View>
                <Button
                    title = "로그아웃"
                    onPress = { logout }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default MainScreen;