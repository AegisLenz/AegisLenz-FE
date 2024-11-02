import * as S from "./Ec2Info_style";

const InstanceInfo = ({ data }) => {
  return (
    <S.Wrapper>
      <S.SubTitle>
        InstanceId:
        <p>{data.InstanceId}</p>
      </S.SubTitle>

      <S.SubTitle>
        InstanceType:
        <p>{data.InstanceType}</p>
      </S.SubTitle>

      <S.SubTitle>
        LaunchTime:
        <p>{data.LaunchTime}</p>
      </S.SubTitle>

      <S.SubTitle>
        State:
        <p>{data.State}</p>
      </S.SubTitle>

      <S.SubTitle>
        PublicIpAddress:
        <p>{data.PublicIpAddress}</p>
      </S.SubTitle>

      <S.SubTitle>
        PrivateIpAddress:
        <p>{data.PrivateIpAddress}</p>
      </S.SubTitle>

      <S.SubTitle>
        VpcId:
        <p>{data.VpcId}</p>
      </S.SubTitle>

      <S.SubTitle>
        SubnetId:
        <p>{data.SubnetId}</p>
      </S.SubTitle>

      <S.SubTitle>
        SecurityGroups:
        <ul>
          {data.SecurityGroups.map((group, index) => (
            <li key={index}>
              GroupId: {group.GroupId}, GroupName: {group.GroupName}
            </li>
          ))}
        </ul>
      </S.SubTitle>

      <S.SubTitle>
        Tags:
        <ul>
          {data.Tags.map((tag, index) => (
            <li key={index}>
              {tag.Key}: {tag.Value}
            </li>
          ))}
        </ul>
      </S.SubTitle>
    </S.Wrapper>
  );
};

export default InstanceInfo;