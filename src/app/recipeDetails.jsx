import { View, Text, Image, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';

export default function recipeDetails() {

    const route = useRoute();
    const {item} = route.params;
    console.log(item);
    const navigation = useNavigation();
  return (
    <ScrollView style={{backgroundColor: item.color, flex: 1}} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flexDirection: "row", marginHorizontal: 16}}>
            <Pressable onPress={() => navigation.goBack()} style={{flex: 1}}>
                <FontAwesome name={"arrow-circle-left"} size={28} color="white" style={{ marginTop: 38, marginHorizontal: 18}} />
            </Pressable>
            <FontAwesome name={"heart-o"} size={28} color="white" style={{ marginTop: 38, marginHorizontal: 18 }} />
        </SafeAreaView>
      <View style={{ backgroundColor: "white", flex: 1, marginTop: 240, borderTopLeftRadius: 56, borderTopRightRadius: 56, alignItems: "center", paddingHorizontal: 16}}>
        <View style={{ height: 300, width: 300, position: "absolute", top: -150}}>
            <Image source={item.image} style={{width: "100%", height: "100%", resizeMode: "contain"}} />
        </View>

        <Text style={{marginTop: 160, fontSize: 28, fontWeight: "bold"}}>{item.name}</Text>

        <Text style={{fontSize: 20, marginVertical: 16}}>{item.description}</Text>

        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
            <View style={{backgroundColor: "rgba(255, 0, 0, 0.38)", paddingVertical: 26, borderRadius: 8, alignItems: "center", width: 100}}>
                <Text style={{fontSize: 40}}>⏰</Text>
                <Text style={{fontSize: 20, fontWeight: 400}}>{item.time}</Text>
            </View>
            <View style={{backgroundColor: "rgba(135, 206, 235, 0.8)", paddingVertical: 26, borderRadius: 8, alignItems: "center", width: 100}}>
                <Text style={{fontSize: 40}}>🥣</Text>
                <Text style={{fontSize: 20, fontWeight: 400}}>{item.difficulty}</Text>
            </View>
            <View style={{backgroundColor: "rgba(255, 165, 0, 0.48)", paddingVertical: 26, borderRadius: 8, alignItems: "center", width: 100}}>
                <Text style={{fontSize: 40}}>🔥</Text>
                <Text style={{fontSize: 20, fontWeight: 400}}>{item.calories}</Text>
            </View>
        </View>

        <View style={{alignSelf: "flex-start", marginVertical: 22}}>
            <Text style={{fontSize: 22, fontWeight: "600", marginBottom: 6}}>Ingredients:</Text>
            {
                item.ingredients.map((ingredient, index) => {
                    return (
                    <View style={{flexDirection: "row", alignItems: "center", marginVertical: 3}} key={index}>
                        <View style={{backgroundColor: "black", height: 10, width: 10, borderRadius: 5}}>

                        </View>
                        <Text style={{fontSize: 18, marginLeft: 6}}>{ingredient}</Text>
                    </View>
                    );
                })
            
            }
        </View>

        <View style={{alignSelf: "flex-start", marginVertical: 22}}>
            <Text style={{fontSize: 22, fontWeight: "600", marginBottom: 6}}>Steps:</Text>
            {
                item.steps.map((step, index) => {
                    return (
      
                        <Text key={index} style={{fontSize: 18, marginLeft: 6, marginVertical: 6}}>{`${index+1} ) ${step}`}</Text>
                    );
                })
            
            }
        </View>
      </View>
    </ScrollView>
  )
}