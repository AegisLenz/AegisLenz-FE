import * as S from "./AccountByService_style";
import { useState } from "react";
import PieChart from "../../../graph/D3_Pie/D3_Pie";

const Account = () => {
  // eslint-disable-next-line no-unused-vars
  const [contents, setContents] = useState([]);
  const [SubTitleValue, setSubTitleValue] = useState();
  const data = [
    { label: "Role", value: 40, color: "#104F55" },
    { label: "ECS Service", value: 15, color: "#216261" },
    { label: "Lamda", value: 10, color: "#2A6B67" },
    { label: "EC2", value: 10, color: "#32746D" },
    { label: "User", value: 10, color: "#689D8C" },
    { label: "Root", value: 15, color: "#9EC5AB" },
  ];

  const setSubTitleValueProps = (value) => {
    setSubTitleValue(value);
  };

  return (
    <S.Wrapper>
      <S.Title>Account by service</S.Title>
      <S.ContentArea>
        <S.Content>
          <PieChart data={data} setSubTitleValueProps={setSubTitleValueProps} />
          <S.SubTitle>{SubTitleValue} Account</S.SubTitle>
        </S.Content>
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Account;
