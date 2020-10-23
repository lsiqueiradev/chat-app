import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

import formatedDateRelative from '~/utils/formatedDateRelative';

import {
  Button,
  CardItem,
  LeftSide,
  RightSide,
  Avatar,
  Info,
  Name,
  Message,
  Date,
} from './styles';

import { getRequest } from '~/store/modules/chat/list';

export default function Chats({ chatsList }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profile = useSelector((state) => state.user.profile);

  async function getChat(item) {
    navigation.push('ChatDetails', {
      chatId: item.id,
      destinatario:
        item.user_receiver.id === profile.id
          ? item.user_sender
          : item.user_receiver,
    });
    refresh();
  }

  async function refresh() {
    // dispatch(reset());
    dispatch(getRequest({ page: 1 }));
  }

  return (
    <>
      {chatsList.map((item, index) => (
        <Button key={index} onPress={() => getChat(item)}>
          <CardItem>
            <LeftSide>
              <Avatar
                source={{
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8ZHCtIBN_exnJIBqPw5JJHpIgtf4nVFFCdw&usqp=CAU', //item.photo_url,
                }}
              />
              <Info>
                <Name>
                  {item.users_receiver.id === profile.id
                    ? item.users_sender.name
                    : item.users_receiver.name}
                </Name>
                <Message numberOfLines={2} ellipsizeMode="tail">
                  {item.last_message}
                </Message>
              </Info>
            </LeftSide>
            <RightSide>
              <Date>{formatedDateRelative(item.updatedAt)}</Date>
            </RightSide>
          </CardItem>
        </Button>
      ))}
    </>
  );
}
