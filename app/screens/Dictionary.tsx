import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
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
      <Searchbar
        placeholder="Search words..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={results}
        renderItem={({ item }) => <DictEntryCard entry={item} />}
        keyExtractor={item => item.dz}
        contentContainerStyle={styles.list}
      />
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
});
