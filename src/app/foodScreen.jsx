import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FoodScreen() {
    const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: 'center' }}>
      <Image source={require('../../assets/images/welcome1.png')} />
      <Text style={{ color: "#f96163", fontSize: 22, fontWeight: "bold" }}>
        Great Foods for Gains in the Gym
      </Text>

      <Text style={{ fontSize: 42, fontWeight: "bold", color: "#3c444c", marginTop: 44, marginBottom: 40 }}>
        Cook Like a Pro!
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("recipeList")} style={{ backgroundColor: "#f96163", borderRadius: 18, paddingVertical: 18, width: "80%", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "white", fontWeight: 500 }}>Let's Go</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
