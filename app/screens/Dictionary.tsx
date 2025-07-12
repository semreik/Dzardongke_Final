import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text } from 'react-native';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import { DictEntryCard } from '../components/DictEntryCard';
import dictionary from '../../assets/dictionary/dzardzongke.dict.json';

const fuse = new Fuse(dictionary.entries, {
  keys: ['dz', 'en'],
  threshold: 0.4,
  includeScore: true,
});

export const Dictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(dictionary.entries);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (!text.trim()) {
        setResults(dictionary.entries);
        return;
      }
      const searchResults = fuse.search(text);
      setResults(searchResults.map(result => result.item));
    }, 150),
    [setResults]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type a word…"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      {searchQuery.trim() === '' ? (
        <Text style={styles.placeholder}>Type a word…</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => <DictEntryCard entry={item} />}
          keyExtractor={item => item.dz}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 8,
    elevation: 4,
  },
  list: {
    paddingVertical: 8,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
