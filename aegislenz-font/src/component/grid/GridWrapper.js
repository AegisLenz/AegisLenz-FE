import * as S from "./Grid_style";
import { useState, useEffect, useMemo } from "react";
import ToggleChat from "../chat/ToggleChat";

function Grid() {
  const [isChattoggleOpen, setChatToggle] = useState(false);

  const divElements = useMemo(
    () => [
      <S.BasicItenDiv key="1">
        <iframe
          title="test1"
          src="http://localhost:5601/app/visualize#/edit/cb099a20-ea66-11eb-9425-113343a037e3?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A900000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&embed=true"
          height="600"
          width="800"
        ></iframe>
      </S.BasicItenDiv>,
      <S.BasicItenDiv key="2">
        <iframe
          title="test2"
          src="http://localhost:5601/app/visualize#/edit/7cbd2350-2223-11e8-b802-5bcf64c2cfb4?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A900000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&embed=true"
          height="600"
          width="800"
        ></iframe>
      </S.BasicItenDiv>,
      <S.BasicItenDiv key="3">text</S.BasicItenDiv>,
      <S.BasicItenDiv key="4">text</S.BasicItenDiv>,
    ],
    []
  );

  const divElements2 = useMemo(
    () => [
      <S.BasicItenDiv key="2">
        <iframe
          title="test3"
          src="http://localhost:5601/app/visualize#/edit/7cbd2350-2223-11e8-b802-5bcf64c2cfb4?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A900000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&embed=true"
          height="100%"
          width="100%"
        ></iframe>
      </S.BasicItenDiv>,
    ],
    []
  );

  const ChatToggleButton = () => {
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
  };

  useEffect(() => {
    if (isChattoggleOpen) {
      // 추가적인 작업을 필요로 하지 않으면 상태 업데이트를 최소화
    } else if (!isChattoggleOpen && divElements.length > 4) {
      // 불필요한 렌더링을 방지하기 위해 상태 변경 최소화
    }
  }, [isChattoggleOpen]);

  return (
    <S.Wrapper>
      <ToggleChat
        ChatToggleButton={ChatToggleButton}
        setChatToggleOpen={setChatToggleOpen}
        isChattoggleOpen={isChattoggleOpen}
      />
      <S.Ldiv>
        <S.ChatAreaDiv chatToggleOpen={isChattoggleOpen}></S.ChatAreaDiv>
        {/* {divElements2} */}
      </S.Ldiv>
      {isChattoggleOpen ? (
        <S.Rdiv_scroll>{divElements}</S.Rdiv_scroll>
      ) : (
        <S.Rdiv>{divElements}</S.Rdiv>
      )}
    </S.Wrapper>
  );
}

export default Grid;
