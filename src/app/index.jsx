import { StatusBar } from "expo-status-bar"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import ExerciseListItem from "../components/ExerciseListItem"
import { useInfiniteQuery } from "@tanstack/react-query"
import { gql } from "graphql-request"
import client from "../graphqlClient"
import { Redirect, Stack, useNavigation } from "expo-router"
import { useAuth } from "../providers/AuthContext"
import { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"
import tw from "twrnc"
import { FontAwesome5 } from "@expo/vector-icons"
import { FontAwesome6 } from "@expo/vector-icons"

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int) {
    exercises(muscle: $muscle, name: $name, offset: $offset) {
      name
      muscle
      equipment
    }
  }
`

export default function index() {
  const [search, setSearch] = useState("")
  const debouncedSearchTerm = useDebounce(search.trim(), 1000)
  const navigation = useNavigation()

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["exercises", debouncedSearchTerm],
      queryFn: ({ pageParam }) =>
        client.request(exercisesQuery, {
          offset: pageParam,
          name: debouncedSearchTerm,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => pages.length * 10,
    })

  const loadMore = () => {
    if (isFetchingNextPage) {
      return
    }

    fetchNextPage()
  }

  const { username } = useAuth()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch exercises.</Text>
  }

  if (!username) {
    return <Redirect href={"/Auth"} />
  }

  const exercises = data?.pages.flatMap((page) => page.exercises)

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("foodScreen")}
          style={[styles.navButton, styles.leftButton]}
        >
          <FontAwesome6 name="bowl-food" size={24} color="black" />
          <Text style={styles.navButtonText}>Recipe List</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("FitBot")}
          style={[
            styles.navButton,
            styles.rightButton,
            {
              backgroundColor: "tomato",
            },
          ]}
        >
          <FontAwesome5 name="robot" size={24} color="black" />
          <Text style={styles.navButtonText}>Fit Bot</Text>
        </TouchableOpacity>
      </View>

      {/* <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search...",
            onChangeText: (event) => setSearch(event.nativeEvent.text),
            hideWhenScrolling: false,
          },
        }}
      /> */}

      <FlatList
        data={exercises}
        keyExtractor={(item, index) => item.name + index}
        style={{ padding: 10 }}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
        contentInsetAdjustmentBehavior="automatic"
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  navButton: {
    flexDirection: "row", // Add flexDirection to align icon and text horizontally
    alignItems: "center",
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
  },
  leftButton: {
    marginRight: 5,
  },
  rightButton: {
    marginLeft: 5,
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5, // Add margin between icon and text
  },
})
