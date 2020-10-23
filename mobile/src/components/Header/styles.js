import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Normalize from '~/utils/Normalize';

export const ContainerStatusBar = styled.View`
  background-color: ${(props) => props.theme.HEADER_BACKGROUND};
  position: relative;
  z-index: 3;
  height: ${getStatusBarHeight(true)}px;
`;

export const Container = styled.View`
  z-index: 2;
  height: 45px;
  padding-right: ${(props) => props.theme.HORIZONTAL_BORDER}px;
  padding-left: ${(props) => props.theme.HORIZONTAL_BORDER}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.HEADER_BACKGROUND};
`;
export const AvatarContent = styled.View`
  width: 25%;
`;

export const Avatar = styled.TouchableOpacity`
  background: ${(props) => props.theme.HEADER_AVATAR_BACKGROUND};
  width: 38px;
  height: 38px;
  border-radius: 20px;
  padding: 2px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const TitleSide = styled.View`
  width: 50%;
  flex-direction: row;
  justify-content: center;
`;

export const Title = styled(Animated.Text)`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${(props) => props.theme.FONT_FAMILY_BOLD};
  font-size: ${Normalize(15)}px;
`;

export const RightSide = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 25%;
`;

export const Button = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const Shadow = styled(Animated.View)`
  position: absolute;
  top: ${(props) =>
    props.modal
      ? getStatusBarHeight(true) + 7 + 'px'
      : getStatusBarHeight(true) + 35 + 'px'};
  height: 10px;
  width: 100%;
  z-index: 1;
  background-color: ${(props) => props.theme.HEADER_BACKGROUND};
  box-shadow: 0px 10px 10px ${(props) => props.theme.HEADER_BOX_SHADOW};
`;

export const HeaderBackground = styled(Animated.View)`
  z-index: 2;
  height: 100%;
  background-color: ${(props) => props.theme.HEADER_BACKGROUND};
`;
