import { Stack } from "expo-router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import AuthContextProvider from "../providers/AuthContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const client = new QueryClient()

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <Stack>
            <Stack.Screen name="index" options={{ title: "Welcome" }} />
            <Stack.Screen name="Food" options={{ title: "Food" }} />
            <Stack.Screen
              name="RecipeDetails"
              options={{ title: "Recipe Details" }}
            />
            <Stack.Screen
              name="RecipeList"
              options={{ title: "Recipe List" }}
            />
            <Stack.Screen name="FitBot" options={{ title: "Fit Bot" }} />
          </Stack>
        </QueryClientProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  )
}
