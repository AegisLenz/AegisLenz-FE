import * as S from "./AccountByService_style";
import { useState, useEffect, useMemo } from "react";
import PieChart from "../../../graph/D3_Pie/D3_Pie";
import GetAccoundByService from "../../../hook/dashboard/GetaccountByService";
import Loading2Toggle from "../../../toggle/loading2/loading2";

const Account = () => {
  const [contents, setContents] = useState([]);
  const [SubTitleValue, setSubTitleValue] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const color = useMemo(
    () => ["#104F55", "#216261", "#2A6B67", "#32746D", "#689D8C", "#9EC5AB"],
    []
  );
  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      try {
        const data = await GetAccoundByService();
        // 데이터를 변환
        setTotal(data["total_service_count"]);
        const transformedData = Object.keys(data)
          .filter((key) => key !== "total_service_count") // total_service_count 제외
          .map((key, index) => ({
            label: key, // 키를 대문자로 변환
            value: data[key], // 값 매핑
            color: color[index % color.length], // 색상 순환
          }));

        setContents(transformedData); // 변환된 데이터 설정
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, [color]);

  const setSubTitleValueProps = (value) => {
    setSubTitleValue(value);
  };

  return (
    <S.Wrapper>
      <S.Title>Account by service</S.Title>
      {loading ? (
        <Loading2Toggle />
      ) : (
        <S.ContentArea>
          <S.Content>
            <PieChart
              data={contents}
              setSubTitleValueProps={setSubTitleValueProps}
              total={total}
            />
            <S.SubTitle>Total : {SubTitleValue}</S.SubTitle>
          </S.Content>
        </S.ContentArea>
      )}
    </S.Wrapper>
  );
};

export default Account;
