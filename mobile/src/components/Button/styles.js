import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Normalize from '~/utils/Normalize';

export const Container = styled(RectButton)`
  height: 46px;
  background: ${(props) => (props.color ? props.color : '#E61220')};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: ${Normalize(12)}px;
`;
