import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';

import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import Bar from '../components/Bar';

const DragBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 22px;
  background-color: #ecf0f5;
  -webkit-app-region: drag;
  z-index: 1;
`;

const GridContainer = styled(Grid)`
  display: flex;
  height: 100vh;
  margin: 0 !important;
  margin-top: 22px !important;

  & #sidebar {
    border-top: solid 1px #c9c9c9;

    height: calc(100% - 64px - 22px);
    padding: 0;
    background-color: #fff;
    border-right: solid 1px #c9c9c9;
    overflow: hidden;
  }

  & #main {
    height: calc(100% - 64px - 22px);
    padding-top: 0;
    background-color: #ecf0f5;
    overflow: auto;
  }
`;

const App = () => (
  <>
    <DragBar />
    <GridContainer>
      <Sidebar />
      <Main />
      <Bar />
      <SemanticToastContainer />
    </GridContainer>
  </>
);
export default App;
