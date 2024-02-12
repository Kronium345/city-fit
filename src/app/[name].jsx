import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import NewSetInput from "../components/NewSetInput";
import SetsList from "../components/SetsList";
import ProgressGraph from "../components/ProgressGraph";

export default function ExerciseTracker() {
  const exerciseQuery = gql`
    query exercises($name: String) {
      exercises(name: $name) {
        name
        muscle
        instructions
        equipment
      }
    }
  `;

  const { name } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", name],
    queryFn: () => graphqlClient.request(exerciseQuery, { name }),
  });

  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to retrieve the data.</Text>;
  }

  const exercise = data.exercises[0];

  if (!exercise) {
    return <Text>Exercise not found</Text>;
  }

  const handleLinkClick = () => {
    Linking.openURL("https://danielawolowo-gym.netlify.app/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <SetsList
        exerciseName={exercise.name}
        ListHeaderComponent={() => (
          <View style={{ gap: 5 }}>
            <View style={styles.panel}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseSubTitle}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
                <Text style={styles.subValue}>{exercise.equipment}</Text>
              </Text>
            </View>

            <View style={styles.panel}>
              <Text
                numberOfLines={isInstructionsExpanded ? 0 : 3}
                style={styles.instructions}
              >
                {exercise.instructions}
              </Text>
              <Text
                onPress={() =>
                  setIsInstructionsExpanded(!isInstructionsExpanded)
                }
                style={styles.seeMore}
              >
                {isInstructionsExpanded ? "See less" : "See more"}
              </Text>
                <Text style={styles.link} onPress={handleLinkClick}>
                    Click here to see this in detail!
                </Text>
            </View>

            <NewSetInput exerciseName={exercise.name} />
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  exerciseSubTitle: {
    color: "gray",
  },
  exerciseContainer: {
    backgroundColor: "ghostwhite",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  subValue: {
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 25,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  seeMore: {
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
    color: "gray",
  },
  linkTitle: {
    marginBottom: 10,
    marginRight: 10
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
    textAlign: 'center',
  },
});
