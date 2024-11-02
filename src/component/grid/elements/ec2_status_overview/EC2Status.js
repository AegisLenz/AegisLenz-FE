import * as S from "./EC2Status_styel";
import { useState } from "react";
import Dropdown from "../../../toggle/dropdown/DropDown";

const testData = [
 
  {
    InstanceId: "i-0414709f97c9f57ab",
    InstanceType: "m4.xlarge",
    LaunchTime: "2024-10-28 05:18:07+00:00",
    State: "stopped",
    PublicIpAddress: "23.23.93.131",
    PrivateIpAddress: "172.31.31.6",
    VpcId: "vpc-0dbe0a6580324b276",
    SubnetId: "subnet-07fd226de3eb38cff",
    SecurityGroups: [
      {
        GroupId: "sg-003e38535e03835b8",
        GroupName: "default",
      },
      {
        GroupId: "sg-aege",
        GroupName: "2222",
      },
    ],
    Tags: [
      {
        Key: "Name",
        Value: "AegisLenz-ELK",
      },
    ],
  },
];

const filterOptions = [
  { label: "== none ==", value: "none" },
  { label: "Instance ID", value: "InstanceId" },
  { label: "State", value: "State" },
  { label: "Name", value: "Tags" },
  { label: "Public IP Address", value: "PublicIpAddress" },
  { label: "Private IP Address", value: "PrivateIpAddress" },
];

const StateColorTable = {
  pending: "orange", // 시작 중
  running: "green", // 실행 중
  stopping: "yellow", // 중지 중
  stopped: "lightgray", // 중지됨
  "shutting-down": "purple", // 종료 작업 중
  terminated: "red", // 종료됨
};

const EC2Status = ({ GenDetailData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("none");
  const [filteredData, setFilteredData] = useState(testData);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = testData.filter((instance) => {
      switch (filterCategory) {
        case "none":
          return instance;
        case "InstanceId":
          return instance.InstanceId.toLowerCase().includes(value);
        case "State":
          return instance.State.toLowerCase().includes(value);
        case "Tags":
          return instance.Tags[0]?.Value.toLowerCase().includes(value);
        case "PublicIpAddress":
          return (
            instance.PublicIpAddress && instance.PublicIpAddress.includes(value)
          );
        case "PrivateIpAddress":
          return (
            instance.PrivateIpAddress &&
            instance.PrivateIpAddress.includes(value)
          );
        default:
          return false;
      }
    });

    setFilteredData(filtered);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilterCategory("none");
    setFilteredData(testData);
  };

  return (
    <S.Wrapper>
      <S.Title>
        <p>EC2 Status Overview</p>
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
            <S.Td>Name</S.Td>
            <S.Td>Instance ID</S.Td>
            <S.Td>Security Groups</S.Td>
            <S.Td>Public IP Address</S.Td>
            <S.Td>Private IP Address</S.Td>
          </S.Thead>
          <S.Tbody>
            {filteredData.map((item) => (
              <S.Tr key={item.InstanceId} onClick={() => GenDetailData(item, "ec2")}>
                <S.Td>
                  <S.StatusIcon color={StateColorTable[item.State]} />
                </S.Td>
                <S.Td>{item.Tags[0]?.Value}</S.Td>
                <S.Td>{item.InstanceId}</S.Td>
                <S.Td>
                  {item.SecurityGroups.map((obj, idx) => (
                    <li key={idx}>{obj.GroupId}</li>
                  ))}
                </S.Td>
                <S.Td>{item.PublicIpAddress}</S.Td>
                <S.Td>{item.PrivateIpAddress}</S.Td>
              </S.Tr>
            ))}
          </S.Tbody>
        </S.Table>
      </S.TableWrapper>
    </S.Wrapper>
  );
};

export default EC2Status;
