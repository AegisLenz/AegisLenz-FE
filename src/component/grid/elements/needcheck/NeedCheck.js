import * as S from "./NeedCheck_style";
import { useState, useEffect } from "react";
import Loading2 from "../../../toggle/loading2/loading2";
import Getdata from "../../../hook/dashboard/GetNeedCheck";

const NeedCheck = ({ setPromptSession }) => {
  const [innerContents, setInnerContents] = useState([]);
  const [nowloading, setNowloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setNowloading(true);
      const data = await Getdata();
      setInnerContents(data.report_check);
      console.log(data.report_check);
      setNowloading(false);
    };
    fetchData();
  }, []);

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
                setPromptSession(index.prompt_session_id);
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
