import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Dashboard: undefined;
  TreasureHunts: undefined;
  TreasureHuntDetails: {id: number; from?: 'my-hunts' | 'all-hunts'};
  EditMap: undefined;
  ARScan: {stageId: number};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
