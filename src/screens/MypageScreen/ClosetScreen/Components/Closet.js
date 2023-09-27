import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Platform, View, FlatList, StyleSheet, Image} from 'react-native';
import Gallery from './Gallery';
import {launchImageLibrary} from 'react-native-image-picker';

const Closet = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data] = useState([
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUdHRv///8AAAALCwfExMQbGxn6+vp/f37Ly8urq6sUFBH19fW6uroODgsGBgCGhoV2dnbn5+fh4eFVVVT29vazs7Pa2trm5ubR0dFxcXDHx8deXl2Tk5KYmJg2NjVlZWSMjIxBQUAjIyFDQ0IzMzFMTEqioqEtLSvWSZHOAAAJcklEQVR4nO2d22LiIBCGKxGjMYmnaj1rt619/zdcYnRNOISBkIRx/a+6a6v5BGaGAYa33rPrresHaFwvQvx6EeLXixC/XoT49SLErxehMw1m89Wwn2u4ms8GbX1w44TjVXyYLn6JqN/F9BCvxk0/QJOEs/5+l2QsSUTfRNHo+mKw2/dnDT5FU4Tz0SZijy9F40FT9h1sRvOGnqQJwkE/ZHSJHq6AyZozmcZNDE7nhO/LHet5JnRFysXS+bh0TBgzvMiC7i7W9rvY7SO5JFyF9fD+QYYrh0/ljjD+IkFtvFwB+XTXkI4IB5fEQfM9FJH04MjsOCEc7AmxsS1VooScnVgdB4SDMyGO8XKl5OygHesTHhriy0TIoXPCOGmO78oYLDslXH06H3+8KPms5ztqEYZO7adKEZl2RNgPmu2gD6Wk3wHhYNN4B32IkpO1VbUlHAauAhiYAjJsl3DSYgPmoiRskXB8bGsEFkWOVqkAG8JhKyZUVGRlcCwID6330Lso2bdBeOqih95Fdo0TDjoZgg+l36YTDkPCWZR0CsgGY/DRJOGqIxtTFCVmcaoR4bozG1MUNXP+JoRbLwCZjLyGAWG/WxtTlAkinHDrD6ARIphw7RMgQwSPRSjhypcxeBfYogIJZ74BMosK9IswwkHUvR/kRQNYdAMjPHYdycgUfbsj7DTYVisFheEQwoOfgMzanN0QDn0FhLlFPeHYOzNaENEnNvSEn/6Z0YcA1kZLOPG3j2bSZ+B0hB4PwlxkW49wYLWrok1RosmGawg37Wa2bRSc6hB6NCVUi1Tvaqgm9L6PZtL000rCEEMTsuitcn2xinCFA1AzV6wi9NrXFxUd7QhjLE3IGrFiO0MFodH2yW5FiQ2ht3MmmSoWpZSEA0yADPHdmPCMizCdmBIia0LWiKq8lIoQWRNWNKKCEF0TskZUxG4KwgtCQsU2RgUhIl94l8onygkRhTMPKQIbOeEXloi0KEV0KiVEM6koSz7FkBKG/ucuZAqk80QpIc4mZI0IJURpZzJJbY2McIfRzmSKFjDCd6xNKA9OJYRLxIQjECHaTirvpiIhwqD7IclEWCREkedWSZL/FgmRuvtcyQZACDh+7a8kEwyBcI65k8piU4FwhJxQ8BcC4cbHzUFwJcJqokCIehjKBiJPOMPdSVk35Tf08YSovWEmwSPyhHvshCm/E4wnRByU5hJCU54QYRqxLMHUcIRj7J1UnCNyhEizbEWRdSUh2hTNQ3yyhiNEtfArV7qvJJyCYzbKl+7iXg/412Um7P5LEgMuKQ4GO1bGT6A4wgXUWURRv6xh+S+DyZZ7/Y+AGJBwmJmF2fJL4E+GfUHrE+Tpop9Kwl+gs6Di5tyynxFjfIGQbB4rfn0eUZbchaXIKK0kBA5D2XEOU0JyKb7KH1mREEJzgNyflgmBWShKJMXVDAkDbnMvd65KJAQnOTmHWCYEziwS2YEcQ8L7ovTs/mWVJ6YCIdyPcQOoTAhLYUSLSZhpen3I5fXncMIBXAnn0/CuCfcl5RYvzkzyWdKIUf4RYf5FbUKDbZJcIqNMCAxpouCqvBlCkv+L+5hR/tTBP3GvX/I+k30vtxX48mffPiLvyyQwyDxwQU2Z0Gzfek44kWYf74TKv83tzGdWno9+78/n8z6V/NpttJo91raC0Gz+qyccKp11clvNXE/+EBKkmWRvY0VYPkjTLOHgY5Zr/MMjPra/zJYnZTE0K8LyLL9ZwoeEYCkpHjwbXFJ5pt2KsBx6lwnNpha1CN/IrrSJSX4C0Dlhi23IWpFciitFJ5m59J5wMFOOQ0ppVspz9AgeZJ/t/ThU21J6zPQnqyS8uT2RbObm3Ja26A+voVUWa9KE5EfsZCsmzv2hWZoGQpj8E/d6/kXT63/n5QOcEVbFNGZLa3rC+WZ6V1h+/RaXjr+yLvx1/fks8flWhFVxqdmqhYktFecWtxnAPI5vTySbfVsRVs0tzHYp1CLkkw1yX2xFWDU/NHyrOoRvpJwx+pCnqmwIy59rmacpvJUt4Rv5KXSnWB6ZWhBq8jTgXNv1EbfD4XAtXzQOzuthSWsx1xaRU//ao+ajoyL0jk7XtzEh1OTa4PnSTFdfrvgLUL400WZCI1kutlKafOnz57yff93i+deenn/9EMfp7Upp1oD/g3V8aU4Pk7R7MZ5/P83z74nCvt1Ev6/tP9ibiH1/6UVL+Px7hHEPRMg+b8MJlGcC7dVHPb0AnbfAfWZGPNolOfdklMnwS0ICT074/GfXEM8RgecP8c6goGdI8VpT8DlgvGe5ZcU/nuk8fgI/j48048Zn2SoI8VRqK8qkLgZOW2NU26SX4ptgmNWnwbh+oSrZ9kR1ohQV25S1vrDlTU1rfeELTo3rtWEr2JYqq14/Td1E5VUQ/3HtS1Q+0a5+Kaa5vmxuDyDEE51W3h/wHLWgpZMKAGFvisPtB2IaGErY8/nyjn+qU5Mdx4pwrbr6vZP/+YxEc2OQ7n4L7/spVVeBBhEiuKNEd12Q9p4Zz+9H0N+7rr8r6Oiz349+tc+vJ/Tv2ryCnNz35LPL0DgKKKG/VXmIstS8IWFv52f0FsiWmuwIe98+WhuAlYETjj3cdkrViQsLQsV5jy4lretQg9C/uWLlnNCG0LfwDX7lMZjQL7cIcYTGhD4hGgCaEPqDaAJoRMjGog8WlRpdHm9G6MXt3BRsRW0Iex9B19FNBPWDloS98Xe3MWrwC4tk7AlZGN6lvSGgYLsmYZcri6DpUn1C5jW6GYyRkZeoQ9ibfXfRjORXn7JwRZhl4Np2G1SfVXNK2NuSdrPhiZmbd0DYG5xabEZKdprMdgOE2ea3tlxjYGVi6hP2BtNWjGpULJLZLiGLU1W1ENyJkm+zONQtYbadoVnHQao2IbRCmOWLmxuOacU+mfYIe++ThhhTEpqG2c0QsgnHRFkW0FqUkIkDPkeEzKwegJWagYoI2Vt7wLIcETItj87CnIQcKy7aNpQ7QuY7pi4akjXftJ5/KMslIdNyUQ+S4S2Wdfy7KMeEzOqMGKTVWWKaEPIzcmJdinJOyPQeb4ghJc0LKDrH6zVDmGk1OrFnTiE3D0Up+83TRXpNqgM1RZjpIz4vsjpWaSIFpVGSsZHFOZbVB3elJgmvGq+X+82PcJNCVvzrZ7NfrpvomCU1TnjX+2y13vbj5XIZ97fr1axxsrtaI+xML0L8ehHi14sQv16E+PUixK8XIX79BWKCmCMFHUXXAAAAAElFTkSuQmCC',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAV1BMVEVmAABfAACykpJaAADl29tiAADXx8f27++8oKCRYmL////8+PhqGRlhAACYamqmfn7u5+e4mppRAABWAACKVlZ1Jiafd3eYbW3t5eV2MTHLtrang4NpDQ0Nqoh+AAACFUlEQVR4nO3cvVLbQABGUQtbMYgIzE9IILz/cwY7BLpYt7KZOadR+80tdrZZrVYU88AC86HVzQUL3I5vsdbfthuO2m2HQ6y7+zVHPDy+x7ocTnpmfgnjlViLiRWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgVnHOsYfVj79QzPp1vrGG8nA6+n3rJh3ONNYwX139bXYv1f/P6aTtNYi0wPvz8NU1iLTE+bqZJrGWe/2XaXIt1zHp3SLV7uhfrqPXLPtHvYRjFOmp+mqa7txvpSqwFnl9e1/uvWEu8TxErECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxArECsQKxCr8HYnuLrZez31jA9nHWs8OPWKT2cd69yIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgViBWIFYgVfMS6u19zxMPje6zthqN2h1jzzQUL3B5+yTEPLDCf9Mz8ev4AdWFC+vhQlM4AAAAASUVORK5CYII=',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEWRkZH///+Ojo6Li4uIiIj4+PjIyMiVlZXx8fHp6enc3NzX19ednZ20tLSwsLCSkpKoqKjAwMDj4+PKysqjo6O7u7vR0dHz8/Pg4OCCgoIFKEJWAAAEzUlEQVR4nO3a65KjKhQFYAKIIqigeOn3f9GzAU1MYk91TdWZ1tT6/kTRWK6gXDSMAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/GM8++3T+AEuD/GjDfc8XIjQNiR0UqRS8c1Rfh8Pt+JIEOptw21cz1iEqbhlhVZWMFbqo4Pc/Akicnc75Cjhm+2Eh2JfWhjLy/nwKEr8brroLxKK/r28rD4oIZ9ei7VgJ65DZodMpVrQal21OWHV7IyBpRs3xxpiyaTjr8FZ59ej1HFbsR5kaE9wH9JFl8l0bkauqywn1JLvpN1zFQ6diCWCuX6KFcXXo7Tpd9kOeoqAG5ET3i+rLeHrfp3Ov8S2TvW328qblLD8n0/2r/w0oU133HeXHxL+ph8nTC3S8FaefUJCnu7DW8MOm5ErJnxpStnWT2ofqCl9TXm9hIXeUSmPvQ/Zin5w4rlPv17CJ6njY7zdlxWD3dfjRySkiE9DtGI/gbh4wm0jt8NTxukR8XoJZ68eHp2gEM4vjynUY4B9vYTv49IVtaOyG5c14j3RFRP+6TuchzxXvN+Kn5aQEnVpiFN/bsJ1MtV/WML9/SiGz0vIrdq1Oflry2cl7G99u467uciPeYbtaxdMyMs9tmWgcXdctyp3iuG6dfj8VLgW2ww4bam2Pv9R0xdM+GQRL+PubH4E+oCEjIflpVSH13HpfImE/JuENJBxZjfwnlV5kbkFDy3ZVUdaf+byVi46p8xSVXXtqVV9OoxNO3bsjA4G129224SQUoj3F4hXeasIF5KuqZKFvJyK1hcXceJgbXe/4ujesrlRKWmB0VCAVkLci60LabewHtPaf57lWDP6xupy7uLzl9SSlMNETFyvtNbpvS8fR153sm8tBRA6LK2oaZOwVScHrR0tMJv2TAtEmukMb9ZIpcaYsGJxmhAfF/JQNfEU48lyKdks1k1V2WpHn1zqUDs1SVFZq7mvhS1Kq5nTKaHmg6ZfSJrhJAm1FWJNKE0tU8LRE6rM3jvndTxRuUzsRstOeeHaKiYcJNVlzONpwcWE/ZaQSrg4T0KtfT9TQt6ppVfxwcQc321OnImymKbZxXFMWy/L0PM6JlSmoIRWT/SDpKrzSovnhDzOjGf929ky3QYW65C32nSd0Y7qMPbZTWm9n8exGhTderW1/suHlFB89aFueelHa4OnOh9oVGMNd318Z5oS0vBVmMmeo1vUgYUQE45Oxr+ReDrZOrK2aUZjfDNSoyi4V4NSkx0m17QpoV3ig/45zhdLKcqeO+2cGwMlVCw4d5qr1PR938T7kLOOxB5jHb5wPvTT1Of3aF01Nk2jXWuMyQl5S82Rr6gNrmpjampC6UhmooQNLdSKEvJTZIxhSkro7q9f1s+qLSuxtaWs06WUX3Wb3tXrmJBaYWqPqIfoqJ2xTnfptT7dkGmBU28hR3OO65QazbqsSrt6LDBjRm/qXBE0yq5NlTpMUduUcIjPwelmW+swo4TpM7alofmdPAcEc4fFjVLNWg0uzRnyrEjwQPdm+l9bY9dN2wG6bYF2OdUI/PhcdtOE938i3kueN50pFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXNh/mDxB0bZfCNkAAAAASUVORK5CYII=',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAACioqLT09PLy8vk5OS4uLhsbGzDw8OsrKzIyMgaGhrs7Ozh4eH19fVhYWGGhoaSkpJXV1epqamKiora2tqAgICfn5++vr7r6+s2NjZvb29fX19PT08kJCRISEgrKysMDAx3d3eYmJhBQUH84MVnAAACv0lEQVR4nO3a2XqqMBiGUXBGZRBx1mq193+NG8JgpSGGR1TMftdJISg/X4Ek0FoWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgPYbB1EU9N99FE+wWAbB0o0XVnas++7DeYJREmwcL3SMTtiz7ic8B/HJnr7suJqjnTDZbLuqXTn2pJo9avjAJfrOrbRkowlVXpBwVCoZXlsNSTguldyL1noJF6oC6oTrJrPIlRPWO4f9+ydCJAy8qdTGazSMlEi4j4JcR7TqJhyIhDNVAefuJ55MJByUW3UTDkXCL1WBdiR0yq2aCb3s0lbdiJ+dMLq5eeU+OuGm6J961QVEwmXflXpBR/NQwq04eBGxuoBytPjTATzBAwl3ybaTFSY/jpUF2pHwdyEvZq01EgZ2ui29VvdVBdqR8FxMS7NZSnFzVScUZ9AO4qW5WDpUFBAJt75UOH5arqvSnMayvrQSTsU9mF2c6ag4kU9P29GXFr41E67ST5yy1UO6GskKtCyhrXWVOpP0A9uiJcy+0vlboB0Jd/NOap61Knqa7jL/Dfi/WovGc/nWakdC/Xnp4HqK5zffWF833MZpR8Ia42EeIyy/nPF2+abbiYqT3qFeheYTldVNmA5voWwAcYey/kb9BOxL9tOw2nOauAedVb0inq625VN4J+GuqRzVaid0N8r9TctPUp+XsK65MuHwkV3reXrCtyuNFp67TlaMSzi8zKLg7B9OyUoy1zQu4Y3kvZLZCZPndaMTHs+WWQndaBa7XFYdZzDq5kO5SQnlqhIqx7arbFK+8Ic69q9449Zwwmx87Wl+vE0Jv41PqHnI2VUq6ael3vFX8qqEfS35q+zNQM8bAv4vfanR/23SDX0/TJ70jE1YMD+h83M8/ij/EwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwxz9p6yMKlq05agAAAABJRU5ErkJggg==',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2F8fJZ6DGDslIY8S2eewtqLaOtBjsWG0Fhw&usqp=CAU',
    'data:image/png;base64,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',
    'data:image/jpeg;base64,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',
  ]);

  const renderImage = ({item, index}) => {
    return (
      <Image
        source={{uri: item}}
        style={{width: 120, height: 120, borderRadius: 10, margin: 6}}
      />
    );
  };

  //갤러리에서 사진 선택
  const onLaunchImageLibrary = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: Platform.OS === 'android',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const ImgUri = response.assets[0].uri;
        setSelectedImg(ImgUri);
        if (selectedImg !== '') {
          setData(data => [...data, ImgUri]);
        }
      }
    });
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
