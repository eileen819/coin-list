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
import { useMemo, useState } from "react";

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
  min-height: 100vh;
  font-size: 18px;
  text-align: center;
  display: block;
`;

const ErrorMessage = styled(Loader)``;

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
  line-height: 1.2;
`;

const MoreDescription = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  color: #9c88ff;
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

  const [expanded, setExpanded] = useState(false);

  const {
    isLoading: infoLoading,
    data: infoData,
    isError: infoError,
  } = useQuery<IInfoData>({
    queryKey: ["Info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });

  const {
    isLoading: tickersLoading,
    data: tickersData,
    isError: tickersError,
  } = useQuery<IPriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchTickersInfo(coinId),
  });

  const {
    isLoading: ohlcvLoading,
    data: ohlcvData,
    isError: ohlcvError,
  } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistorical(coinId),
  });

  const description = infoData?.description ?? "";
  const isLong = description?.length > 300;
  const showText = useMemo(() => {
    if (!description) return "";
    if (!expanded && isLong) {
      return description.slice(0, 300) + "...";
    }
    return description;
  }, [description, expanded, isLong]);

  const loading = infoLoading || tickersLoading;
  const fetchingError = infoError || tickersError || ohlcvError;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? `Coin List | ${state.name}`
            : loading
            ? "Loading"
            : `Coin List | ${infoData?.name}`}
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
      {fetchingError && (
        <ErrorMessage>
          ❗️ We couldn't load the data. Please try again later.
        </ErrorMessage>
      )}
      {loading && !fetchingError && <Loader>Loading...</Loader>}
      {!loading && !fetchingError && (
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
          <Description>
            {showText}
            {isLong && (
              <MoreDescription
                onClick={() => {
                  setExpanded((prev) => !prev);
                }}
              >
                {expanded ? "Close" : "More"}
              </MoreDescription>
            )}
          </Description>
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
