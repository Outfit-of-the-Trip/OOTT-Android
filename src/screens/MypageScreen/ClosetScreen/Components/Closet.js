import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Platform, View, FlatList, StyleSheet, Image} from 'react-native';
import Gallery from './Gallery';
import {launchImageLibrary} from 'react-native-image-picker';

const imagePickerOptions = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};
const Closet = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data] = useState([
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png',
    'data:image/png;base64,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',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAV1BMVEVmAABfAACykpJaAADl29tiAADXx8f27++8oKCRYmL////8+PhqGRlhAACYamqmfn7u5+e4mppRAABWAACKVlZ1Jiafd3eYbW3t5eV2MTHLtrang4NpDQ0Nqoh+AAACFUlEQVR4nO3cvVLbQABGUQtbMYgIzE9IILz/cwY7BLpYt7KZOadR+80tdrZZrVYU88AC86HVzQUL3I5vsdbfthuO2m2HQ6y7+zVHPDy+x7ocTnpmfgnjlViLiRWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgVnHOsYfVj79QzPp1vrGG8nA6+n3rJh3ONNYwX139bXYv1f/P6aTtNYi0wPvz8NU1iLTE+bqZJrGWe/2XaXIt1zHp3SLV7uhfrqPXLPtHvYRjFOmp+mqa7txvpSqwFnl9e1/uvWEu8TxErECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxCr8HYnuLrZez31jA9nHWs8OPWKT2cd69yIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgVfMS6u19zxMPje6zthqN2h1jzzQUL3B5+yTEPLDCf9Mz8ev4AdWFC+vhQlM4AAAAASUVORK5CYII=',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEWRkZH///+Ojo6Li4uIiIj4+PjIyMiVlZXx8fHp6enc3NzX19ednZ20tLSwsLCSkpKoqKjAwMDj4+PKysqjo6O7u7vR0dHz8/Pg4OCCgoIFKEJWAAAEzUlEQVR4nO3a65KjKhQFYAKIIqigeOn3f9GzAU1MYk91TdWZ1tT6/kTRWK6gXDSMAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/GM8++3T+AEuD/GjDfc8XIjQNiR0UqRS8c1Rfh8Pt+JIEOptw21cz1iEqbhlhVZWMFbqo4Pc/Akicnc75Cjhm+2Eh2JfWhjLy/nwKEr8brroLxKK/r28rD4oIZ9ei7VgJ65DZodMpVrQal21OWHV7IyBpRs3xxpiyaTjr8FZ59ej1HFbsR5kaE9wH9JFl8l0bkauqywn1JLvpN1zFQ6diCWCuX6KFcXXo7Tpd9kOeoqAG5ET3i+rLeHrfp3Ov8S2TvW328qblLD8n0/2r/w0oU133HeXHxL+ph8nTC3S8FaefUJCnu7DW8MOm5ErJnxpStnWT2ofqCl9TXm9hIXeUSmPvQ/Zin5w4rlPv17CJ6njY7zdlxWD3dfjRySkiE9DtGI/gbh4wm0jt8NTxukR8XoJZ68eHp2gEM4vjynUY4B9vYTv49IVtaOyG5c14j3RFRP+6TuchzxXvN+Kn5aQEnVpiFN/bsJ1MtV/WML9/SiGz0vIrdq1Oflry2cl7G99u467uciPeYbtaxdMyMs9tmWgcXdctyp3iuG6dfj8VLgW2ww4bam2Pv9R0xdM+GQRL+PubH4E+oCEjIflpVSH13HpfImE/JuENJBxZjfwnlV5kbkFDy3ZVUdaf+byVi46p8xSVXXtqVV9OoxNO3bsjA4G129224SQUoj3F4hXeasIF5KuqZKFvJyK1hcXceJgbXe/4ujesrlRKWmB0VCAVkLci60LabewHtPaf57lWDP6xupy7uLzl9SSlMNETFyvtNbpvS8fR153sm8tBRA6LK2oaZOwVScHrR0tMJv2TAtEmukMb9ZIpcaYsGJxmhAfF/JQNfEU48lyKdks1k1V2WpHn1zqUDs1SVFZq7mvhS1Kq5nTKaHmg6ZfSJrhJAm1FWJNKE0tU8LRE6rM3jvndTxRuUzsRstOeeHaKiYcJNVlzONpwcWE/ZaQSrg4T0KtfT9TQt6ppVfxwcQc321OnImymKbZxXFMWy/L0PM6JlSmoIRWT/SDpKrzSovnhDzOjGf929ky3QYW65C32nSd0Y7qMPbZTWm9n8exGhTderW1/suHlFB89aFueelHa4OnOh9oVGMNd318Z5oS0vBVmMmeo1vUgYUQE45Oxr+ReDrZOrK2aUZjfDNSoyi4V4NSkx0m17QpoV3ig/45zhdLKcqeO+2cGwMlVCw4d5qr1PR938T7kLOOxB5jHb5wPvTT1Of3aF01Nk2jXWuMyQl5S82Rr6gNrmpjampC6UhmooQNLdSKEvJTZIxhSkro7q9f1s+qLSuxtaWs06WUX3Wb3tXrmJBaYWqPqIfoqJ2xTnfptT7dkGmBU28hR3OO65QazbqsSrt6LDBjRm/qXBE0yq5NlTpMUduUcIjPwelmW+swo4TpM7alofmdPAcEc4fFjVLNWg0uzRnyrEjwQPdm+l9bY9dN2wG6bYF2OdUI/PhcdtOE938i3kueN50pFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXNh/mDxB0bZfCNkAAAAASUVORK5CYII=',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAACioqLT09PLy8vk5OS4uLhsbGzDw8OsrKzIyMgaGhrs7Ozh4eH19fVhYWGGhoaSkpJXV1epqamKiora2tqAgICfn5++vr7r6+s2NjZvb29fX19PT08kJCRISEgrKysMDAx3d3eYmJhBQUH84MVnAAACv0lEQVR4nO3a2XqqMBiGUXBGZRBx1mq193+NG8JgpSGGR1TMftdJISg/X4Ek0FoWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgPYbB1EU9N99FE+wWAbB0o0XVnas++7DeYJREmwcL3SMTtiz7ic8B/HJnr7suJqjnTDZbLuqXTn2pJo9avjAJfrOrbRkowlVXpBwVCoZXlsNSTguldyL1noJF6oC6oTrJrPIlRPWO4f9+ydCJAy8qdTGazSMlEi4j4JcR7TqJhyIhDNVAefuJ55MJByUW3UTDkXCL1WBdiR0yq2aCb3s0lbdiJ+dMLq5eeU+OuGm6J961QVEwmXflXpBR/NQwq04eBGxuoBytPjTATzBAwl3ybaTFSY/jpUF2pHwdyEvZq01EgZ2ui29VvdVBdqR8FxMS7NZSnFzVScUZ9AO4qW5WDpUFBAJt75UOH5arqvSnMayvrQSTsU9mF2c6ag4kU9P29GXFr41E67ST5yy1UO6GskKtCyhrXWVOpP0A9uiJcy+0vlboB0Jd/NOap61Knqa7jL/Dfi/WovGc/nWakdC/Xnp4HqK5zffWF833MZpR8Ia42EeIyy/nPF2+abbiYqT3qFeheYTldVNmA5voWwAcYey/kb9BOxL9tOw2nOauAedVb0inq625VN4J+GuqRzVaid0N8r9TctPUp+XsK65MuHwkV3reXrCtyuNFp67TlaMSzi8zKLg7B9OyUoy1zQu4Y3kvZLZCZPndaMTHs+WWQndaBa7XFYdZzDq5kO5SQnlqhIqx7arbFK+8Ic69q9449Zwwmx87Wl+vE0Jv41PqHnI2VUq6ael3vFX8qqEfS35q+zNQM8bAv4vfanR/23SDX0/TJ70jE1YMD+h83M8/ij/EwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwxz9p6yMKlq05agAAAABJRU5ErkJggg==',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2F8fJZ6DGDslIY8S2eewtqLaOtBjsWG0Fhw&usqp=CAU',
  ]);

  const renderImage = ({item, index}) => {
    return (
      <Image
        source={{uri: item}}
        style={{width: 120, height: 120, borderRadius: 10, margin: 6}}
      />
    );
  };

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res);
  };

  //갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOptions, onPickImage);
  };

  //Modal Open
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
    }
  };

  return (
    <>
      <View style={styles.plusButton}>
        <Icon name="plus" size={25} color="black" onPress={modalOpen} />
      </View>

      <View style={styles.imageContainer}>
        <FlatList
          numColumns={3}
          keyExtractor={item => item}
          data={data}
          renderItem={renderImage}></FlatList>
      </View>
      <Gallery
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    marginVertical: 10,
    marginRight: 15,
    alignItems: 'flex-end',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 3,
  },
});

export default Closet;
