import * as React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import Normalize from '~/utils/Normalize';

import ButtonClose from '~/components/ButtonClose';

import Welcome from '~/screens/auth/Welcome';
import SignIn from '~/screens/auth/SignIn';
import SignUp from '~/screens/auth/SignUp';
import RecoveryAccess from '~/screens/auth/RecoveryAccess';

const AppStack = createStackNavigator();

export default function AppRoutes() {
  const themeColor = useSelector((state) => state.theme.theme);

  const options = {
    headerBackTitleVisible: false,
    headerRightContainerStyle: {
      paddingRight:
        themeColor.HORIZONTAL_BORDER - themeColor.HORIZONTAL_BORDER / 2,
    },
    headerLeftContainerStyle: {
      paddingLeft:
        themeColor.HORIZONTAL_BORDER - themeColor.HORIZONTAL_BORDER / 2,
    },
    headerTitleStyle: {
      color: themeColor.PRIMARY_TEXT_COLOR,
      fontFamily: themeColor.FONT_FAMILY_BOLD,
      fontWeight: '600',
      fontSize: Normalize(15),
    },
    headerTintColor: themeColor.HEADER_COLOR_TEXT,
    headerStyle: {
      height: 56,
      borderBottomWidth: 0.2,
      borderBottomColor: '#333333',
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
      backgroundColor: themeColor.HEADER_BACKGROUND,
    },
  };

  return (
    <AppStack.Navigator
      initialRouteName="Welcome"
      screenOptions={({ route, navigation }) => ({
        animationEnabled: true,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        cardShadowEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined,
        ...TransitionPresets.ModalPresentationIOS,
        mode: 'modal',
      })}
      mode="modal"
    >
      <AppStack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          ...options,
          headerLeft: false,
          headerRight: () => <ButtonClose />,
          title: 'Fazer login',
        }}
      />
      <AppStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          ...options,
          headerLeft: false,
          headerRight: () => <ButtonClose />,
          title: 'Cadastrar-se',
        }}
      />
      <AppStack.Screen
        name="RecoveryAccess"
        component={RecoveryAccess}
        options={{
          ...options,
          headerLeft: false,
          headerRight: () => <ButtonClose />,

          title: 'Recuperar Acesso',
        }}
      />
    </AppStack.Navigator>
  );
}
