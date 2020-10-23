import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChatList from '~/screens/app/Chat/List';
import ChatDetails from '~/screens/app/Chat/ChatDetails';

const AppStack = createStackNavigator();

export default function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="ChatList">
      <AppStack.Screen
        name="ChatList"
        options={{ headerShown: false }}
        component={ChatList}
      />
      <AppStack.Screen name="ChatDetails" component={ChatDetails} />
    </AppStack.Navigator>
  );
}
