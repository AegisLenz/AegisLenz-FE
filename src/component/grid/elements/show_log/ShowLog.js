import { useEffect, useState } from "react";
import * as S from "./ShowLog_style";

const ShowLog = ({ ESResultData, DBResultData }) => {
  const [Data, setData] = useState("");

  useEffect(() => {
    setData(ESResultData || DBResultData);
  }, [ESResultData, DBResultData]);
  return (
    <S.Wrapper>
      <S.Title>
        <p>Query Result</p>
      </S.Title>
      <S.TableWrapper>
        <pre>{Data}</pre>
      </S.TableWrapper>
    </S.Wrapper>
  );
};

export default ShowLog;
