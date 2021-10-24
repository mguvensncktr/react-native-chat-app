import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native'
import { RootTabScreenProps } from '../types';
import ChatList from '../components/ChatList';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Chats'>) {
  return (
    <View style={styles.container}>
      <ChatList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
