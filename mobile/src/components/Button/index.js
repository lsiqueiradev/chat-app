import React from 'react';

import { Container, Text } from './styles';

import Loader from '~/components/Loader';

export default function Button({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? <Loader /> : <Text>{children}</Text>}
    </Container>
  );
}
