import React from 'react';

import { useSelector } from 'react-redux';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
