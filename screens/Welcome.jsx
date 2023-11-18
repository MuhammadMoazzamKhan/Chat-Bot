import { View, Text ,SafeAreaView , Image,TouchableOpacity} from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className='flex-1 bg-white justify-around' >
      <View className='space-y-1'>
        <Text style={{fontSize:wp(10)}} className='text-center text-gray-700 font-bold'>Void AI</Text>
        <Text style={{fontSize:wp(4)}}  className='text-center text-gray-600 tracking-wider font-semibold'>The future is here, powered by AI.</Text>
      </View>
      <View className='flex-row justify-center'>
      <Image source={require('../src/images/welcome.png')} style={{width:wp(57),height:hp(43)}} />
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} className='p-4 mx-5 bg-emerald-600 rounded-2xl'>
        <Text style={{fontSize:wp(6)}}  className='text-center font-bold text-white'>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Welcome