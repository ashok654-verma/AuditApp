import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { removeData } from '../utils/storage';
import { RoleContext } from '../hooks/context/RoleContext';

export default function LogoutBtn({ label = 'Logout', style = {} }) {
  const navigation = useNavigation();
  const { setRole } = useContext(RoleContext);

  const handleLogout = async () => {
    await removeData('userRole');
    setRole(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={[styles.button, style]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#c00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
