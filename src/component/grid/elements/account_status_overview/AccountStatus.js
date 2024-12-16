import * as S from "./AccountStatus_styel";
import { useState, useEffect } from "react";
import Dropdown from "../../../toggle/dropdown/DropDown";
import GetIAM from "../../../hook/users/GetIAM";
import Loading2 from "../../../toggle/loading2/loading2";

const type = ["#6A4FA3", "#216261", "#CD62B0"];

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
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("none");
  const [filteredData, setFilteredData] = useState(data);
  const [nowloading, setnowloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setnowloading(true);
      const GetData = await GetIAM();
      console.log(GetData.IAMUser);
      setData(GetData.IAMUser);
      setnowloading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // includes 메서드를 사용하여 대소문자 구분 없이 부분 일치를 찾습니다.
    const filtered = data.filter((user) => {
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
    setFilteredData(data);
  };

  return (
    <S.Wrapper>
      <S.Title>
        <p>IAM Status Overview</p>
        <S.FilterWrapper>
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
        </S.FilterWrapper>
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
            {nowloading ? (
              <Loading2 />
            ) : (
              data.map((row, index) => (
                <S.Tr
                  key={index}
                  type={true}
                  onClick={() => GenDetailData(row, "iam")}
                >
                  <S.Td>
                    <S.StatusIcon type={true} />
                  </S.Td>
                  <S.Td>{row.UserName}</S.Td>
                  <S.Td>
                    {row.AccessKeysLastUsed[0]?.LastUsedDate || "N/A"}
                  </S.Td>
                  <S.Td>
                    {row.AttachedPolicies.map((item) => (
                      <li>{item.PolicyName}</li>
                    ))}
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
              ))
            )}
          </S.Tbody>
        </S.Table>
      </S.TableWrapper>
    </S.Wrapper>
  );
};

export default AccountStatus;
