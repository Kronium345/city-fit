import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react';
import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import graphqlClient from '../graphqlClient';
import { useAuth } from '../providers/AuthContext';


const NewSetInput = ({ exerciseName }) => {
    const [reps, setReps] = useState();
    const [weight, setWeight] = useState('');
    const {username} = useAuth();
    const queryClient = useQueryClient();
    
    const mutationDocument = gql`
    mutation MyMutation($newSet: NewSet!) {
      insertSet(
        document: $newSet,
        dataSource: "Cluster5",
        database: "cityfit",
        collection: "sets"
        
      ) {
        insertedId
      }
    }
    `

    const { mutate, error, isError, isPending } = useMutation({
      mutationFn: (newSet) => graphqlClient.request(mutationDocument, { newSet }),
      onSuccess: () => {
        setReps('');
        setWeight('');
        queryClient.invalidateQueries({ queryKey: ['sets', exerciseName] })
      }
    })

    const addSet = () => {
        const newSet = {
          username,
          exercise: exerciseName,
          reps: Number.parseInt(reps),
        }
        if(Number.parseFloat(weight)) {
          newSet.weight = Number.parseFloat(weight);
        }
        mutate(newSet)

        
    }

    console.log(error);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput value={reps} onChangeText={setReps} keyboardType='numeric' placeholder='Reps' style={styles.input} />
        <TextInput value={weight} onChangeText={setWeight} keyboardType='numeric' placeholder='Weight (kg)' style={styles.input} />
          <Button title={isPending ? 'Adding...' : 'Add'} onPress={addSet} />
      </View>
      {isError && <Text style={{ color: 'red' }}>Failed to add set</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        // flexDirection: 'row',
        gap: 5
    },
    row: {
      flexDirection: 'row',
      gap: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        flex: 1,
        borderRadius: 5 
    }
})

export default NewSetInput