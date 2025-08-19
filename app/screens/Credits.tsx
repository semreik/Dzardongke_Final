import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text variant="titleMedium" style={styles.sectionTitle}>{title}</Text>
    <Divider style={styles.divider} />
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const Credits: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>Credits</Text>
        <Text variant="bodyMedium" style={styles.intro}>
          This app is a collaborative effort between Dzardzongkha speakers and researchers from the
          University of Cambridge and the EPHE-PSL in Paris. We would like to thank XX for their generous
          funding to develop the first prototype of the app. The app will be accompanied by an introductory
          textbook to learn the Dzardzongkha language.
        </Text>
      </View>

      <Section title="Dzardzongkha speakers and collaborators">
        <Text style={styles.item}>• Palgen Bista</Text>
        <Text style={styles.item}>• Tshewang Gurung</Text>
        <Text style={styles.item}>• Lhabon Takla</Text>
        <Text style={styles.item}>• Tenzin Thakuri</Text>
        <Text style={styles.item}>• Kemi Tsewang</Text>
        <Text style={styles.item}>• Tsewang Khyenga</Text>
        <Text style={styles.item}>• Gyaltsen Muktivilla</Text>
      </Section>

      <Section title="Illustrations">
        <Text style={styles.item}>• Hilaria Cruz</Text>
        <Text style={styles.item}>• Kids at the Lubrak hostel: XX, YY, ZZ (TBC)</Text>
      </Section>

      <Section title="Research team">
        <Text style={styles.item}>• Hannah Claus (University of Cambridge)</Text>
        <Text style={styles.item}>• Songbo Hu (University of Cambridge)</Text>
        <Text style={styles.item}>• Emre Isik (University of Cambridge)</Text>
        <Text style={styles.item}>• Anna Korhonen (University of Cambridge)</Text>
        <Text style={styles.item}>• Kitty Liu (University of Cambridge)</Text>
        <Text style={styles.item}>• Marieke Meelen (University of Cambridge)</Text>
        <Text style={styles.item}>• Charles Ramble (EPHE-PSL, Paris)</Text>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7fb',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontWeight: '700',
    marginBottom: 6,
  },
  intro: {
    textAlign: 'left',
    color: '#4b5563',
    lineHeight: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#111827',
  },
  divider: {
    marginVertical: 8,
  },
  sectionBody: {
    gap: 6,
  },
  item: {
    color: '#1f2937',
    fontSize: 16,
  },
});

export default Credits;


