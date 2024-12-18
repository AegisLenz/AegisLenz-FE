import { useEffect, useState } from "react";
import * as S from "./Prompt_style";
import PromptIndex from "./prompt_index/PromptIndex";
import Chat from "../toggle/chat/ToggleChat";
import PromptContent from "./prompt_content/PromptContent";

const Prompt = () => {
  const [isSideIndex, setSideIndex] = useState(true);
  const [isSideContent, setSideContent] = useState(false);
  const [ChatWidth, setChatWidth] = useState(47);
  const [Chatleft, setChatleft] = useState(20);
  const [MarkData, setMarkData] = useState([]);
  const [promptSession, setPromptSession] = useState("");

  const getPromptSession = (value) => {
    if (value) {
      setPromptSession(value);
    }
  };

  const setMarkDataFunc = (value) => {
    setMarkData(value);
    //오른쪽에 인터랙티브하게 데이터 ON/OFF
    setSideContent(true);
    SideIndex(false);
  };
  const SideIndex = (value) => {
    setSideIndex(value);
  };
  const SideContent = (value) => {
    if (MarkData.length !== 0) {
      setSideContent(value);
    }
  };
  const MakeNewSession = () => {
    setPromptSession("");
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
      setChatWidth((props) => props - 48);
    } else {
      setChatWidth((props) => props + 48);
    }
  }, [isSideContent]);

  return (
    <S.Wrapper>
      <PromptIndex
        SideIndex={SideIndex}
        isSideIndex={isSideIndex}
        getPromptSession={getPromptSession}
        MakeNewSession={MakeNewSession}
        promptSession={promptSession}
      />
      <S.ChatAreaWrapper
        ChatWidth={ChatWidth + "vw"}
        Chatleft={Chatleft + "vw"}
      >
        <S.ChatArea isSideOpen={isSideIndex} isSideContent={isSideContent}>
          <Chat
            promptSession={promptSession}
            isChattoggleOpen={false}
            sizeFull={true}
            SideContent={SideContent} //오른쪽 On/Off
            markData={setMarkDataFunc} //오른쪽에 띄울 데이터
            getPromptSession={getPromptSession}
            type={"prompt"}
          />
        </S.ChatArea>
      </S.ChatAreaWrapper>
      <S.OuterToggleArea isSideToggle={isSideContent}>
        <S.SideOuterToggle
          onClick={() => SideContent(true)}
          path={"/icon/double_arrow.svg"}
        />
      </S.OuterToggleArea>
      <PromptContent
        isSideContent={isSideContent}
        SideContent={SideContent}
        MarkData={MarkData}
      />
    </S.Wrapper>
  );
};

export default Prompt;
