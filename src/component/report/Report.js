import * as S from "./Report_style";
import ViewReport from "./view_report/ViewReport";
import ViewReportForm from "./view_reportform/ViewReportForm";
import { useState } from "react";

const Report = () => {
  const [selectedCategory, setselectedCategory] = useState("showReport");

  const renderContent = () => {
    switch (selectedCategory) {
      case "showReport":
        return <ViewReport />;
      case "showReportForm":
        return <ViewReportForm />;
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.LeftWrapper>
        <S.LeftIndex>
          <h1>Report</h1>
          <ul>
            <li onClick={() => setselectedCategory("showReport")}>
              보고서 조회
            </li>
            <li onClick={() => setselectedCategory("showReportForm")}>
              보고서 형식
            </li>
          </ul>
        </S.LeftIndex>
      </S.LeftWrapper>
      <S.ContentWrapper>{renderContent()}</S.ContentWrapper>
    </S.Wrapper>
  );
};

export default Report;
