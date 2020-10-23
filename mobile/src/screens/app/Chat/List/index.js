import React, { useMemo, useState, useEffect } from 'react';

import { Animated, ActivityIndicator } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import Background from '~/components/Background';
import socketio from 'socket.io-client';
import Header from '~/components/Header';
import Heading from '~/components/Heading';
import ChatList from '~/components/ChatList';

import { List } from './styles';

import { getRequest } from '~/store/modules/chat/list';

export default function Home() {
  const scroll = new Animated.Value(0);
  const dispatch = useDispatch();
  const [refreshing] = useState(false);
  const [loading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const { chatsList, chatsLoading, chatsPage, chatsTotal } = useSelector(
    (state) => state.chat
  );

  const { data, indices } = useMemo(() => {
    const items = [
      {
        key: 'PAGE_HEADING',
        render: () => <Heading>Conversas</Heading>,
      },
      {
        key: 'CHAT_LIST',
        render: () => <ChatList chatsList={chatsList} />,
      },
    ];

    // const indices = [];

    // items.forEach((item, index) => item.isTitle && indices.push(index));

    return {
      data: items,
      indices,
    };
  }, [chatsList]);

  const profile = useSelector((state) => state.user.profile);
  const socket = useMemo(() => {
    return socketio('https://chatlsm.herokuapp.com', {
      query: { user_id: profile.id },
    });
  }, [profile]);

  useEffect(() => {
    async function getChats() {
      dispatch(getRequest({ page: 1 }));
    }
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chatsLoading) {
      // setLoading(false);
      setFirstLoading(false);
    }
  }, [chatsLoading]);

  const onEndReached = () => {
    if (
      !firstLoading &&
      !chatsLoading &&
      !loading &&
      chatsPage * 10 < chatsTotal
    ) {
      // setLoading(true);
      dispatch(getRequest({ page: chatsPage + 1, nextPage: true }));
    }
    return true;
  };

  useEffect(() => {
    socket.on('response', () => {
      refresh();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  async function refresh() {
    // dispatch(reset());
    dispatch(getRequest({ page: 1 }));
  }

  function renderLoading() {
    return (
      <Background
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <ActivityIndicator size="large" color="#6646ee" />
      </Background>
    );
  }

  return (
    <Background>
      <Header scroll={scroll} title="Conversas" />
      <List
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scroll } },
            },
          ],
          { useNativeDriver: false }
        )}
        data={data}
        renderItem={({ item }) => item.render()}
        keyExtractor={(item) => item.key}
        renderLoading={renderLoading}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={() => refresh()}
      />
    </Background>
  );
}
