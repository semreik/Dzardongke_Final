import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface DictEntry {
  dz: string;
  en: string;
  example?: string;
  exampleEn?: string;
}

interface Props {
  entry: DictEntry;
}

export const DictEntryCard: React.FC<Props> = ({ entry }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.dzText}>
            {entry.dz}
          </Text>
          <Text variant="titleMedium" style={styles.enText}>
            {entry.en}
          </Text>
        </View>
        {entry.example && (
          <View style={styles.example}>
            <Text variant="bodyMedium" style={styles.dzExample}>
              {entry.example}
            </Text>
            {entry.exampleEn && (
              <Text variant="bodySmall" style={styles.enExample}>
                {entry.exampleEn}
              </Text>
            )}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 8,
  },
  dzText: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  enText: {
    color: '#34495e',
  },
  example: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  dzExample: {
    color: '#2c3e50',
    marginBottom: 4,
  },
  enExample: {
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
});
