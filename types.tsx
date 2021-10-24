import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NewChat: undefined;
  NotFound: undefined;
  Chat: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Chats: undefined;
  Settings: undefined;
  Status: undefined;
  Calls: undefined;
  Camera: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ChatRoom = {
  id: string,
  users: User[],
  lastMessage: Message,
};

export type Message = {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}

export type User = {
  id: string;
  imageUri: string;
  name: string;
  status: string;
}

