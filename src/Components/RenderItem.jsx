import { View, Text ,Image} from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RenderItem = ({ item }) => {

    return (
        <View>
            {
                item.role === 'assistant' ?
                    item.content.includes('https') ? (
                        <View className='flex-row justify-start'>
                            <View className='bg-emerald-100 rounded-xl p-2 rounded-tl-none'>
                                <Image source={{uri:item.content}} resizeMode='cover'className='rounded-2xl' style={{ width: wp(60), height:hp(30)}}  />
                            </View>
                            </View>
                            ) : (
                            <View className='flex-row justify-start'>
                                <View style={{ width: wp(70) }} className='bg-emerald-100 rounded-xl p-2 rounded-tl-none'>
                                    <Text style={{ fontSize: wp(3.6) }} className='text-gray-700 font-semibold'>{item.content}</Text>
                                </View>
                            </View>
                            ) : (
                            <View className='flex-row justify-end'>
                                <View style={{ width: wp(70) }} className='bg-white rounded-xl p-2 rounded-tr-none'>
                                    <Text style={{ fontSize: wp(3.6) }} className='text-gray-700 font-semibold'>{item.content}</Text>
                                </View>
                            </View>
                    )}
                        </View>
                    )
}

            export default RenderItem