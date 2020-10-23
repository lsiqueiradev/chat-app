/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useMemo } from 'react';
import { View, Alert } from 'react-native';
// import { withNavigationFocus } from 'react-navigation/native';
import socketio from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';
import api from '~/services/api';
import { getRequest, reset } from '~/store/modules/chat/details';
import { MessageContainer } from './styles';
import {
  getRequest as getResquestList,
  reset as resetList,
} from '~/store/modules/chat/list';

function ChatDetails({ route }) {
  const { chatId } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  // const [destinatario, setDestinatario] = useState(route.params.destinatario);
  const {
    messagesList,
    messagesLoading,
    messagesPage,
    messagesTotal,
  } = useSelector((state) => state.chat);

  const profile = useSelector((state) => state.user.profile);
  const socket = useMemo(() => {
    return socketio('https://chatlsm.herokuapp.com', {
      query: { user_id: profile.id },
    });
  }, [profile]);

  useEffect(() => {
    async function getMessages() {
      dispatch(getRequest({ page: 1, id: chatId }));
    }
    getMessages();
  }, []);

  useEffect(() => {
    if (!messagesLoading) {
      setLoading(false);
      setFirstLoading(false);
    }
  }, [messagesLoading]);

  const onEndReached = () => {
    if (
      !firstLoading &&
      !messagesLoading &&
      !loading &&
      messagesPage * 20 < messagesTotal
    ) {
      setLoading(true);
      dispatch(
        getRequest({
          page: messagesPage + 1,
          id: chatId,
          nextPage: true,
        })
      );
    }
    return true;
  };
  const refresh = () => {
    dispatch(reset());
    dispatch(getRequest({ page: 1, id: chatId }));
    // GiftedChat.append([], messagesList);
  };

  useEffect(() => {
    socket.on('response', () => {
      dispatch(getRequest({ page: 1, id: chatId }));
    });
  }, [socket]);

  async function onSend(messages) {
    try {
      await api.post(`chat/send/${chatId}`, {
        text: messages[0].text,
      });
      dispatch(getRequest({ page: 1, id: chatId }));
      dispatch(resetList());
      dispatch(getResquestList({ page: 1 }));
    } catch (e) {
      Alert.alert('', 'Erro no envio da mensagem');
    }
  }
  return (
    <Background>
      <View style={{ flex: 1 }}>
        {!firstLoading && (
          <GiftedChat
            // renderUsernameOnMessage
            // showAvatarForEveryMessage
            messages={messagesList}
            keyboardShouldPersistTaps="never"
            listViewProps={{
              scrollEventThrottle: 400,
              onScroll: ({ nativeEvent }) => {
                const {
                  layoutMeasurement,
                  contentOffset,
                  contentSize,
                } = nativeEvent;
                const paddingToTop = 80;
                const tamanhoDaTela =
                  contentSize.height - layoutMeasurement.height - paddingToTop;
                const ondeEuTo = contentOffset.y;
                if (tamanhoDaTela <= ondeEuTo) {
                  onEndReached();
                }
              },
            }}
            onSend={(messages) => onSend(messages)}
            user={{ _id: profile.id }}
          />
        )}
      </View>
    </Background>
  );
}
// ChatDetails.navigationOptions = {
//   title: 'aaaaa',
// };
export default ChatDetails;
