import styled from 'styled-components/native';

import Normalize from '~/utils/Normalize';

export const Container = styled.View`
  height: 52px;
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;
  padding: 0 15px;
  height: 100%;
  font-size: ${Normalize(14)}px;
  color: #fff;
`;
