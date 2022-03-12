import styled from '@emotion/styled'
import Board from './components/Board';


const Wrapper = styled.div`
  display: flex;
`;


function App() {

  // 현재 상태

  return (
    <Wrapper>
      <Board />
    </Wrapper>
  );
}

export default App;
