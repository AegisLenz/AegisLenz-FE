import * as S from "./PromptIndex_style";
import GetAllPrompt from "../../hook/Prompt/GetAllPrompt";
import CreateSession from "../../hook/Prompt/CreateNewPrompt";
import { useState, useEffect } from "react";
import Loading2 from "../../toggle/loading2/loading2";

const Prompt = ({ SideIndex, isSideIndex, getPromptSession, setIndex }) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const MakeNewSession = async () => {
    const NewSession = await CreateSession();
    getPromptSession(NewSession);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await GetAllPrompt();
        const prompt_ids = data.prompts.slice().reverse();
        setPrompts(prompt_ids);
        setIndex(prompt_ids);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RefetchPrompts = async () => {
    try {
      const Refetchdata = await GetAllPrompt();
      const prompt_ids = Refetchdata.prompts.slice().reverse();
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
          {prompts.map((item) => (
            <S.Content
              key={item.prompt_id}
              onClick={() => {
                getPromptSession(item.prompt_id);
              }}
            >
              {loading ? (
                <Loading2 />
              ) : (
                <>
                  <S.ContetnsDate>{item.prompt_updated_at}</S.ContetnsDate>
                  <S.ContentsTitle>{item.prompt_title}</S.ContentsTitle>
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
