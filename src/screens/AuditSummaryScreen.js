import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { storeData, getData } from '../utils/storage';
import ActionButton from '../components/ActionButton';
import colors from '../constants/colors';
import strings from '../constants/strings';

export default function AuditSummaryScreen({ route, navigation }) {
  const { audit } = route.params;

  useEffect(() => {
    const saveAudit = async () => {
      const prev = (await getData('auditList')) || [];
      await storeData('auditList', [...prev, audit]);
    };
    saveAudit();
  }, []);

  const navigateToNextPage = () => {
    navigation.navigate('AuditHistory');
  };

  return (
    <SafeAreaView style={styles.flexStyle}>

      <View style={styles.container}>
        <Text style={styles.heading}>{strings.audit_summary}</Text>
        <Text style={styles.textStyle}>{strings.rating}: {audit.rating}</Text>
        <Text style={styles.textStyle}>{strings.cleanlines}: {audit.checks?.cleanliness ? '✔' : '✘'}</Text>
        <Text style={styles.textStyle}>{strings.safety}: {audit.checks?.safety ? '✔' : '✘'}</Text>
        <Text style={styles.textStyle}>{strings.compliance}: {audit.checks?.compliance ? '✔' : '✘'}</Text>

        <Text style={styles.textStyle}>{strings.comments}: {audit.comments || '-'}</Text>
        <Text style={styles.textStyle}>{strings.time}: {new Date(audit.timestamp).toLocaleString()}</Text>

          <ActionButton
            title={'Back to History'}
            style={{
              backgroundColor: colors.blue,
              padding: 16,
              borderRadius: 8,
              marginTop : 24
            }}
            onPress={navigateToNextPage}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12
  },
  textStyle : {
    fontSize : 14,
    fontWeight : '500',
    padding : 4
  },
  flexStyle : {
    flex : 1
  }
});
