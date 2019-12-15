import React from 'react';
import { Grid } from 'semantic-ui-react';

import Search from './Search';
import Records from './Records';

const Sidebar = () => (
  <Grid.Column id="sidebar" largeScreen={4}>
    <Search />
    <Records />
  </Grid.Column>
);
export default Sidebar;
