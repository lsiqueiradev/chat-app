import styled from 'styled-components/native';

import Normalize from '~/utils/Normalize';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 ${(props) => props.theme.HORIZONTAL_BORDER}px;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.FONT_FAMILY_BOLD};
  font-size: ${Normalize(26)}px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 30px;
`;

export const SignInButton = styled(Button)``;

export const SignUpButton = styled(Button)`
  margin-top: 15px;
  margin-bottom: 60px;
`;
