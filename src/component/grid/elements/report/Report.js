import * as S from "./Report_style";
import ReactMarkdown from "react-markdown";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

const Report = () => {
  const contentRef = useRef();
  const [MarkdownReport] = useState(`
  # 안녕하세요!
  저는 현재 리액트에서 \`react-markdown\`을 이용하여 **마크다운**을 렌더링하고 있습니다.
  
  - 목록 항목 1
  - 목록 항목 2
  `);

  const downloadPDF = () => {
    const now = new Date();
    const formattedTime = now.toISOString().replace(/:/g, "-").split(".")[0];
    const filename = "AegisLenz_Report_" + formattedTime;
    const element = contentRef.current;

    // PDF 변환 옵션 설정
    const options = {
      margin: 1,
      filename: filename + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // PDF 생성 및 다운로드
    html2pdf().set(options).from(element).save();
  };

  // 스타일 변수
  const contentAreaStyle = {
    backgroundColor: "white",
    padding: "3%",
  };

  return (
    <S.Wrapper>
      <S.TopPart>
        <S.Title>Report</S.Title>
        <S.DownloadButton onClick={downloadPDF} />
      </S.TopPart>

      <S.ContentArea>
        <div ref={contentRef} style={contentAreaStyle}>
          <ReactMarkdown>{MarkdownReport}</ReactMarkdown>
        </div>
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Report;
