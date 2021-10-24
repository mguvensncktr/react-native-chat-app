import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import UserList from '../components/UserList';
import { View } from '../components/Themed';


export default function NewChatScreen() {

  return (
    <View>
      <UserList />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({

});
