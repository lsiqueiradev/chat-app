import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHeaderHeight } from '@react-navigation/stack';

import { Platform } from 'react-native';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  RecoveryButton,
  RecoveryButtonText,
} from './styles';

export default function SignIn({ navigation }) {
  const headerHeight = useHeaderHeight();
  const headerMore = Platform.OS === 'android' ? 50 : 30;
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container
        behavior="padding"
        keyboardVerticalOffset={headerHeight + headerMore}
      >
        <Form>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            secureTextEntry
            placeholder="Digite sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <RecoveryButton
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RecoveryAccess')}
          >
            <RecoveryButtonText>
              Problemas para efeturar login?
            </RecoveryButtonText>
          </RecoveryButton>

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Fazer login
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
