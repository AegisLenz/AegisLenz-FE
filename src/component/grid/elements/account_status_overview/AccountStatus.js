import * as S from "./AccountStatus_styel";

const testData = [
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [false, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
  [true, "AWS-breakpack", "2020-1-1", 4, "FE", 0],
];

const AccountStatus = () => {
  return (
    <S.Wrapper>
      <S.Title>Account Overview</S.Title>
      <S.TableWrapper>
        <S.Table>
          <S.Thead>
            <S.Td>Status</S.Td>
            <S.Td>Name</S.Td>
            <S.Td>Last Active</S.Td>
            <S.Td>Severity</S.Td>
            <S.Td>Category</S.Td>
            <S.Td>Type</S.Td>
          </S.Thead>
          <S.Tbody>
            {testData.map((row, index) => (
              <S.Tr key={index} type={row[0]}>
                <S.Td>
                  <S.StatusIcon type={row[0]} />
                </S.Td>
                <S.Td>{row[1]}</S.Td>
                <S.Td>{row[2]}</S.Td>
                <S.Td>{row[3]}</S.Td>
                <S.Td>{row[4]}</S.Td>
                <S.Td>{row[5]}</S.Td>
              </S.Tr>
            ))}
          </S.Tbody>
        </S.Table>
      </S.TableWrapper>
    </S.Wrapper>
  );
};

export default AccountStatus;
