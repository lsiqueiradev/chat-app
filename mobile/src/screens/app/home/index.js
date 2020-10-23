import React, { useState, useEffect, useMemo } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../../../services/api';

import socketio from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import md5 from 'md5';

export default function RoomScreen() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'Nova conversa criada.',
      createdAt: new Date().getTime(),
      system: true,
    },
  ]);

  const socket = useMemo(() => {
    return socketio('http://192.168.1.10:3333', {
      query: { user_id: 1 },
    });
  }, []);

  async function sendMsg(newMessage) {
    api.defaults.headers.common['Token-Auth'] =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDA1NjkyNDAsImV4cCI6MTYzMjEwNTI0MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMSJ9.BHKCe0OJCZnn_LFCdv1AB0AA_IH4X3uHDamb7tE6tfo';
    try {
      const response = await api.post('chat/send/1', {
        text: newMessage[0].text,
      });
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
    // socket.emit('send', newMessage);
  }

  socket.on('response', (data) => console.log(data));

  // helper method that is sends a message
  function onReceived(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  function nameOK() {
    setId(md5(name));
  }

  if (id === '') {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={{
            width: '80%',
            height: 50,
            borderWidth: 1,
            borderBottomColor: '#000',
          }}
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity
          onPress={nameOK}
          style={{
            width: '80%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            backgroundColor: '#ff5643',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 22 }}>
            Escolher nome
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GiftedChat
      placeholder="Digite a mensagem"
      messages={messages}
      onSend={(newMessage) => sendMsg(newMessage)}
      user={{ _id: id, name: name }}
      showUserAvatar
      scrollToBottom
      infiniteScroll
    />
  );
}
