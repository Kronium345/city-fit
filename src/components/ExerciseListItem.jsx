import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';


const ExerciseListItem = ({item}) => {
  return (
    <Link href={`/${item.name}`} asChild>
        <Pressable style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseSubTitle}>
          <Text style={styles.subValue}>{item.muscle}</Text> | <Text style={styles.subValue}>{item.equipment}</Text>
        </Text>
      </Pressable>
    </Link>     

  )
}

export default ExerciseListItem;

const styles = StyleSheet.create({
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5
  },
  exerciseSubTitle: {
    color: "gray",
  },
  exerciseContainer: {
    backgroundColor: 'ghostwhite',
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  subValue: {
    textTransform: 'capitalize',
  }
});
