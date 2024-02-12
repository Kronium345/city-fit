import { Redirect, Stack } from 'expo-router'
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { useAuth } from '../providers/AuthContext';
import tw from 'twrnc';
import { useRouter } from 'expo-router';


const AuthScreen = () => {

    const router = useRouter();
    const [localUsername, setLocalUsername] = useState('');
    const { setUsername, username } = useAuth()
    const onSignIn = () => {
        setUsername(localUsername);
    }

    if(username){
        return <Redirect href={'/'} />;
    }

  return (
    <View style={styles.page}>
        <Stack.Screen options={{ title: 'Sign In' }} />
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput value={localUsername} onChangeText={setLocalUsername} placeholder='Name' style={styles.input} />
      <Button title='Sign In' onPress={onSignIn} />
      <TouchableOpacity onPress={() => router.push('foodScreen')} style={tw`h-15 w-80 mt-10 bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200`}>
                <Text style={tw`text-white font-bold tracking-widest text-3xl`}>
                    Recipe List
                </Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('fitbot')} style={tw`h-15 w-80 mt-10 bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200`}>
                <Text style={tw`text-white font-bold tracking-widest text-3xl`}>
                    Chat with FitBot
                </Text>
        </TouchableOpacity>

    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        gap: 10,
        backgroundColor: 'white'
    },
    label: {
        fontWeight: '600',
        fontSize: 20,
        color: 'gray'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        borderRadius: 5 
    },
})