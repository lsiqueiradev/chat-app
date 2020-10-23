import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector } from 'react-redux';

import {
  ContainerStatusBar,
  Container,
  AvatarContent,
  Avatar,
  Image,
  RightSide,
  Button,
  TitleSide,
  Title,
  Shadow,
} from './styles';

export default function Header({ scroll, title }) {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme.theme);

  const opacity = scroll.interpolate({
    inputRange: [46, 55],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const shadowOpacity = scroll.interpolate({
    inputRange: [40, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  return (
    <>
      <ContainerStatusBar />
      <Container>
        <AvatarContent>
          <Avatar
            onPress={() =>
              navigation.navigate('AccountNavigator', {
                screen: 'Account',
                initial: true,
              })
            }
          >
            <Image
              source={{
                uri:
                  'https://avatars2.githubusercontent.com/u/33165370?s=60&v=4',
              }}
              resizeMode="contain"
            />
          </Avatar>
        </AvatarContent>

        <TitleSide>
          <Title
            style={{
              opacity: opacity,
            }}
          >
            {title}
          </Title>
        </TitleSide>

        <RightSide>
          <Button
            onPress={() =>
              navigation.navigate('NotificationNavigator', {
                screen: 'Notification',
              })
            }
          >
            <Icon
              name="create-outline"
              size={26}
              color={theme.HEADER_ICON_COLOR}
            />
          </Button>
        </RightSide>
      </Container>
      <Shadow style={{ opacity: shadowOpacity }} />
    </>
  );
}
