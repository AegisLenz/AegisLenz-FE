import * as S from "./PromptIndex_style";
import GetAllPrompt from "../../hook/Prompt/GetAllPrompt";
import { useState, useEffect } from "react";

const Prompt = ({
  SideIndex,
  isSideIndex,
  getPromptSession,
  MakeNewSession,
  setIndex,
}) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await GetAllPrompt();
        const prompt_ids = data.prompt_ids.slice().reverse();
        setPrompts(prompt_ids);
        setIndex(prompt_ids);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, [setIndex]);

  const RefetchPrompts = async () => {
    try {
      const data = await GetAllPrompt();
      const prompt_ids = data.prompt_ids.slice().reverse();
      setPrompts(prompt_ids);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <S.Wrapper>
      <S.OuterToggleArea isSideToggle={isSideIndex}>
        <S.SideOuterToggle
          onClick={() => SideIndex((prev) => !prev)}
          path={"/icon/double_arrow.svg"}
        />
        <S.SideOuterToggle path={"/icon/add_page.svg"} />
      </S.OuterToggleArea>

      <S.SideIndex isSideToggle={isSideIndex}>
        <S.TopArea>
          <S.SideInnerToggle
            onClick={() => SideIndex((prev) => !prev)}
            path={"/icon/double_arrow.svg"}
          />
          <S.SideInnerToggle
            onClick={() => {
              MakeNewSession();
              RefetchPrompts();
            }}
            path={"/icon/add_page.svg"}
          />
        </S.TopArea>
        <S.ContentsArea>
          {prompts.map((prompt, index) => (
            <S.Content
              key={index}
              onClick={() => {
                getPromptSession(prompt);
              }}
            >
              {loading ? (
                "로딩중"
              ) : (
                <>
                  <S.ContetnsDate>{"2024-10-15"}</S.ContetnsDate>
                  <S.ContentsTitle>{prompt}</S.ContentsTitle>
                </>
              )}
            </S.Content>
          ))}
        </S.ContentsArea>
      </S.SideIndex>
    </S.Wrapper>
  );
};

export default Prompt;
