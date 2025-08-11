import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '../stores/useLanguage';

const Settings: React.FC = () => {
  const { selectedLanguage, setLanguage, resetLanguageChoice } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.label}>Current language</Text>
      <Text style={styles.value}>{selectedLanguage === 'dz' ? 'Dzardzongkha' : 'Quechua'}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => setLanguage('dz')}>
          <Text style={styles.btnText}>Switch to Dzardzongkha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setLanguage('qu')}>
          <Text style={styles.btnText}>Switch to Quechua</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={resetLanguageChoice}>
        <Text style={styles.btnText}>Reset and show language picker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 16, marginBottom: 16 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 },
  secondary: { backgroundColor: '#6b7280' },
  btnText: { color: 'white', fontWeight: '600' },
});

export default Settings;


