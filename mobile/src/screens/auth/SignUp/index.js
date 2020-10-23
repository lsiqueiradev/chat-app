import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signUpRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => nameRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            secureTextEntry
            placeholder="Digite seu nome"
            ref={nameRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={name}
            onChangeText={setName}
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

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
