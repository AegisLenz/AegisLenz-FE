import * as S from "./AccountCount_style";
import { useState, useRef, useEffect, useMemo } from "react";
import GetaccountCount from "../../../hook/dashboard/GetaccountCount";
import Loading2 from "../../../toggle/loading2/loading2";

const Account = () => {
  const ColorList = useMemo(
    () => ["#216261", "#6A4FA3", "#CD62B0", "#216261"],
    []
  );
  const [AccountCountList, setAccountCountList] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(true);
  const innerWrapperRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await GetaccountCount();
      const transformedData = Object.keys(data).map((key, index) => ({
        key: key, // 키를 대문자로 변환
        info: data[key], // 값 매핑
        color: ColorList[index % ColorList.length], // 색상 순환
      }));
      setAccountCountList(transformedData);
      setLoading(false);
    };
    fetchData();
  }, [ColorList]);

  useEffect(() => {
    // ResizeObserver를 사용해 div 크기 변화 감지
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const newFontSize = width * 0.05; // 너비의 5%로 폰트 크기 설정 (비율은 필요에 맞게 조절 가능)
        setFontSize(newFontSize);
      }
    });

    if (innerWrapperRef.current) {
      resizeObserver.observe(innerWrapperRef.current); // 요소 크기 관찰 시작
    }
  }, []);

  return (
    <S.Wrapper>
      {loading ? (
        <Loading2></Loading2>
      ) : (
        AccountCountList.map(({ key, info, color }) => (
          <S.InnerWrapper key={key} color={color} ref={innerWrapperRef}>
            <S.Index fontSize={fontSize}>{`${key}`}</S.Index>
            <S.Number fontSize={fontSize}>{`${info}`}</S.Number>
          </S.InnerWrapper>
        ))
      )}
    </S.Wrapper>
  );
};

export default Account;
