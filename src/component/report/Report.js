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
      <S.ContentWrapper>{renderContent()}</S.ContentWrapper>
    </S.Wrapper>
  );
};

export default Report;
