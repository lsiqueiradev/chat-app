import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'template',
      storage: AsyncStorage,
      whitelist: ['theme', 'auth', 'user', 'chat'],
    },
    reducers
  );

  return persistedReducer;
};
