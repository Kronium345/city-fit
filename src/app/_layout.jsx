import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthContextProvider from "../providers/AuthContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const client = new QueryClient();

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthContextProvider>
                <QueryClientProvider client={client}>
                    <Stack>
                        <Stack.Screen name="index" options={{title: 'Welcome'}} />
                        <Stack.Screen name="foodScreen" options={{title: 'Food'}} />
                        <Stack.Screen name="recipeDetails" options={{title: 'Recipe Details'}} />
                        <Stack.Screen name="recipeList" options={{title: 'Recipe List'}} />
                        <Stack.Screen name="fitbot" options={{title: 'Fit Bot'}} />
                    </Stack>
                </QueryClientProvider>
            </AuthContextProvider>
        </GestureHandlerRootView>
    );
}