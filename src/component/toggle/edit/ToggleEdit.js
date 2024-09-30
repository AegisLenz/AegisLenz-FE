import React from "react";
import { useLocation } from "react-router-dom";
import * as S from "./ToggleEdit_style";

export default function ToggleEdit({ isEditOn, setEditOnOff }) {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <S.Wrapper onClick={setEditOnOff}>
        <S.Toggle isEditOn={isEditOn}></S.Toggle>
      </S.Wrapper>
    );
  }

  return null;
}
