import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistorical, fetchCoinInfo, fetchTickersInfo } from "../api";
import { Helmet } from "react-helmet-async";
import {
  IHistorical,
  IInfoData,
  ILocationState,
  IParams,
  IPriceData,
} from "../interface";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

// styled-components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  text-align: center;
  margin-bottom: 20px;
`;

const Loader = styled.span`
  font-size: 18px;
  text-align: center;
  display: block;
`;

const Overview = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.$isDark ? "rgba(0, 0, 0, 0.5)" : "white"};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  font-weight: 300;
  margin: 20px 0px;
  padding: 0px 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean; $isDark: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  background-color: ${(props) =>
    props.$isDark ? "rgba(0, 0, 0, 0.5)" : "white"};
  border-radius: 10px;
  padding: 7px 0px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

// Coin Component

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams() as IParams;
  const { state } = useLocation() as ILocationState;
  const priceMatch = useMatch("/:coinIn/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>({
    queryKey: ["Info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });

  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    {
      queryKey: ["tickers", coinId],
      queryFn: () => fetchTickersInfo(coinId),
    }
  );

  const { isLoading: ohlcvLoading, data: ohlcvData } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistorical(coinId),
  });

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "loading" : infoData?.name}
        </title>
        <link
          rel="icon"
          type="image/png"
          href={`https://static.coinpaprika.com/coin/${coinId}/logo.png`}
          sizes="16x16"
        />
      </Helmet>
      <Title>
        {state?.name ? state.name : loading ? "loading" : infoData?.name}
      </Title>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview $isDark={isDark}>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>
                ${" "}
                {Number(
                  tickersData?.quotes.USD.price.toFixed(3)
                ).toLocaleString()}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview $isDark={isDark}>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply.toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply:</span>
              <span>{tickersData?.max_supply.toLocaleString()}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isDark={isDark} $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab $isDark={isDark} $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Outlet
            context={{
              coinId,
              coinName: infoData?.symbol,
              coinPrice: tickersData?.quotes.USD.price,
              ohlcvLoading,
              ohlcvData,
            }}
          />
        </>
      )}
    </Container>
  );
}

export default Coin;
