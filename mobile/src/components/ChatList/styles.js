import styled from 'styled-components/native';

import Normalize from '~/utils/Normalize';

import { RectButton } from 'react-native-gesture-handler';

export const Button = styled(RectButton)`
  margin-bottom: 15px;
  padding: 0 ${(props) => props.theme.HORIZONTAL_BORDER}px;
`;

export const CardItem = styled.View`
  padding: 8px 0;
  flex-direction: row;
  justify-content: space-between;
`;
export const LeftSide = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const RightSide = styled.View`
  flex-direction: row;
`;

export const Info = styled.View`
  margin-left: 15px;
  flex: 1;
  padding-right: 20px;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const Name = styled.Text`
  font-size: ${Normalize(14)}px;
  color: #fff;
  font-family: ${(props) => props.theme.FONT_FAMILY_SEMIBOLD};
`;

export const Message = styled.Text`
  margin-top: 4px;
  font-size: ${Normalize(10)}px;
  color: #fff;
  font-family: ${(props) => props.theme.FONT_FAMILY_REGULAR};
`;

export const Date = styled.Text`
  font-size: ${Normalize(10)}px;
  color: #fff;
  font-family: ${(props) => props.theme.FONT_FAMILY_REGULAR};
`;
