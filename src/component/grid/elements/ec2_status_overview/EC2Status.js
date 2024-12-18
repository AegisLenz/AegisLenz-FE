import * as S from "./EC2Status_styel";
import { useEffect, useState } from "react";
import Dropdown from "../../../toggle/dropdown/DropDown";
import getEC2 from "../../../hook/users/GetEC2";
import Loading2 from "../../../toggle/loading2/loading2";

const filterOptions = [
  { label: "== none ==", value: "none" },
  { label: "Instance ID", value: "InstanceId" },
  { label: "State", value: "State" },
  { label: "Name", value: "Name" },
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
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("none");
  const [filteredData, setFilteredData] = useState(data);
  const [nowloading, setnowloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setnowloading(true);
      try {
        const GetData = await getEC2();
        setData(GetData.EC2);
      } catch (e) {
        console.log(e);
      } finally {
        setnowloading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = data.filter((instance) => {
      switch (filterCategory) {
        case "none":
          return instance;
        case "InstanceId":
          return instance.InstanceId.toLowerCase().includes(value);
        case "State":
          return instance.State.toLowerCase().includes(value);
        case "Name":
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
    setFilteredData(data);
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
            <S.Td>arn</S.Td>
            <S.Td>Instance ID</S.Td>
            <S.Td>Security Groups</S.Td>
            <S.Td>Public IP Address</S.Td>
            <S.Td>Private IP Address</S.Td>
          </S.Thead>
          {nowloading ? (
            <Loading2 />
          ) : (
            <S.Tbody>
              {filteredData.lignth >= 0
                ? filteredData.map((item) => (
                    <S.Tr
                      key={item.InstanceId}
                      onClick={() => GenDetailData(item, "ec2")}
                    >
                      <S.Td>
                        <S.StatusIcon color={StateColorTable[item.State]} />
                      </S.Td>
                      <S.Td>{item.Tags[0].Value}</S.Td>
                      <S.Td>{item.IamInstanceProfile.Arn}</S.Td>
                      <S.Td>{item.IamInstanceProfile.Id}</S.Td>
                      <S.Td>
                        {item.SecurityGroups.map((item) => (
                          <li>{item.GroupId}</li>
                        ))}
                      </S.Td>
                      <S.Td>{item.PublicIpAddress}</S.Td>
                      <S.Td>{item.PrivateIpAddress}</S.Td>
                    </S.Tr>
                  ))
                : data.map((item) => (
                    <S.Tr
                      key={item.InstanceId}
                      onClick={() => GenDetailData(item, "ec2")}
                    >
                      <S.Td>
                        <S.StatusIcon color={StateColorTable[item.State]} />
                      </S.Td>
                      <S.Td>{item.Tags[0].Value}</S.Td>
                      <S.Td>{item.IamInstanceProfile.Arn}</S.Td>
                      <S.Td>{item.IamInstanceProfile.Id}</S.Td>
                      <S.Td>
                        {item.SecurityGroups.map((item) => (
                          <li>{item.GroupId}</li>
                        ))}
                      </S.Td>
                      <S.Td>{item.PublicIpAddress}</S.Td>
                      <S.Td>{item.PrivateIpAddress}</S.Td>
                    </S.Tr>
                  ))}
            </S.Tbody>
          )}
        </S.Table>
      </S.TableWrapper>
    </S.Wrapper>
  );
};

export default EC2Status;
