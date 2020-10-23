import produce from 'immer';

// eslint-disable-next-line no-unused-vars
import { base, darkTheme, lightTheme } from '../../../styles/theme';

const INITIAL_STATE = {
  theme: { ...base, ...darkTheme },
  isDark: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@theme/CHANGE_THEME': {
        draft.theme = { ...state.theme, ...action.payload.theme };
        draft.isDark = action.payload.isDark;
        break;
      }
      default:
    }
  });
}
