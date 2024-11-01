import * as S from "./AccountStatus_styel";
import { useState } from "react";
import Dropdown from "../../../toggle/dropdown/DropDown";

const testData = [
  {
    UserName: "Hyunjun_Park",
    UserId: "AIDA2MNVLVQT4YD7QRMBR",
    CreateDate: "2024-10-01T05:45:15.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:50.969Z",
  },
  {
    UserName: "Jiyun_Kim",
    UserId: "AIDA2MNVLVQTRDIWKGAC5",
    CreateDate: "2024-09-30T08:23:21.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:52.075Z",
  },
  {
    UserName: "Taeyang_Kim",
    UserId: "AIDA2MNVLVQTWUUAMZCZE",
    CreateDate: "2024-09-30T08:19:35.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:53.895Z",
  },
  {
    UserName: "Wonje_Cha",
    UserId: "AIDA2MNVLVQT5TARLHOZP",
    CreateDate: "2024-10-01T04:11:48.000Z",
    UserPolicies: [],
    AttachedPolicies: ["AmazonEC2FullAccess", "AdministratorAccess"],
    Groups: [],
    AccessKeysLastUsed: [
      {
        AccessKeyId: "AKIA2MNVLVQT53CDZV4V",
        Status: "Active",
        LastUsedDate: "2024-10-31T15:10:00.000Z",
      },
    ],
    LastUpdated: "2024-10-31T15:22:55.125Z",
  },
  {
    UserName: "Yeji_Shin",
    UserId: "AIDA2MNVLVQTSEX5JPOM3",
    CreateDate: "2024-09-30T08:21:28.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:56.459Z",
  },
  {
    UserName: "Yujeong_Choi",
    UserId: "AIDA2MNVLVQT6H4YW2SMB",
    CreateDate: "2024-10-01T05:47:18.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:57.687Z",
  },
];

const type = {
  0: ["Privileges", "#6A4FA3"],
  1: ["Dev", "#216261"],
  2: ["3rd", "#CD62B0"],
};

const filterOptions = [
  { label: "== none ==", value: "none" },
  { label: "User Name", value: "UserName" },
  { label: "Status", value: "Status" },
  { label: "Last Active", value: "LastUsedDate" },
  { label: "Attached Policies", value: "AttachedPolicies" },
  { label: "User ID", value: "UserId" },
  { label: "Type", value: "Type" },
];

const AccountStatus = ({ GenDetailData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("none");
  const [filteredData, setFilteredData] = useState(testData);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // includes 메서드를 사용하여 대소문자 구분 없이 부분 일치를 찾습니다.
    const filtered = testData.filter((user) => {
      switch (filterCategory) {
        case "none":
          return user;
        case "UserName":
          return user.UserName.toLowerCase().includes(value);
        case "Status":
          return user.AccessKeysLastUsed[0]?.Status?.toLowerCase().includes(
            value
          );
        case "LastUsedDate":
          return (
            user.AccessKeysLastUsed[0]?.LastUsedDate &&
            user.AccessKeysLastUsed[0].LastUsedDate.includes(value)
          );
        case "AttachedPolicies":
          return user.AttachedPolicies.some((policy) =>
            policy.toLowerCase().includes(value)
          );
        case "UserId":
          return user.UserId.toLowerCase().includes(value);
        default:
          return false;
      }
    });

    setFilteredData(filtered);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilteredData(testData);
  };

  return (
    <S.Wrapper>
      <S.Title>
        <p>Account Overview</p>
        <S.FilterDropdown>
          <Dropdown
            options={filterOptions}
            selectedOption={filterCategory}
            onSelect={(value) => setFilterCategory(value)}
          />
        </S.FilterDropdown>
        <S.SearchInput
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <S.InitButton onClick={resetSearch}>Reset</S.InitButton>
      </S.Title>
      <S.TableWrapper>
        <S.Table>
          <S.Thead>
            <S.Td>Status</S.Td>
            <S.Td>User Name</S.Td>
            <S.Td>Last Active</S.Td>
            <S.Td>Attached Policies</S.Td>
            <S.Td>User ID</S.Td>
            <S.Td>Type</S.Td>
          </S.Thead>
          <S.Tbody>
            {filteredData.map((row, index) => (
              <S.Tr key={index} type={true} onClick={() => GenDetailData(row)}>
                <S.Td>
                  <S.StatusIcon type={true} />
                </S.Td>
                <S.Td>{row.UserName}</S.Td>
                <S.Td>{row.AccessKeysLastUsed[0]?.LastUsedDate || "N/A"}</S.Td>
                <S.Td>
                  {row.AttachedPolicies.length > 0
                    ? row.AttachedPolicies.join("\n")
                    : "No Policies"}
                </S.Td>
                <S.Td>{row.UserId}</S.Td>
                <S.Td>
                  <S.TypeIconWrapper>
                    <S.TypeIcon color={type[index % 3][1]}>
                      {type[index % 3][0]}
                    </S.TypeIcon>
                  </S.TypeIconWrapper>
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
