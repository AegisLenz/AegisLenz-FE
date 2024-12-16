import * as S from "./DetectionPart_style";
import Linear from "../../../graph/D3_BrokenLine/BrokenLine";
import GetDetection from "../../../hook/dashboard/GetDetection";
import { useState, useEffect } from "react";
import Loading2Toggle from "../../../toggle/loading2/loading2";

const Detection = () => {
  const [data, setData] = useState([
    { month: "Jan", traffic: 30, attack: 0 },
    { month: "Feb", traffic: 25, attack: 1 },
    { month: "Mar", traffic: 39, attack: 10 },
    { month: "Apr", traffic: 60, attack: 35 },
    { month: "May", traffic: 80, attack: 55 },
    { month: "Jun", traffic: 90, attack: 50 },
  ]);

  const [loading, setLoading] = useState(true);
  const [hoveredData, setHoveredData] = useState(null); // 마우스 오버 데이터 상태 추가

  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      try {
        const data = await GetDetection();
        // 데이터를 변환
        setData(data.monthly_detection);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    setHoveredData(data[data.length - 1]);
  }, [data]);

  return (
    <S.Wrapper>
      <S.Title>Detection</S.Title>
      {loading ? (
        <Loading2Toggle />
      ) : (
        <S.ContentWrapper>
          <S.Content>
            <Linear data={data} onHover={(data) => setHoveredData(data)} />
          </S.Content>
          <S.Monthly>
            {hoveredData ? (
              <div>
                <h3>{hoveredData.month}</h3>
                <p>Traffic: {hoveredData.traffic}</p>
                <p>Attack: {hoveredData.attack}</p>
              </div>
            ) : (
              <div>
                <h3>{data[data.length - 1].month}</h3>
                <p>Traffic: {data[data.length - 1].traffic}</p>
                <p>Attack: {data[data.length - 1].attack}</p>
              </div>
            )}
          </S.Monthly>
        </S.ContentWrapper>
      )}
    </S.Wrapper>
  );
};

export default Detection;
