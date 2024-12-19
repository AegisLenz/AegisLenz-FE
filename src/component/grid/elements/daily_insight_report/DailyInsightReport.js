import * as S from "./DailyInsightReport_style";
import Loading2 from "../../../toggle/loading2/loading2";
import GetDailyInsight from "../../../hook/dashboard/GetdailyinsInsightReport";
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useRef } from "react";

const Daily = () => {
  const contentRef = useRef();
  const [contents, setContents] = useState([]);
  const [NowLoading, setNowLoading] = useState(true);

  useEffect(() => {
    const FetchFunc = async () => {
      setNowLoading(true);
      try {
        const Fetchdata = await GetDailyInsight();
        setContents(Fetchdata.daily_insight[0]);
      } catch (e) {
        console.log(e);
      } finally {
        setNowLoading(false);
      }
    };
    FetchFunc();
  }, []);

  // 스타일 변수
  const contentAreaStyle = {
    color: "white",
    margin: "2%",
  };

  return (
    <S.Wrapper>
      <S.Title>Daily Suspicion Analysis</S.Title>
      <S.ContentArea>
        {NowLoading ? (
          <Loading2 />
        ) : (
          <S.SubContent>
            <div ref={contentRef} style={contentAreaStyle}>
              <ReactMarkdown>{contents}</ReactMarkdown>
            </div>
          </S.SubContent>
        )}
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Daily;
