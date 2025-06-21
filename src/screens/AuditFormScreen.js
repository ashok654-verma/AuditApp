import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { RoleContext } from '../hooks/context/RoleContext';
import RatingComponent from '../components/RatingComponent';
import colors from '../constants/colors';
import strings from '../constants/strings';
import FormNextBtn from '../components/FormNextBtn';

export default function AuditFormScreen({ navigation }) {
  const { role } = useContext(RoleContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rating: '',
    checks: {
      cleanliness: false,
      safety: false,
      compliance: false,
    },
    comments: '',
  });
  const isReadOnly = role !== 'Auditor';
 
  const goNext = () => {
    if (step === 1 && !formData.rating) {
      Alert.alert('Validation', 'Please select a rating before continuing.');
      return;
    }
    if (
      step === 2 &&
      !Object.values(formData.checks).some((v) => v === true)
    ) {
      Alert.alert('Validation', 'Select at least one audit check.');
      return;
    }

    if (
      step === 3 &&
      (!formData.comments || formData.comments.trim().length === 0)
    ) {
      Alert.alert('Validation', 'Please enter a comment before submitting.');
      return;
    }

    setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    if (!formData.rating) {
      Alert.alert('Validation', 'Please provide a rating before submitting.');
      return;
    }

    if (!formData.comments || formData.comments.trim().length === 0) {
      Alert.alert('Validation', 'Comments are required before submitting.');
      return;
    }

    const audit = { ...formData, timestamp: new Date().toISOString() };
    navigation.navigate('AuditSummary', { audit });
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <RatingComponent
              value={formData.rating}
              onChange={(val) => setFormData({ ...formData, rating: val })}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.label}>{strings.select_completed_checks}</Text>
            {Object.entries(formData.checks).map(([key, val]) => (
              <View key={key} style={styles.checkRow}>
                <Text style={styles.checkLabel}>{key}</Text>
                <Switch
                  value={val}
                  trackColor={{ false: '#ccc', true: colors.blue }}
                  thumbColor={val ? colors.white : colors.darkGrey}
                  disabled={isReadOnly}
                  onValueChange={(newVal) =>
                    setFormData((prev) => ({
                      ...prev,
                      checks: { ...prev.checks, [key]: newVal },
                    }))
                  }
                />
              </View>
            ))}
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.label}>{strings.additional_comments}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              editable={!isReadOnly}
              numberOfLines={4}
              value={formData.comments}
              onChangeText={(text) =>
                setFormData({ ...formData, comments: text })}
              placeholder="Write any remarks here..."
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.stepTitle}>{strings.step} {step} of 3</Text>
        {renderStepContent()}

        <View style={styles.navButtons}>
          {step > 1 && (
            <FormNextBtn label={strings.back} onPress={goBack} />
          )}
          {step < 3 ? (
            <FormNextBtn label={strings.next} onPress={goNext} />
          ) : null}

          {step === 3 && !isReadOnly && (
            <FormNextBtn
              label={strings.submit}
              onPress={handleSubmit}
              isSubmit
            />)}

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingHorizontal: 16,
    backgroundColor: colors.white,

  },
  stepTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1, 
    padding: 10,
    borderRadius: 6, marginBottom: 20, borderColor: '#aaa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkLabel: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '500'
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 20
  },
  notice: { marginTop: 20, color: '#888', fontStyle: 'italic', textAlign: 'center' },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
