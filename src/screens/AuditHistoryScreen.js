import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../utils/storage';
import { RoleContext } from '../hooks/context/RoleContext';
import LogoutButton from '../components/LogoutBtn';
import ActionButton from '../components/ActionButton';
import colors from '../constants/colors';
import strings from '../constants/strings';

export default function AuditHistoryScreen() {
  const [audits, setAudits] = useState([]);
  const { role } = useContext(RoleContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const data = await getData('auditList');
      setAudits(data || []);

    };
    load();
  }, [isFocused]);

  const deleteAudit = async (index) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this audit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = audits.filter((_, i) => i !== index);
          await storeData('auditList', updated);
          setAudits(updated);
        },
      },
    ]);
  };

  const navigateToPolicyManualScreen = () => {
    navigation.navigate('PolicyViewer')
  }

  const onCreateNewAudit = () => {
    navigation.navigate('AuditForm')
  }
  const AuditItem = ({ item, index }) => (
    <View style={[styles.card, styles.elevationStyle]}>
      <Text style={styles.textStyle}>{strings.rating}: {item.rating}</Text>
      <Text style={styles.textStyle}>{strings.comments}: {item.comments || '-'}</Text>
      <Text style={styles.textStyle}>{strings.date}: {new Date(item.timestamp).toLocaleString()}</Text>
      {role === 'Admin' && (
        <TouchableOpacity onPress={() => { deleteAudit(index) }} style={styles.deleteBtn}>
          <Text style={styles.deleteTxt}>{strings.delete_audit}</Text>
        </TouchableOpacity>

      )}
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>{strings.audit_history}</Text>
        <LogoutButton />
      </View>

      {audits.length == 0 ? <Text style={styles.noAuditStyle}>{strings.no_audit_found}</Text> : <FlatList
        data={audits}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => <AuditItem item={item} index={index} />}
      />
      }

      {role === 'Auditor' && (
        <ActionButton
          title="New Audit"
          onPress={onCreateNewAudit}
          backgroundColor={colors.blue}
          style={{ marginTop: 40, padding: 12, borderRadius: 8 }}
          textStyle={{ fontSize: 16, fontWeight: '600', color: '#fffacd' }}
        />
      )}

        <ActionButton
          title="View Policy"
          onPress={navigateToPolicyManualScreen}
          backgroundColor={colors.blue}
          style={{marginTop :8, padding: 12}}
          textStyle={{ fontSize: 16, color: colors.white }}
        />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : Platform.OS === 'android' ? 40 : 0
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold'
   },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width : '94%',
    alignSelf:'center'
  },
  card: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: colors.white,
    width: '94%',
    alignSelf: 'center'
  },
  noAuditStyle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 24,
    marginBottom:12
  },
  elevationStyle: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteBtn: {
    backgroundColor: colors.red,
    alignSelf: 'flex-end',
    marginVertical: 16,
    padding: 12,
    borderRadius: 8
  },
    textStyle : {
    fontSize : 14,
    fontWeight : '500',
    padding : 4
  },
  deleteTxt : {
     color: colors.white, 
     alignSelf: 'center' , 
     fontWeight:'500'
  }
});

