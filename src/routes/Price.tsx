import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Converter from "../components/Converter";
import { IOutletContext } from "../interface";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div<{ $isDark: boolean }>`
  margin: 20px 0px;
  border-radius: 15px;
  background-color: ${(props) =>
    props.$isDark ? "rgba(0, 0, 0, 0.5)" : "white"};
  padding: 20px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.accentColor};
`;
const Overview = styled.div`
  padding: 10px 20px 20px 20px;
`;
const OverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

function Price() {
  const isDark = useRecoilValue(isDarkAtom);
  const {
    ohlcvLoading,
    ohlcvData = [],
    coinName,
    coinPrice,
  } = useOutletContext<IOutletContext>();

  const hasData = ohlcvData && ohlcvData.length > 0;

  const todaySec = hasData
    ? ohlcvData[ohlcvData.length - 1]?.time_open * 1000
    : null;
  const day = todaySec ? new Date(todaySec).getDate() : "N/A";
  const month = todaySec ? new Date(todaySec).getMonth() + 1 : "N/A";
  const year = todaySec ? new Date(todaySec).getFullYear() : "N/A";

  return (
    <>
      {ohlcvLoading ? (
        "Price Loading..."
      ) : !hasData ? (
        <div>No data available</div>
      ) : (
        <>
          <Converter coinName={coinName} coinPrice={coinPrice} />
          <Container $isDark={isDark}>
            <Title>
              <span>{`${year} / ${month} / ${day} Today's Price`}</span>
            </Title>
            <Overview>
              <OverviewItem>
                <span>High Price</span>
                <span>
                  US ${" "}
                  {parseFloat(
                    parseFloat(ohlcvData[ohlcvData.length - 1]?.high).toFixed(6)
                  ).toLocaleString()}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>Low Price</span>
                <span>
                  US ${" "}
                  {parseFloat(
                    parseFloat(ohlcvData[ohlcvData.length - 1]?.low).toFixed(6)
                  ).toLocaleString()}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>Opening Price</span>
                <span>
                  US ${" "}
                  {parseFloat(
                    parseFloat(ohlcvData[ohlcvData.length - 1]?.open).toFixed(6)
                  ).toLocaleString()}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>Closing Price</span>
                <span>
                  US ${" "}
                  {parseFloat(
                    parseFloat(ohlcvData[ohlcvData.length - 1]?.close).toFixed(
                      6
                    )
                  ).toLocaleString()}
                </span>
              </OverviewItem>
            </Overview>
          </Container>
        </>
      )}
    </>
  );
}

export default Price;
