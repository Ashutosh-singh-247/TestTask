import ConditionArea from "./UI/Molecules/ConditionArea";

import styled from "styled-components";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  return (
    <ContainerWrapper>
      <ConditionArea />
    </ContainerWrapper>
  );
}

export default App;
