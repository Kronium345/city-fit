import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query';
import graphqlClient from '../graphqlClient';
import { useAuth } from '../providers/AuthContext';
import SetListItem from './SetListItem';
import ProgressGraph from './ProgressGraph';

const SetsList = ({ ListHeaderComponent, exerciseName }) => {

    const setsQuery = gql`
    query sets($exercise: String!, $username: String!){
      sets(exercise:$exercise, username: $username){
          documents{
              _id
              exercise
              reps
              weight
          }
      }
  }
    `

    const {username} = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['sets', exerciseName],
        queryFn: () => graphqlClient.request(setsQuery, {exercise: exerciseName, username})
    });

    if(isLoading) {
        return <ActivityIndicator />
    }

  return (
    <View>
      <FlatList ListHeaderComponent={() => (
      <>
        <ListHeaderComponent />
        <ProgressGraph sets={data.sets.documents} />
      </>
      )} showsVerticalScrollIndicator={false} data={data.sets.documents} renderItem={({item}) => 
        <SetListItem set={item} />  
      } 
    />
    </View>
  )
}

export default SetsList