import * as S from "./DetectionPart_style";
import Linear from "../../../graph/D3_BrokenLine/BrokenLine";
import GetDetection from "../../../hook/dashboard/GetDetection";
import { useState, useEffect } from "react";
import Loading2Toggle from "../../../toggle/loading2/loading2";

const Detection = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([
    { month: "Jan", traffic: 30, attack: 0 },
    { month: "Feb", traffic: 25, attack: 1 },
    { month: "Mar", traffic: 39, attack: 10 },
    { month: "Apr", traffic: 60, attack: 35 },
    { month: "May", traffic: 80, attack: 55 },
    { month: "Jun", traffic: 90, attack: 50 },
  ]);
  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      try {
        const data = await GetDetection();
        // 데이터를 변환
        setData(data.monthly_detection);
        console.log(data.monthly_detection);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>Detection</S.Title>
      {loading ? (
        <Loading2Toggle />
      ) : (
        <S.Content>
          <Linear data={data} />
        </S.Content>
      )}
    </S.Wrapper>
  );
};

export default Detection;
