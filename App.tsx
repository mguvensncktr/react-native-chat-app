import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify from 'aws-amplify';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './src/aws-exports';
Amplify.configure(config)

const randomImages = [
  'https://www.merlininkazani.com/images/games/12350/108680_640.jpg',
  'https://m.media-amazon.com/images/I/41GUmNbdwML._AC_SY780_.jpg',
  'https://i.pinimg.com/736x/87/b0/0c/87b00cba1ba84d90b319fa10409472cc.jpg',
  'https://www.4ugk.com/wp-content/uploads/2021/06/O1CN015g31Uo1L1VPWzzCZc_62061239.jpg',
  'https://nobleorderbrewing.com/img/lists/97/boruto-5-ways-sasuke-losing-his-rinnegan-makes-sense.jpg',
  'https://i.pinimg.com/originals/ba/97/15/ba9715d30380d5053317d0294275311e.jpg'
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (userInfo) {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        if (userData.data.getUser) {
          console.log("Kullanıcı mevcut")
          return;
        }
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hello there, i am using WhatsApp!',
        }
        await API.graphql(graphqlOperation(createUser, { input: newUser }))
      }
    }
    fetchUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);