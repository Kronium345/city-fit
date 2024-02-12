import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react';
import tw from 'twrnc';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Loading(props) {
  return (
    <View style={tw`flex-1 flex justify-center items-center`}>
      <ActivityIndicator {...props} />
    </View>
  )
}