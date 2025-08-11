import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '../stores/useLanguage';

const Onboarding: React.FC = () => {
  const { setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What language do you want to learn today?</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => setLanguage('dz')}>
          <Text style={styles.btnText}>Dzardzongkha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setLanguage('qu')}>
          <Text style={styles.btnText}>Quechua</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.hint}>You can change later by clearing app storage.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  button: { backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 18, borderRadius: 10, marginHorizontal: 6 },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 },
  hint: { marginTop: 14, textAlign: 'center', color: '#666' },
});

export default Onboarding;


