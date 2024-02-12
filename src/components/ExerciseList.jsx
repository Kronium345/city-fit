import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

const itemsPerPage = 10;

export default function ExerciseList({ data }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
    setCurrentPage(1);
  }, [data, searchTerm]);

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
  };

  const renderPaginationPicker = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <View style={tw`mt-3`}>
        <Text style={tw`text-neutral-700 text-lg mb-1`}>Page:</Text>
        <Picker
          selectedValue={currentPage}
          onValueChange={(value) => handlePaginationChange(value)}
          style={tw`w-full border border-neutral-500 rounded p-2`}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <Picker.Item key={index + 1} label={`Page ${index + 1}`} value={index + 1} />
          ))}
        </Picker>
      </View>
    );
  };

  const renderExerciseCard = ({ item, index }) => (
    <Animated.View style={tw`mb-4 mx-3 w-35`} entering={FadeInDown.duration(400).delay(index * 200).springify().damping(3)}>
      <TouchableOpacity onPress={() => router.push({ pathname: '/exerciseDetails', params: item })} style={tw`flex py-3 space-y-2`}>
        <View style={tw`bg-neutral-200 shadow rounded-2xl overflow-hidden`}>
          <Image source={{ uri: item.gifUrl }} style={tw`w-full h-48 aspect-ratio-3:4`} />
        </View>

        <Text style={tw`text-neutral-700 font-semibold ml-1 text-2xl`}>
          {item?.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={tw`flex-1 p-4`}>
      <TextInput
        placeholder="Search exercises..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={tw`border-b-2 border-neutral-500 p-2 mb-3`}
      />

      <FlatList
        data={filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        renderItem={renderExerciseCard}
      />

      {renderPaginationPicker()}

      <View style={tw`mt-4`}>
        <Text style={tw`text-neutral-700 text-lg`}>Stay motivated! Keep pushing towards your fitness goals!</Text>
      </View>
    </View>
  );
}
