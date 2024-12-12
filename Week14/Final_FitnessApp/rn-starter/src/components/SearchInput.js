import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { searchboxApi } from '../api/mapboxApi';

const SearchInput = ({ placeholder, value, onChangeText, location }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (searchText) => {
    if (!location) {
      console.error('Current location not set');
      return;
    }

    if (!searchText) {
      console.error('Search text is empty');
      return;
    }

    try {
      const { latitude, longitude } = location;
      const response = await searchboxApi(searchText, latitude, longitude);
      setSuggestions(response.data.features.map(feature => ({
        id: feature.id,
        name: feature.place_name,
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          fetchSuggestions(text);
        }}
        style={styles.input}
      />
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            onChangeText(item.name);
            setSuggestions([]);
          }}>
            <Text style={styles.suggestionItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {!value && <Text style={styles.errorText}>Please enter a search term.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  errorText: {
    marginTop: 10,
    color: 'red',
  },
});

export default SearchInput;
