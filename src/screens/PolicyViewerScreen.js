import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PolicyViewerScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.goBack() }}
        style={styles.backBtn}>
        <Image style={styles.imgStyle}
          source={require('../assets/images/back.png')} />
      </TouchableOpacity>
      <WebView
        source={{ uri: 'https://example.com/audit-policy.pdf' }}
        style={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    paddingTop : Platform.OS == 'android' ? 40 : 0
   },
  backBtn: {
    width: 30,
    height: 30,
    padding: 4,
    justifyContent: 'center',
    marginBottom: 12,
    marginStart: 12
  },
  imgStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    alignSelf: 'center'
  }
});
