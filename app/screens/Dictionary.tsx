import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import { DictEntryCard } from '../components/DictEntryCard';
import dictionary from '../../assets/dictionary/dzardzongke.dict.json';

const fuse = new Fuse(dictionary.entries, {
  keys: [
    { name: 'en', weight: 2 },  // Give more weight to English matches
    { name: 'dz', weight: 1 }
  ],
  threshold: 0.3,           // Lower threshold for stricter matching
  includeScore: true,
  ignoreLocation: true,     // Ignore location for better matching of phrases
  useExtendedSearch: true,  // Enable extended search for better phrase matching
  sortFn: (a, b) => {       // Custom sort function to prioritize exact matches
    // If both items have the same score, maintain original order
    if (a.score === b.score) return 0;
    
    // Lower score is better in Fuse.js
    return a.score < b.score ? -1 : 1;
  }
});

const Dictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(dictionary.entries);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (!text.trim()) {
        setResults(dictionary.entries);
        return;
      }
      
      // Improve search by looking for exact matches first
      const exactMatches = dictionary.entries.filter(entry => 
        entry.en.toLowerCase().includes(text.toLowerCase()) ||
        entry.dz.toLowerCase().includes(text.toLowerCase())
      );
      
      // If we have exact matches, prioritize them
      if (exactMatches.length > 0) {
        setResults(exactMatches);
        return;
      }
      
      // Otherwise use fuzzy search
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
        placeholder="Search in Dzongkha or English..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        autoCapitalize="none"
        icon="dictionary"
        iconColor="#2196F3"
      />
      {searchQuery.trim() === '' ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>Dzongkha Dictionary</Text>
          <Text style={styles.placeholder}>Type a word to search...</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.noResults}>No results found for "{searchQuery}"</Text>
          <Text style={styles.placeholder}>Try a different search term</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => <DictEntryCard entry={item} />}
          keyExtractor={(item, index) => `${item.dz}-${index}`}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 8,
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 56,
  },
  list: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 8,
    color: '#888',
    fontSize: 16,
  },
  noResults: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});

export default Dictionary;
