import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

// styled-components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 1040px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

// Interface

interface ILocationState {
  state: {
    name: string;
  };
}

// Coin Component

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as ILocationState;
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
    </Container>
  );
}

export default Coin;
