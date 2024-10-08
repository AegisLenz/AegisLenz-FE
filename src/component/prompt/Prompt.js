import { useEffect, useState } from "react";
import * as S from "./Prompt_style";
import PromptIndex from "./prompt_index/PromptIndex";
import Chat from "../toggle/chat/ToggleChat";
import PromptContent from "./prompt_content/PromptContent";

const Prompt = () => {
  const [isSideIndex, setSideIndex] = useState(true);
  const [isSideContent, setSideContent] = useState(false);
  const [ChatWidth, setChatWidth] = useState(16);
  const [Chatleft, setChatleft] = useState(20);
  const [MarkData, setMarkData] = useState([]);
  const setMarkDataFunc = (value) => {
    setMarkData(value);
  };
  const SideIndex = (value) => {
    setSideIndex(value);
  };
  const SideContent = () => {
    setSideContent(true);
  };

  useEffect(() => {
    if (isSideIndex) {
      setChatWidth((props) => props - 20);
      setChatleft(20);
    } else {
      setChatWidth((props) => props + 20);
      setChatleft(0);
    }
  }, [isSideIndex]);

  useEffect(() => {
    if (isSideContent) {
      setChatWidth((props) => props - 49);
    } else {
      setChatWidth((props) => props + 49);
    }
  }, [isSideContent]);

  return (
    <S.Wrapper>
      <PromptIndex SideIndex={SideIndex} />
      <S.ChatAreaWrapper
        ChatWidth={ChatWidth + "vw"}
        Chatleft={Chatleft + "vw"}
      >
        <S.ChatArea isSideOpen={isSideIndex} isSideContent={isSideContent}>
          <Chat
            isChattoggleOpen={false}
            sizeFull={true}
            SideContent={SideContent} //오른쪽 On/Off
            markData={setMarkDataFunc} //오른쪽에 띄울 데이터
          />
        </S.ChatArea>
      </S.ChatAreaWrapper>

      <PromptContent isSideContent={isSideContent} MarkData={MarkData} />
    </S.Wrapper>
  );
};

export default Prompt;
