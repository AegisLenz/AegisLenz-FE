import * as S from "./DetectionPart_style";
import Linear from "../../../graph/D3_BrokenLine/BrokenLine";

const Detection = () => {
  const data = [
    { month: "Jan", traffic: 30, attack: 0 },
    { month: "Feb", traffic: 25, attack: 1 },
    { month: "Mar", traffic: 39, attack: 10 },
    { month: "Apr", traffic: 60, attack: 35 },
    { month: "May", traffic: 80, attack: 55 },
    { month: "Jun", traffic: 100, attack: 50 },
  ];

  return (
    <S.Wrapper>
      <S.Title>Account by service</S.Title>
      <S.Content>
        <Linear data={data} />
      </S.Content>
    </S.Wrapper>
  );
};

export default Detection;
