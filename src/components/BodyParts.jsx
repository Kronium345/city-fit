import { View, Text, FlatList, Image } from 'react-native'
import React from 'react';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { bodyParts } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut, FadeInDown } from 'react-native-reanimated';




export default function BodyParts() {

    const router = useRouter();
  return (
    <View style={tw`mx-4`}>
      <Text style={tw`text-3xl font-semibold text-neutral-700`}>
        Exercises
      </Text>

      <FlatList data={bodyParts} numColumns={2} keyExtractor={item => item.name} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50, paddingTop: 20}} columnWrapperStyle={{
        justifyContent: 'space-between'
      }}
        renderItem={({item, index}) => <BodyPartCard router={router} index={index} item={item} />}
      />
    </View>
  )
}

const BodyPartCard = ({ item, router, index }) => {
    return (
        <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify().damping(3)}>
            <TouchableOpacity onPress={() => router.push({pathname: '/exercises', params: item})} style={tw`flex justify-end p-4 mb-4 w-44 h-52`}>
                <Image source={item.image} resizeMode='cover' style={tw`w-38 h-52 rounded-[35px] absolute`} />
                <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.9)']} style={tw`w-39 h-15 absolute bottom-0 rounded-b-[35px]`} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 1}} />
                <Text style={tw`text-2xl text-white font-semibold text-center tracking-wider`}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    )
}