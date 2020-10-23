import { all } from 'redux-saga/effects';

import theme from './theme/sagas';
import auth from './auth/sagas';
import user from './user/sagas';
import chat from './chat/sagas';

export default function* rootSaga() {
  return yield all([auth, user, theme, chat]);
}
