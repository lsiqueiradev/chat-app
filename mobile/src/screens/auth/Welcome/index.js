import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Backgorund from '~/components/Background';

import { Container, Title, SignInButton, SignUpButton } from './styles';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <Backgorund>
      <Container>
        <Title>Boas-vindas à Chat</Title>
        <SignInButton onPress={() => navigation.navigate('SignIn')}>
          Fazer login
        </SignInButton>
        <SignUpButton
          color="hsla(0,0%,100%,.15)"
          onPress={() => navigation.navigate('SignUp')}
        >
          Cadastrar-se
        </SignUpButton>
      </Container>
    </Backgorund>
  );
}
