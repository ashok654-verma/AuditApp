import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import AuditFormScreen from '../screens/AuditFormScreen';
import AuditSummaryScreen from '../screens/AuditSummaryScreen';
import AuditHistoryScreen from '../screens/AuditHistoryScreen';
import PolicyViewerScreen from '../screens/PolicyViewerScreen';
import { RoleContext } from '../hooks/context/RoleContext';
import { getData } from '../utils/storage';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { setRole } = useContext(RoleContext);
  const [initialScreen, setInitialScreen] = useState(null);

  useEffect(() => {
    getData('userRole').then((role) => {
      if (role) setRole(role);
      setInitialScreen(role ? 'AuditHistory' : 'Login');
    });
  }, []);

  if (!initialScreen) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName={initialScreen}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AuditForm" component={AuditFormScreen} />
        <Stack.Screen name="AuditSummary" component={AuditSummaryScreen} />
        <Stack.Screen name="AuditHistory" component={AuditHistoryScreen} />
        <Stack.Screen name="PolicyViewer" component={PolicyViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
