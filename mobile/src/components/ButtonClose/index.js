import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

export default function ButtonClose() {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.goBack()}>
      <Icon name="close-outline" color="#ffffff" size={36} />
    </Container>
  );
}
