import { Redirect, Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useAuth } from '../providers/AuthContext';
import { useRouter } from 'expo-router';

const AuthScreen = () => {
    const router = useRouter();
    const [localUsername, setLocalUsername] = useState('');
    const { setUsername, username } = useAuth();
    const onSignIn = () => {
        setUsername(localUsername);
    }

    if(username){
        return <Redirect href={'/'} />;
    }

    return (
        <View style={styles.page}>
            <Image
                source={require('../../assets/images/logo.png')} // replace 'logo.png' with your actual logo file
                style={styles.logo}
            />
            <Text style={styles.title}>CityFit 💪: Your Ultimate Fitness Companion</Text>
            <Text style={styles.introduction}>
                "Welcome to CityFit 💪, your ultimate fitness companion tailored for our university community! Get personalized workout plans, nutrition guidance, and join a vibrant student community to crush your fitness goals!"            
            </Text>
            <Stack.Screen options={{ title: 'Welcome', headerTitleAlign: 'center' }} />
            <Text style={styles.label}>Enter your name:</Text>
            <TextInput 
                value={localUsername} 
                onChangeText={setLocalUsername} 
                placeholder='Name' 
                style={styles.input} 
            />
            <Button title='Sign In' onPress={onSignIn} />
        </View>
    );
}

export default AuthScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center horizontally
        padding: 10,
        gap: 10,
        backgroundColor: '#D3D3D3'
    },
    logo: {
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    introduction: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontWeight: '600',
        fontSize: 20,
        color: 'gray'
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '40%'
    },
});
