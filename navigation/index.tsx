import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text, TouchableOpacity, Image, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import NewChatScreen from '../screens/NewChatScreen';
import { useNavigation } from '@react-navigation/native'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Chat" component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="chevron-back" size={30} color='#34B7F1' onPress={() => navigation.goBack()} />
              <Image source={{ uri: route.params.image }} style={{ width: 40, height: 40, borderRadius: 30, marginLeft: 20 }} />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Ionicons name="videocam-outline" size={26} color='#34B7F1' style={{ marginRight: 20 }} />
              <Feather name="phone" size={24} color='#34B7F1' />
            </View>
          )
        })}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="NewChat" component={NewChatScreen}
          options={{
            headerTitle: 'Yeni Sohbet',
            headerRight: () => (
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Text style={{ color: '#34B7F1' }}>Vazgeç</Text>
              </TouchableOpacity>
            )
          }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Status"
        component={TabTwoScreen}
        options={{
          title: 'Durum',
          tabBarIcon: ({ color }) => <Ionicons name="sync-circle-outline" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Calls"
        component={TabTwoScreen}
        options={{
          title: 'Aramalar',
          tabBarIcon: ({ color }) => <Feather name="phone" size={26} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={TabTwoScreen}
        options={{
          title: 'Kamera',
          tabBarIcon: ({ color }) => <Ionicons name="camera-outline" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chats"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Chats'>) => ({
          title: "Sohbetler",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={30} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('NewChat')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="pencil-square-o"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          headerLeft: () => (
            <Text style={{ color: '#34B7F1', marginLeft: 15, fontSize: 16, fontWeight: '500' }}>Düzenle</Text>
          ),
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          }
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabTwoScreen}
        options={{
          title: 'Ayarlar',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={28} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

