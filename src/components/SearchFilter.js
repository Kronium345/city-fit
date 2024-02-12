import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SearchFilter({ icon, placeholder, onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical: 16,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
      }}
    >
      <FontAwesome name={icon} size={20} color="#f96163" />
      <TextInput
        style={{ paddingLeft: 8, fontSize: 16, color: '#808080' }}
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
}
