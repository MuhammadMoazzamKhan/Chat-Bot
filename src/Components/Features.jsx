import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Features = () => {
  return (
    <View style={{height:hp(60)}} className='my-3 space-y-2'>
      <Text style={{fontSize:wp(5.5)}} className='text-gray-700 font-semibold'>Features</Text>
      <View className='bg-emerald-200 space-y-2 p-4 rounded-xl'>
        <View className='flex-row space-x-2 items-center'>
        <Image style={{width:wp(10),height:hp(6)}} source={require('../images/chatgptIcon.png')} />
        <Text style={{fontSize:wp(5)}} className='text-gray-700 font-semibold'>ChatGPT</Text>
        </View>
        <Text style={{fontSize:wp(3.4)}} className='text-gray-700 font-medium'>Open AI. It is an artificial intelligence (AI) chatbot technology that can process our natural human language and generate a response.</Text>
      </View>
      <View className='bg-purple-200 space-y-2 p-4 rounded-xl'>
        <View className='flex-row space-x-2 items-center'>
        <Image style={{width:wp(8),height:hp(5)}} source={require('../images/dalleIcon.png')} />
        <Text style={{fontSize:wp(5)}} className='text-gray-700 font-semibold'>DALL-E</Text>
        </View>
        <Text style={{fontSize:wp(3.4)}} className='text-gray-700 font-medium'>DALL-E is a generative AI model developed by OpenAI, designed to generate images from text description prompts.</Text>
      </View>
      <View className='bg-cyan-200 space-y-2 p-4 rounded-xl'>
        <View className='flex-row space-x-2 items-center'>
        <Image style={{width:wp(8),height:hp(5)}} source={require('../images/smartaiIcon.png')} />
        <Text style={{fontSize:wp(5)}} className='text-gray-700 font-semibold'>ChatGPT</Text>
        </View>
        <Text style={{fontSize:wp(3.4)}} className='text-gray-700 font-medium'>A powerful voice assistant with the abilities of ChatGPT and DALL-E, providing you the best of both worlds.</Text>
      </View>
    </View>
  )
}

export default Features