import AsyncStorage from "@react-native-async-storage/async-storage";


export const getUserData = async () => {
    try {
        return await AsyncStorage.getItem("userInfo");
    } 
    catch (e) {
      console.log(e.message);
    }
}