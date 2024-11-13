import * as S from "./InnerChat_style";
import React, { useEffect, useRef, useState } from "react";
import { Loading } from "../../loading/loading";

// const ExampleQ = [
//   "Dashboard에서 오늘 하루 봐야 될 것들 모두 보여줘",
//   "최근 일주일 동안 새로 생성된 IAM 계정의 이름 가져와줘",
//   "example 질문",
//   "Bookmark 된 질문",
// ];
const BookMarkQ = [
  "이번주 공격으로 접속된 IP 알려줘",
  "Bookmark 된 질문2",
  "Bookmark 된 질문3",
];

const InnerChat = ({ isOpen, isFull, chatData, addExample, SuggestData }) => {
  const chatEndRef = useRef(null);
  const [OpenQueries, setOpenQueries] = useState({});
  const [bookmarkedMessages, setBookmarkedMessages] = useState({});

  // 데이터가 업데이트될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

  //북마크
  const AddBookmark = (text, index) => {
    setBookmarkedMessages((prev) => ({
      ...prev,
      [index]: !prev[index], // 현재 상태의 반대로 토글
    }));
  };

  const toggleQuery = (index) => {
    setOpenQueries((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 기존 상태의 반대값으로 변경
    }));
  };

  return (
    <S.Wrapper isOpen={isOpen} isFull={isFull}>
      <S.InnerWrapper>
        {Array.isArray(chatData) &&
          chatData.map((message, index) => (
            <S.MessageBubble
              key={index}
              isUser={message.isUser ? message.isUser : message.role === "user"}
              isOpen={isOpen}
              isFull={isFull}
              isFirst={message.isFirst}
              isStart={message.isStart}
            >
              {message.isUser || message.role === "user" ? (
                <S.Bookmark
                  isBookmarked={bookmarkedMessages[index]}
                  onClick={() => {
                    AddBookmark(
                      message.text ? message.text : message.content,
                      index
                    );
                  }}
                />
              ) : (
                ""
              )}
              {message.isStreem ? <Loading /> : ""}
              {message.text ? message.text : message.content}

              <S.ExampleArea>
                {message.isStart && <p>추천질문</p>}
                {message.isStart &&
                  Array.isArray(SuggestData) &&
                  SuggestData.map((item, idx) => (
                    <S.Example
                      key={idx}
                      onClick={(e) => addExample(e.target.textContent)}
                    >
                      {item}
                    </S.Example>
                  ))}
              </S.ExampleArea>

              <S.ExampleArea>
                {(message.isFirst || message.isStart) && <p>북마크된 질문</p>}
                {(message.isFirst || message.isStart) &&
                  Array.isArray(BookMarkQ) &&
                  BookMarkQ.map((item) => (
                    <S.Example
                      onClick={(item) => addExample(item.target.textContent)}
                    >
                      <S.CancleBookMark />
                      {item}
                    </S.Example>
                  ))}
              </S.ExampleArea>

              {message.isQuery ? (
                <S.QueryWrapper Open={OpenQueries[index]}>
                  <S.QueryToggleWrapper>
                    <p>Query</p>
                    <S.QueryToggle
                      Open={OpenQueries[index]}
                      onClick={() => toggleQuery(index)}
                    />
                  </S.QueryToggleWrapper>
                  <S.Query Open={OpenQueries[index]}>
                    {message.isESQuery}
                    {message.isDBQuery}
                  </S.Query>
                </S.QueryWrapper>
              ) : null}
            </S.MessageBubble>
          ))}
        <div ref={chatEndRef} />
      </S.InnerWrapper>
    </S.Wrapper>
  );
};

export default InnerChat;
