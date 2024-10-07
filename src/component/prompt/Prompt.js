import { useEffect, useState } from "react";
import * as S from "./Prompt_style";
import PromptIndex from "./prompt_index/PromptIndex";
import Chat from "../toggle/chat/ToggleChat";
import PromptContent from "./prompt_content/PromptContent";

const Prompt = () => {
  const [isSideIndex, setSideIndex] = useState(true);
  const [isSideContent, setSideContent] = useState(false);
  const [ChatWidth, setChatWidth] = useState(15);
  const [Chatleft, setChatleft] = useState(20);
  const SideIndex = (value) => {
    setSideIndex(value);
  };
  const SideContent = (value) => {
    setSideContent(value);
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
      setChatWidth((props) => props - 50);
    } else {
      setChatWidth((props) => props + 50);
    }
  }, [isSideContent]);

  return (
    <S.Wrapper>
      <PromptIndex SideIndex={SideIndex} />
      <S.ChatAreaWrapper
        ChatWidth={ChatWidth + "vw"}
        Chatleft={Chatleft + "vw"}
      >
        <S.ChatArea isSideOpen={isSideIndex}>
          <Chat isChattoggleOpen={false} sizeFull={true} />
        </S.ChatArea>
        {/* <button onClick={() => setSideContent((props) => !props)}>test</button> */}
      </S.ChatAreaWrapper>

      <PromptContent SideContent={SideContent} isSideContent={isSideContent} />
    </S.Wrapper>
  );
};

export default Prompt;
