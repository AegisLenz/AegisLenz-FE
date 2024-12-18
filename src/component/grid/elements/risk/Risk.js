import { useEffect, useState } from "react";
import * as S from "./Risk_style";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GetRisk from "../../../hook/dashboard/Getrisk";
import Loading2 from "../../../toggle/loading2/loading2";

const Risk = () => {
  const [NowLoading, setNowLoading] = useState(true);

  const [Data, setData] = useState({});

  useEffect(() => {
    const fetchfunc = async () => {
      setNowLoading(true);
      try {
        const Fetchdata = await GetRisk();
        setData(Fetchdata);
      } catch (e) {
        console.log(e);
      }
      setNowLoading(false);
    };
    fetchfunc();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>Risk</S.Title>
      {NowLoading ? (
        <Loading2 />
      ) : (
        <S.ContentWrapper>
          {Object.entries(Data).map(([key, values], idx) => (
            <S.IndexWrapper key={key}>
              <S.CountWrapper>
                <h1>{Array.isArray(values) ? values.length : values}</h1>
                <p>{key}</p>
              </S.CountWrapper>
              {Array.isArray(values) && (
                <S.Index>
                  {values.map((item, i) => (
                    <S.Label key={i}>{item}</S.Label>
                  ))}
                </S.Index>
              )}
            </S.IndexWrapper>
          ))}
        </S.ContentWrapper>
      )}
    </S.Wrapper>
  );
};

export default Risk;
