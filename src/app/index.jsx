import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ExerciseListItem from '../components/ExerciseListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../graphqlClient';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthContext';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int){
    exercises(muscle: $muscle, name: $name, offset: $offset){
        name
        muscle
        equipment
    }
  }
`

export default function ExerciseTrackerHome() {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search.trim(), 1000);

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['exercises', debouncedSearchTerm],
    queryFn: ({ pageParam }) => client.request(exercisesQuery, {offset: pageParam, name: debouncedSearchTerm }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length * 10
  });

  const loadMore = () => {
    if(isFetchingNextPage){
      return;
    }
  
    fetchNextPage();
  }

    const {username} = useAuth();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if(error) {
    return <Text>Failed to fetch exercises.</Text>
  }

  if(!username) {
    return <Redirect href={'/auth'} />
  }

  const exercises = data?.pages.flatMap(page => page.exercises);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerSearchBarOptions: {
        placeholder: "Search...",
        onChangeText: (event) => setSearch(event.nativeEvent.text),
        hideWhenScrolling: false
      }}} />
      <FlatList data={exercises} keyExtractor={(item, index) => item.name + index} style={{ padding: 10 }} contentContainerStyle={{gap: 10}} renderItem={({item}) => <ExerciseListItem item={item} />
      }
      onEndReachedThreshold={1} 
      onEndReached={loadMore}
      contentInsetAdjustmentBehavior='automatic'
       />
      {/* <Button title='Load More' onPress={fetchNextPage} /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    justifyContent: 'center',
  },
  subValue: {
    textTransform: 'capitalize',
  },
  container: {
    padding: 20,
    gap: 10
  },
  instructions: {
    fontSize: 16,
    lineHeight: 25
  },
  panel: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  seeMore: {
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
    color: "gray"
  }
});
