import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const Credits: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>Credits</Text>
        <Text style={styles.intro}>
          This app is a collaborative effort between Dzardzongke speakers and researchers from the University of Cambridge and the EPHE-PSL in Paris. The app will be accompanied by an introductory textbook to learn the Dzardzongke language, which was inspired by
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dzardzongke Speakers</Text>
          <Text style={styles.compactText}>
            Palgen Bista • Tshewang Gurung • Lhabon Takla • Tenzin Thakuri • Kemi Tsewang • Tsewang Khyenga • Gyaltsen Muktivilla
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Illustrations</Text>
          <Text style={styles.compactText}>
            Hilaria Cruz • Kids at Lubrak hostel
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Research Team</Text>
          <Text style={styles.compactText}>
            Hannah Claus • Songbo Hu • Emre Isik • Anna Korhonen • Kitty Liu • Marieke Meelen (Cambridge) • Charles Ramble (EPHE-PSL)
          </Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7fb',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  intro: {
    textAlign: 'center',
    color: '#4b5563',
    lineHeight: 18,
    fontSize: 13,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  compactText: {
    color: '#1f2937',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default Credits;


