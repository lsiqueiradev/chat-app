import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 ${(props) => props.theme.HORIZONTAL_BORDER}px 10px;
`;

export const HeadingText = styled.Text`
  color: ${(props) => props.theme.HEADING_COLOR};
  font-family: ${(props) => props.theme.FONT_FAMILY_SEMIBOLD};
  font-size: 40px;
  letter-spacing: -1px;
`;
