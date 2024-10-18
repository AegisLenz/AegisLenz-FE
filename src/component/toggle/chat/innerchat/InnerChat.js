import * as S from "./InnerChat_style";
import React, { useEffect, useRef } from "react";
import { Loading } from "../../loading/loading";

const ExampleQ = [
  "Dashboard에서 오늘 하루 봐야 될 것들 모두 보여줘",
  "최근 일주일 동안 새로 생성된 IAM 계정의 이름 가져와줘",
];

const InnerChat = ({ isOpen, isFull, chatData, addExample }) => {
  const chatEndRef = useRef(null);

  // 데이터가 업데이트될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

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
          </S.MessageBubble>
        ))}
        <div ref={chatEndRef} />
      </S.InnerWrapper>
    </S.Wrapper>
  );
};

export default InnerChat;
