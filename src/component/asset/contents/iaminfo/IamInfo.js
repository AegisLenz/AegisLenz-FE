import * as S from "./IamInfo_style";

const IamInfo = ({ data }) => {
  return (
    <S.Wrapper>
      <S.SubTitle>
        UserName:
        <p>{data.UserName}</p>
      </S.SubTitle>

      <S.SubTitle>
        UserId:
        <p>{data.UserId}</p>
      </S.SubTitle>

      <S.SubTitle>
        CreateDate:
        <p>{data.CreateDate}</p>
      </S.SubTitle>

      <S.SubTitle>
        LastUpdated:
        <p>{data.LastUpdated}</p>
      </S.SubTitle>

      <S.SubTitle>
        AttachedPolicies:
        <ul>
          {data.AttachedPolicies.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
      </S.SubTitle>

      <S.SubTitle>
        AccessKeys:
        <ul>
          {data.AccessKeysLastUsed.flatMap((key) =>
            Object.keys(key).map((field) => (
              <li key={`${key.AccessKeyId}-${field}`}>
                {field}: {key[field]}
              </li>
            ))
          )}
        </ul>
      </S.SubTitle>
    </S.Wrapper>
  );
};

export default IamInfo;
