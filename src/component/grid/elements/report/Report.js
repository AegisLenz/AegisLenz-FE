import * as S from "./Report_style";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";

const Report = (data) => {
  const contentRef = useRef();
  const [MarkdownReport, setMarkData] = useState(``);

  useEffect(() => {
    setMarkData(data.data);
  }, [data]);

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
