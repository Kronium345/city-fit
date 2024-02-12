import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import fitness from '../data/fitness';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';


const FitnessCards = () => {

    const FitnessData = fitness;
    const router = useRouter();
    const navigation = useNavigation();
  return (
    <View>
        {FitnessData.map((item, key) => (
            <Pressable onPress={() => router.push('workoutScreen', {
                image:item.image,
                exercises: item.exercises,
                id: item.id
            })}
             style={{ alignItems: "center", justifyContent: "center", margin: 10}} key={key}>
                <Image style={{ width: "95%", height: 140, borderRadius: 7}} source={{uri: item.image}} />
                <Text style={{ position: "absolute", color: "white", fontSize: 16, fontWeight: "bold", left: 20, top: 20}}>{item.name}</Text>
                <MaterialCommunityIcons style={{ position: "absolute", color: "white", bottom: 15, left: 20}} name="lightning-bolt" size={24} color="black" />
            </Pressable>
        ))}
    </View>
  )
}

export default FitnessCards

const styles = StyleSheet.create({})

// onPress={() => navigation.navigate("Workout", {
//     image:item.image,
//     exercises: item.exercises,
//     id: item.id
// })}