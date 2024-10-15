import * as S from "./AccountStatus_styel";

const testData = [
  [true, "AWS-User1", "2024-10-15", 2, "SE", 1],
  [false, "AWS-User2", "2024-10-15", 1, "PM BE", 0],
  [true, "AWS-User3", "2024-10-17", 4, "FE", 1],
  [true, "AWS-User4", "2024-10-15", 4, "BE", 1],
  [true, "AWS-User5", "2024-10-19", 3, "Admin", 2],
  [true, "AWS-User6", "2024-10-15", 3, "FE", 1],
  [true, "AWS-User7", "2024-10-15", 4, "Admin", 2],
  [true, "AWS-User8", "2024-10-20", 4, "SE", 1],
  [true, "AWS-User9", "2024-10-15", 4, "SE", 1],
];

const type = {
  0: ["Priviliges", "#6A4FA3"],
  1: ["Dev", "#216261"],
  2: ["3rd", "#CD62B0"],
};

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
                <S.Td>
                  <S.TypeIcon color={type[row[5]][1]}>
                    {type[row[5]][0]}
                  </S.TypeIcon>
                </S.Td>
              </S.Tr>
            ))}
          </S.Tbody>
        </S.Table>
      </S.TableWrapper>
    </S.Wrapper>
  );
};

export default AccountStatus;
