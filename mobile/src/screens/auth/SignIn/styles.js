import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Normalize from '~/utils/Normalize';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px ${(props) => props.theme.HORIZONTAL_BORDER}px 0;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-top: 15px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const RecoveryButton = styled.TouchableOpacity``;

export const RecoveryButtonText = styled.Text`
  color: #ffffff;
  font-size: ${Normalize(13)}px;
  font-family: ${(props) => props.theme.FONT_FAMILY_REGULAR};
  margin-top: 25px;
  margin-bottom: 10px;
`;
