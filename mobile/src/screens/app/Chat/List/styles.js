import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: `${(props) => props.theme.HORIZONTAL_BORDER}%`,
  },
})`
  flex: 1;
`;

// export const SignLinkText = styled.Text`
//   color: #fff;
//   font-weight: bold;
//   font-size: 16px;
// `;
// export const CardUser = styled.View`
//   margin-bottom: 15px;
//   padding-horizontal: 30px;
//   padding-vertical: 15px;
//   border-radius: 4px;
//   background: #fff;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;
// export const Left = styled.View`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;
// export const Info = styled.View`
//   margin-left: 25px;
// `;
// export const Avatar = styled.Image`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
// `;

// export const Name = styled.Text`
//   font-weight: bold;
//   font-size: 14px;
//   color: #333;
// `;
