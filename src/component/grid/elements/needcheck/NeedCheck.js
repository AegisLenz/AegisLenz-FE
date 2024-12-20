import * as S from "./NeedCheck_style";
import { useState, useEffect } from "react";
import Loading2 from "../../../toggle/loading2/loading2";
import { useNavigate } from "react-router-dom";
import Getdata from "../../../hook/dashboard/GetNeedCheck";

const NeedCheck = ({ setPromptSession }) => {
  const [innerContents, setInnerContents] = useState([]);
  const [nowloading, setNowloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setNowloading(true);
      const data = await Getdata();
      setInnerContents(data.report_check);
      setNowloading(false);
    };
    fetchData();
  }, []);

  const handleRedirect = (promptSessionId) => {
    setPromptSession(promptSessionId); // 세션 상태 업데이트
    navigate(`/Report`, { state: { sessionId: promptSessionId } }); // "/Report"로 리다이렉트
  };

  return (
    <S.Wrapper>
      <S.Title>Attack Report Briefing</S.Title>
      <S.ContentArea>
        {nowloading || innerContents.length === 0 ? (
          <Loading2 />
        ) : (
          innerContents.map((index) => (
            <S.Content
              key={index}
              onClick={() => {
                handleRedirect(index.report_id);
              }}
            >
              {index.summary}
            </S.Content>
          ))
        )}
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default NeedCheck;
