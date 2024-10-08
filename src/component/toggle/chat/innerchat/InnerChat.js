import * as S from "./InnerChat_style";
import React, { useEffect, useRef } from "react";

const InnerChat = ({ isOpen, isFull, chatData }) => {
  const chatEndRef = useRef(null);

  // 데이터가 업데이트될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

  return (
    <S.Wrapper isOpen={isOpen} isFull={isFull}>
      {chatData.map((message, index) => (
        <S.MessageBubble
          key={index}
          isUser={message.isUser}
          isOpen={isOpen}
          isFull={isFull}
        >
          {message.text}
        </S.MessageBubble>
      ))}
      <div ref={chatEndRef} />
    </S.Wrapper>
  );
};

export default InnerChat;
