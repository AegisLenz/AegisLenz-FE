import { useState, useRef, useEffect } from "react";
import * as S from "./ViewReport_style";
import ReactMarkdown from "react-markdown";
import { createRoot } from "react-dom/client";
import html2pdf from "html2pdf.js";
import { tree } from "d3";

const ViewReport = () => {
  const [isOpen, setIsOpen] = useState(false); // ToolBar 열림 상태
  const [isHoverIndex, setIsHoverIndex] = useState(false); // Hover 상태
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isHoverIcon || isHoverIndex) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 2000); // 1초 딜레이
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHoverIcon, isHoverIndex]);

  const content = `
# 보고서 제목
이 보고서는 마크다운 형식으로 작성되었습니다.

## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2
## 섹션 1
- 항목 1
- 항목 2

## 섹션 2
> 인용구는 이렇게 표시됩니다.

**굵은 텍스트**와 *기울인 텍스트*를 사용할 수 있습니다.

## 섹션 3
\`\`\`javascript
// 코드 블록도 지원됩니다.
const hello = "world";
console.log(hello);
\`\`\`
`;

  const [Index, setIndex] = useState([
    "보고서 제목이 여기에 이렇게..",
    "보고서 제목이...",
    "보고서 제목이 여기에 이렇게..",
    "보고서 제목이...",
  ]);
  const [formIndex, setformIndex] = useState([
    "보고서 형식 제목이 여기에 이렇게..",
    "보고서 형식 제목이...",
    "보고서 형식 제목이 여기에 이렇게..",
    "보고서 형식 제목이...",
    "보고서 형식 제목이 여기에 이렇게..",
    "보고서 형식 제목이...",
    "보고서 형식 제목이 여기에 이렇게",
  ]);
  const [pages, setPages] = useState([]); // 페이지 데이터
  const containerRef = useRef(null); // 숨겨진 DOM 컨테이너
  const rootRef = useRef(null); // React 18 createRoot instance 저장

  useEffect(() => {
    // React 18의 createRoot 초기화
    if (!rootRef.current && containerRef.current) {
      rootRef.current = createRoot(containerRef.current);
    }

    const splitContent = async () => {
      const isOverflowing = () => {
        const { scrollHeight, offsetHeight } = containerRef.current;
        return scrollHeight > offsetHeight;
      };

      const renderMarkdown = async (text) => {
        return new Promise((resolve) => {
          rootRef.current.render(<ReactMarkdown>{text}</ReactMarkdown>);
          setTimeout(() => {
            resolve(); // 비동기적으로 렌더링 완료 대기
          }, 0);
        });
      };

      const lines = content.split("\n"); // 줄 단위로 나누기
      const tempPages = []; // 페이지 데이터를 저장할 배열
      let currentText = ""; // 현재 페이지 텍스트

      for (const line of lines) {
        const testText = currentText + (currentText ? "\n" : "") + line.trim();
        await renderMarkdown(testText); // 비동기적으로 렌더링 후 대기

        console.log("Testing:", testText);
        console.log("Scroll Height:", containerRef.current.scrollHeight);
        console.log("Offset Height:", containerRef.current.offsetHeight);

        if (isOverflowing()) {
          tempPages.push(currentText.trim());
          currentText = line.trim(); // 새 줄로 초기화
        } else {
          currentText = testText;
        }
      }

      if (currentText.trim()) {
        tempPages.push(currentText.trim());
      }

      console.log(tempPages);
      setPages(tempPages); // 페이지 데이터 저장
    };

    splitContent();
  }, [content]);

  const contentRef = useRef();
  const downloadPDF = () => {
    const now = new Date();
    const formattedTime = now.toISOString().replace(/:/g, "-").split(".")[0];
    const filename = "AegisLenz_Report_" + formattedTime;
    const element = contentRef.current;

    const options = {
      margin: 1,
      filename: filename + ".pdf",
      image: { type: "jpeg", quality: 1.0 }, // 이미지 품질을 최대로 설정
      html2canvas: {
        scale: 4, // 고해상도
        useCORS: true, // 외부 리소스 허용
        logging: true, // 디버깅 로그 활성화
        backgroundColor: "#fff", // PDF 배경을 흰색으로 고정
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <S.Wrapper>
      <S.IndexWrapper>
        <S.IndexHead>
          <h1>Report Index</h1>
        </S.IndexHead>
        {Index.map((prompt, index) => (
          <S.IndexBubble key={index}>
            <S.ContetnsDate>{"2024-10-15"}</S.ContetnsDate>
            <S.ContentsTitle>{prompt}</S.ContentsTitle>
          </S.IndexBubble>
        ))}
      </S.IndexWrapper>
      <S.ReportWrapper>
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            width: "39vw",
            height: "44.499vw",
            backgroundColor: "white",
          }}
        />
        <div
          ref={contentRef}
          style={{
            color: "black",
          }}
        >
          {pages.map((page, index) => (
            <S.Report key={index}>
              <ReactMarkdown>{page}</ReactMarkdown>
            </S.Report>
          ))}
        </div>
      </S.ReportWrapper>
      <S.ToolBar>
        <S.SvgContainer>
          <S.DownTool onClick={() => downloadPDF()} />
          <S.RefreshTool
            onMouseEnter={() => setIsHoverIcon(true)}
            onMouseLeave={() => setIsHoverIcon(false)}
          />
        </S.SvgContainer>
        <S.RefreshIndexWrapper
          isOpen={isOpen}
          onMouseEnter={() => setIsHoverIndex(true)} // Hover 상태 유지
          onMouseLeave={() => setIsHoverIndex(false)} // 닫기 동작 실행
        >
          {formIndex.map((title, index) => (
            <S.RefreshIndex key={index}>{title}</S.RefreshIndex>
          ))}
        </S.RefreshIndexWrapper>
      </S.ToolBar>
    </S.Wrapper>
  );
};

export default ViewReport;
