import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { IOutletContext } from "../interface";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

const Wrapper = styled.div<{ $isDark: boolean }>`
  padding: 20px;
  background-color: ${(props) =>
    props.$isDark ? "rgba(0, 0, 0, 0.5)" : "white"};
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 18px;
  margin: 0px 10px;
`;

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { ohlcvLoading, ohlcvData } = useOutletContext<IOutletContext>();
  const isValidData = Array.isArray(ohlcvData) && ohlcvData.length > 0;

  const parseOhlcvData = () => {
    if (!Array.isArray(ohlcvData)) {
      console.error("ohlcvData is not an array:", ohlcvData);
      return [];
    }

    return (
      ohlcvData?.map((price) => ({
        close: parseFloat(price?.close) || 0,
        time_close: price?.time_close * 1000 || 0,
        open: parseFloat(price?.open) || 0,
        high: parseFloat(price?.high) || 0,
        low: parseFloat(price?.low) || 0,
      })) ?? []
    );
  };

  const parsedData = parseOhlcvData();

  return (
    <div>
      {ohlcvLoading ? (
        "Loading..."
      ) : !isValidData ? (
        // 데이터가 없거나 유효하지 않을 때 표시할 내용
        <div>No data available</div>
      ) : (
        <>
          <Wrapper $isDark={isDark}>
            <Title>Line Chart</Title>
            <ApexChart
              type="line"
              series={[
                {
                  name: "Price",
                  data: parsedData?.map((price) => price?.close),
                },
              ]}
              options={{
                theme: {
                  mode: isDark ? "dark" : "light",
                },
                chart: {
                  height: 300,
                  width: 500,
                  toolbar: { show: false },
                  background: "transparent",
                },
                grid: { show: false },
                stroke: { curve: "smooth", width: 4 },
                yaxis: { show: false },
                xaxis: {
                  type: "datetime",
                  categories: parsedData?.map((price) =>
                    new Date(price.time_close).toUTCString()
                  ),
                },
                fill: {
                  type: "gradient",
                  gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                },
                colors: ["#0fbcf9"],
                tooltip: {
                  y: {
                    formatter: (value) =>
                      `$${Number(value.toFixed(2)).toLocaleString()}`,
                  },
                },
              }}
            />
          </Wrapper>
          <Wrapper $isDark={isDark}>
            <Title>Candle Chart</Title>
            <ApexChart
              type="candlestick"
              series={[
                {
                  name: "ohlc Price",
                  data: parsedData?.map((data) => {
                    return {
                      x: new Date(data?.time_close),
                      y: [data?.open, data?.high, data?.low, data?.close],
                    };
                  }),
                },
              ]}
              options={{
                theme: {
                  mode: isDark ? "dark" : "light",
                },
                chart: {
                  height: 300,
                  width: 500,
                  toolbar: { show: false },
                  background: "transparent",
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: "#00a8ff",
                      downward: "#e84118",
                    },
                  },
                },
                yaxis: { show: false },
                xaxis: {
                  type: "datetime",
                },
                tooltip: {
                  shared: true, // 여러 값이 있는 툴팁을 가능하게 설정
                  custom: function ({
                    series,
                    seriesIndex,
                    dataPointIndex,
                    w,
                  }) {
                    const ohlc =
                      w.config.series[seriesIndex].data[dataPointIndex].y;
                    // 'w.globals.series'로 접근하여 OHLC 값을 가져옵니다.
                    return `
                      <div style="padding: 10px;">
                        <b>Open:</b> $${parseFloat(
                          ohlc[0]
                        ).toLocaleString()}<br/>
                        <b>High:</b> $${parseFloat(
                          ohlc[1]
                        ).toLocaleString()}<br/>
                        <b>Low:</b> $${parseFloat(
                          ohlc[2]
                        ).toLocaleString()}<br/>
                        <b>Close:</b> $${parseFloat(ohlc[3]).toLocaleString()}
                      </div>
                    `;
                  },
                },
              }}
            />
          </Wrapper>
        </>
      )}
    </div>
  );
}

export default Chart;
