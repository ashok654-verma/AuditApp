import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PolicyViewerScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://example.com/audit-policy.pdf' }} 
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
