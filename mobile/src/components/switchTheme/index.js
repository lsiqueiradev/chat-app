import React, { useState } from 'react';

import { lightTheme, darkTheme } from '~/styles/theme';
import { useSelector, useDispatch } from 'react-redux';

import { Switch } from 'react-native';

import { changeTheme } from '~/store/modules/theme/actions';

export default function switchTheme() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const IsDark = useSelector((state) => state.theme.isDark);
  const [isDark, setIsDark] = useState(IsDark);

  function toggleSwitch() {
    dispatch(
      changeTheme(isDark ? lightTheme : darkTheme, isDark ? false : true)
    );
    setIsDark(!isDark);
  }

  return (
    <Switch
      trackColor={{
        false: theme.TAB_BOTTOM_COLOR_INACTIVE,
        true: theme.TAB_BOTTOM_COLOR_ACTIVE,
      }}
      thumbColor="#f4f3f4"
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isDark}
    />
  );
}
