import * as S from "./ShowLog_style";
import { Tooltip } from "react-tooltip";

const ShowLog = ({ Data }) => {
  const handleRowClick = (item) => {
    // 팝업 창을 띄우기
    const popupWindow = window.open(
      "",
      "popup",
      "width=600,height=400,scrollbars=yes"
    );

    // 팝업 창 내용 작성
    if (popupWindow) {
      popupWindow.document.write(`
        <html>
          <head>
            <title>Event Details</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px;}
              pre { white-space: pre-wrap; }
              button { margin-top: 20px; }
            </style>
          </head>
          <body>
            <h3>Event Details</h3>
            <pre>${JSON.stringify(item, null, 2)}</pre>
            <button onclick="window.close()">Close</button>
          </body>
        </html>
      `);
      popupWindow.document.close();
    }
  };

  return (
    <S.Wrapper>
      <S.Title>
        <p>ShowLog</p>
      </S.Title>
      <S.TableWrapper>
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Td>Event Version</S.Td>
              <S.Td>Event Name</S.Td>
              <S.Td>AWS Region</S.Td>
              <S.Td>Source IP Address</S.Td>
              <S.Td>User Agent</S.Td>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {Data.map((item, index) => (
              <S.Tr key={index} onClick={() => handleRowClick(item)}>
                <S.Td>{item.eventVersion}</S.Td>
                <S.Td>{item.eventName}</S.Td>
                <S.Td>{item.awsRegion}</S.Td>
                <S.Td>{item.sourceIPAddress}</S.Td>
                <S.Td>
                  <span
                    data-tip={item.userAgent}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      maxWidth: "150px",
                    }}
                  >
                    {item.userAgent}
                  </span>
                  <Tooltip place="top" type="dark" effect="solid" />
                </S.Td>
              </S.Tr>
            ))}
          </S.Tbody>
          {/* <pre>${JSON.stringify(item, null, 2)}</pre> */}
        </S.Table>
      </S.TableWrapper>
    </S.Wrapper>
  );
};

export default ShowLog;
