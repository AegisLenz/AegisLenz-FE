import * as S from "./DailyInsightReport_style";
import Loading2 from "../../../toggle/loading2/loading2";
import GetDailyInsight from "../../../hook/dashboard/GetdailyinsInsightReport";
import { useEffect, useState } from "react";

const Daily = () => {
  const [contents, setContents] = useState([]);
  const [NowLoading, setNowLoading] = useState(true);

  useEffect(() => {
    const FetchFunc = async () => {
      setNowLoading(true);
      try {
        const Fetchdata = await GetDailyInsight();
        setContents(Fetchdata.daily_insight);
      } catch (e) {
        console.log(e);
      } finally {
        setNowLoading(false);
      }
    };
    FetchFunc();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>Daily Suspicion Analysis</S.Title>
      <S.ContentArea>
        {NowLoading ? (
          <Loading2 />
        ) : (
          <S.SubContent>
            {/* {contents.map((content) => (
              <S.Content>{`${content}`}</S.Content>
            ))} */}
            <S.Content>{contents}</S.Content>
          </S.SubContent>
        )}
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Daily;
