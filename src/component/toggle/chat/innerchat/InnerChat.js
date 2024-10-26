import * as S from "./InnerChat_style";
import React, { useEffect, useRef, useState } from "react";
import { Loading } from "../../loading/loading";

const ExampleQ = [
  "Dashboard에서 오늘 하루 봐야 될 것들 모두 보여줘",
  "최근 일주일 동안 새로 생성된 IAM 계정의 이름 가져와줘",
  "example 질문",
  "Bookmark 된 질문",
];

const InnerChat = ({ isOpen, isFull, chatData, addExample }) => {
  const chatEndRef = useRef(null);
  const [OpenQueries, setOpenQueries] = useState({});
  // 데이터가 업데이트될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

  const toggleQuery = (index) => {
    setOpenQueries((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 기존 상태의 반대값으로 변경
    }));
  };

  return (
    <S.Wrapper isOpen={isOpen} isFull={isFull}>
      <S.InnerWrapper>
        {chatData.map((message, index) => (
          <S.MessageBubble
            key={index}
            isUser={message.isUser}
            isOpen={isOpen}
            isFull={isFull}
            isFirst={message.isFirst}
          >
            {message.isStreem ? <Loading /> : ""}
            {message.text}

            {message.isFirst
              ? ExampleQ.map((item) => (
                  <S.ExampleArea>
                    <S.Example
                      onClick={(item) => addExample(item.target.textContent)}
                    >
                      {item}
                    </S.Example>
                  </S.ExampleArea>
                ))
              : ""}
            {message.isQuery ? (
              <>
                <S.QueryWrapper Open={OpenQueries[index]}>
                  <S.QueryToggleWrapper>
                    <p>Query</p>
                    <S.QueryToggle
                      Open={OpenQueries[index]}
                      onClick={() => toggleQuery(index)}
                    />
                  </S.QueryToggleWrapper>

                  <S.Query Open={OpenQueries[index]}>{message.isQuery}</S.Query>
                </S.QueryWrapper>
              </>
            ) : (
              ""
            )}
          </S.MessageBubble>
        ))}
        <div ref={chatEndRef} />
      </S.InnerWrapper>
    </S.Wrapper>
  );
};

export default InnerChat;
