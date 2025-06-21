import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RoleContext } from '../hooks/context/RoleContext';
import { storeData } from '../utils/storage';
import colors from '../constants/colors';
import strings from '../constants/strings';

export default function LoginScreen({ navigation }) {
  const { setRole } = useContext(RoleContext);

  const handleSelectRole = async (selectedRole) => {
    await storeData('userRole', selectedRole);
    setRole(selectedRole);
    navigation.replace('AuditHistory');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.select_your_role}</Text>
      {['Admin', 'Auditor', 'Viewer'].map((role) => (
        <TouchableOpacity
          key={role}
          style={styles.roleButton}
          onPress={() => handleSelectRole(role)}
        >
          <Text style={styles.buttonText}>{role}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30
  },
  roleButton: {
    backgroundColor: colors.blue,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
});
