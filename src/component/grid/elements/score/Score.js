import * as S from "./Score_style";
import { useState } from "react";

const Score = () => {
  // eslint-disable-next-line
  const [Score, setScore] = useState(90);

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

  return (
    <S.Wrapper>
      <S.Title>Score</S.Title>
      <S.BarContainer>
        <S.ScoreBar>
          {colors.map((color, index) => (
            <S.ColorBlock key={index} color={color} />
          ))}
        </S.ScoreBar>
      </S.BarContainer>
      <S.Score>{Score}/100</S.Score>
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
    </S.Wrapper>
  );
};

export default Score;
