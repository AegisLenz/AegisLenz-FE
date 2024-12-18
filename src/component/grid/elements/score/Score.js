import * as S from "./Score_style";
import { useEffect, useState } from "react";
import Loading2 from "../../../toggle/loading2/loading2";
import GetScore from "../../../hook/dashboard/GetScore";

const Score = () => {
  const [Score, setScore] = useState();
  const [NowLoading, setNowLoading] = useState(true);

  const colors = [
    "#104F55",
    "#216261",
    "#2A6B67",
    "#32746D",
    "#689D8C",
    "#9EC5AB",
    "#6E69A3",
    "#AA62B0",
    "#CE3B8B",
    "#FF758F",
  ];

  const MarkPosition = (75 / 100) * (100 - Score);

  useEffect(() => {
    const Fetchfunc = async () => {
      setNowLoading(true);
      try {
        const Fetchdata = await GetScore();
        setScore(Fetchdata.score);
        console.log(Fetchdata);
      } catch (e) {
        console.log(e);
      } finally {
        setNowLoading(false);
      }
    };
    Fetchfunc();
  }, []);

  return (
    <S.Wrapper>
      <S.Title>Synthesis Score</S.Title>
      {NowLoading ? (
        <Loading2 />
      ) : (
        <>
          <S.BarContainer>
            <S.ScoreBar>
              {colors.map((color, index) => (
                <S.ColorBlock key={index} color={color} />
              ))}
            </S.ScoreBar>
          </S.BarContainer>
          <S.Score>{Score}% Safe</S.Score>
          <S.MarkBar
            MarkPosition={String(MarkPosition + 15)}
            background_color={
              colors[Math.floor(((99 - Score) / 100) * colors.length)]
            }
          ></S.MarkBar>
          <S.Mark
            MarkPosition={String(MarkPosition + 20)}
            background_color={
              colors[Math.floor(((99 - Score) / 100) * colors.length)]
            }
          ></S.Mark>
        </>
      )}
    </S.Wrapper>
  );
};

export default Score;
