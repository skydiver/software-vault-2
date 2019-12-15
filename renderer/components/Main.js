import React from 'react';
import { Grid } from 'semantic-ui-react';

import Form from './Form';

const Main = () => (
  <Grid.Column id="main" largeScreen={12}>
    <Form />
  </Grid.Column>
);
export default Main;
