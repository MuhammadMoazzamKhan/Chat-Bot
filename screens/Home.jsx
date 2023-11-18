import { View, Text, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState, useRef } from 'react'
import Features from '../src/Components/Features';
import { dummyMessages } from '../src/Constants';
import RenderItem from '../src/Components/RenderItem';
import Voice from '@react-native-voice/voice';
import { apiCall } from '../src/API/openAI';
import Tts from 'react-native-tts';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const scrollRef = useRef();

  const speechStart = e => {
    console.log("Spech Start handler");
  }


  const speechEnd = e => {
    setRecording(false);
    setResult('')
    console.log("Spech End handler");
  }

  const speechResults = e => {
    setResult(e.value[0]);
  }

  const speechError = e => {
    setResult('')
    console.log('Voice Error', e);
  }

  useEffect(() => {
    // Voice Reacroding Listeners
    Voice.onSpeechStart = speechStart;
    Voice.onSpeechEnd = speechEnd;
    Voice.onSpeechResults = speechResults;
    Voice.onSpeechError = speechError;

    // Text To Spect Listeners
    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])



  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start('es_US');
    } catch (error) {
      console.log(error);
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      fetchResponse();
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  }
  const fetchResponse = () => {
    if (result.trim().length > 0) {
      const newMessages = [...messages];
      newMessages.push({ role: 'user', content: result.trim() });
      setMessages([...newMessages]);
      updateScrollView();
      setLoading(true)
      apiCall(result.trim(), newMessages).then(res => {
        setLoading(false)
        if (res.success) {
          setMessages([...res.data]);
          updateScrollView();
          textToSpeech(res.data[res.data.length-1])
          setResult('');
        } else {
          Alert.alert('Error', res);
        }
      })
    }
  }

  const textToSpeech = message => {
    if (!message.content.includes('https')) {
      // console.log(true , message.content)
      Tts.speak(message.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  }
  const updateScrollView = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({ animated: false });
    }, 200);
  }

  const stopSpeaking = () => {
    setSpeaking(false);
  }
  const clear = () => {
    setMessages([]);
  }

  return (
    <View className='flex-1 bg-white'>
      <SafeAreaView className='mx-5 flex-1 mt-3'>
        <View className='flex-row justify-center' >
          <Image source={require('../src/images/bot.png')} style={{ width: wp(20), height: hp(15) }} />
        </View>
        {messages.length > 0 ? (
          <View className='flex-1 space-y-2'>
            <Text style={{ fontSize: wp(5) }} className='text-gray-700 font-bold'>Assistant</Text>
            <View style={{ height: hp(58) }} className='bg-neutral-100 rounded-3xl p-4'>
              <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <FlatList
                  contentContainerStyle={{ gap: 5 }}
                  data={messages}
                  renderItem={({ item }) => <RenderItem item={item} />}
                  keyExtractor={(item, index) => index}
                />
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}

        <View className='justify-center items-center'>
          {loading ? (<TouchableOpacity className='mt-2' onPress={stopRecording} activeOpacity={0.7}>
            <Image
              source={require('../src/images/loading.gif')}
              style={{ width: wp(18), height: hp(13) }}
              className='rounded-full'
              resizeMode='contain'
            />
          </TouchableOpacity>) :
            recording ? (
              <TouchableOpacity className='mt-2' onPress={stopRecording} activeOpacity={0.7}>
                {/* Recording Stop Button */}
                <Image
                  source={require('../src/images/voiceLoading.gif')}
                  style={{ width: wp(18), height: hp(13) }}
                  className='rounded-full'
                  resizeMode='contain'
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className='mt-2' onPress={startRecording} activeOpacity={0.7}>
                {/* Recording Start Button */}
                <Image
                  source={require('../src/images/recordingIcon.png')}
                  className='rounded-full'
                  resizeMode='contain'
                  style={{ width: wp(18), height: hp(13) }}
                />
              </TouchableOpacity>
            )}
          {messages.length > 0 && (
            <TouchableOpacity onPress={clear} className='absolute bg-neutral-400 p-2 right-10 rounded-3xl'>
              <Text className='font-semibold text-white'>Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity onPress={stopSpeaking} className='absolute bg-red-400 p-2 left-10 rounded-3xl'>
              <Text className='font-semibold text-white'>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Home