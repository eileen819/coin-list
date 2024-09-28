import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";
import { ICoin } from "../interface";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

// styled-components

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 20px;
`;

const CoinList = styled.ul``;

const Loader = styled.span`
  font-size: 18px;
  text-align: center;
  display: block;
`;

const Coin = styled.li<{ $isDark: boolean }>`
  background-color: ${(props) =>
    props.$isDark ? props.theme.textColor : "white"};
  color: ${(props) =>
    props.$isDark ? props.theme.bgColor : props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font-size: 18px;
    font-weight: 500;
    text-align: right;
    padding: 30px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// Home Components
function Home() {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin $isDark={isDark} key={coin.id}>
              <Link to={`/${coin.id}/price`} state={{ name: coin.name }}>
                <Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                  alt={coin.name}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Home;
