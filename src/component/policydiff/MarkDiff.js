import React, { useEffect, useState } from "react";
import DiffViewer from "react-diff-viewer-continued";
import * as S from "./MarkDiff_style";
// import dataFromJson from "./data.json"; // Assume data is stored in data.json
import GetPolicyData from "../hook/policy/policy";
import Loading2 from "../toggle/loading2/loading2";

const MarkDiff = () => {
  const [data, setData] = useState(null); // State to store fetched data
  const [usernames, setUsernames] = useState([]); // Usernames list
  // eslint-disable-next-line no-unused-vars
  const [selectedUser, setSelectedUser] = useState(""); // Selected username
  const [existingPolicies, setExistingPolicies] = useState([]); // Existing policies
  const [proposedPolicies, setProposedPolicies] = useState([]); // Proposed policies
  const [newValue, setNewValue] = useState(""); // Existing policy content for diff
  const [oldValue, setOldValue] = useState(""); // Proposed policy content for diff
  const [nowLoading, setLoading] = useState(true); // Loading state

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await GetPolicyData();
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // const fetchedData = dataFromJson;
        console.log(fetchedData);

        // Set fetched data to state
        setData(fetchedData);

        // Extract usernames and initialize state
        const fetchedUsernames = Object.keys(fetchedData.original_policy);
        setUsernames(fetchedUsernames);
        setSelectedUser(fetchedUsernames[0]); // Set first user as default

        // Initialize policies
        const firstUser = fetchedUsernames[0];
        setExistingPolicies(fetchedData.original_policy[firstUser] || []);
        setProposedPolicies(
          fetchedData.least_privilege_policy[firstUser] || []
        );
        setNewValue(
          JSON.stringify(
            fetchedData.original_policy[firstUser]?.[0]?.PolicyDocument || "",
            null,
            2
          )
        );
        setOldValue(
          JSON.stringify(
            fetchedData.least_privilege_policy[firstUser]?.[0]
              ?.PolicyDocument || "",
            null,
            2
          )
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch policy data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle user selection
  const handleUserSelection = (username) => {
    setSelectedUser(username);
    setExistingPolicies(data.original_policy[username]);
    setProposedPolicies(data.least_privilege_policy[username] || []);
    setNewValue(
      JSON.stringify(data.original_policy[username][0]?.PolicyDocument, null, 2)
    );
    setOldValue(
      JSON.stringify(
        data.least_privilege_policy[username]?.[0]?.PolicyDocument,
        null,
        2
      )
    );
  };

  return (
    <S.Wrapper>
      {nowLoading ? (
        <Loading2 />
      ) : (
        <S.Wrapper2>
          <S.IndexWrapper>
            <S.IndexArea>
              <S.IndexAreaTitle>
                <h1>IAM Username</h1>
              </S.IndexAreaTitle>
              <S.IndexArea2>
                {usernames.map((username, index) => (
                  <S.Policy_index
                    key={index}
                    onClick={() => handleUserSelection(username)}
                    style={{
                      backgroundColor:
                        selectedUser === username ? "#689D8C" : "#104F55", // 선택된 username 배경색
                    }}
                  >
                    {username}
                  </S.Policy_index>
                ))}
              </S.IndexArea2>
            </S.IndexArea>

            <S.IndexArea>
              <S.IndexAreaTitle>
                <h1>{`User\nPrivilige Policy`}</h1>
              </S.IndexAreaTitle>
              <S.IndexArea3>
                <h1>-existing policy-</h1>
                <S.IndexArea4>
                  {existingPolicies.map((policy, index) => (
                    <S.Policy_index
                      key={index}
                      onClick={() =>
                        setNewValue(
                          JSON.stringify(policy.PolicyDocument, null, 2)
                        )
                      }
                      style={{
                        backgroundColor:
                          JSON.stringify(policy.PolicyDocument, null, 2) ===
                          newValue
                            ? "#689D8C"
                            : "#104F55",
                      }}
                    >
                      {policy.PolicyName}
                    </S.Policy_index>
                  ))}
                </S.IndexArea4>
                <h1>-proposed policy-</h1>
                <S.IndexArea4>
                  {proposedPolicies.map((policy, index) => (
                    <S.Policy_index
                      key={index}
                      onClick={() =>
                        setOldValue(
                          JSON.stringify(policy.PolicyDocument, null, 2)
                        )
                      }
                      style={{
                        backgroundColor:
                          JSON.stringify(policy.PolicyDocument, null, 2) ===
                          oldValue
                            ? "#689D8C"
                            : "#104f55",
                      }}
                    >
                      {policy.PolicyName}
                    </S.Policy_index>
                  ))}
                </S.IndexArea4>
              </S.IndexArea3>
            </S.IndexArea>
          </S.IndexWrapper>
          <S.ViLine></S.ViLine>

          {/* Policy Differences */}
          <S.ContentAreaWrapperWrapper>
            <S.ContentArea>
              <S.ContentAreaTitle>
                <h1>Existing Policy</h1>
              </S.ContentAreaTitle>
              <S.DataArea>
                <pre>{newValue}</pre>
              </S.DataArea>
            </S.ContentArea>
            <S.ContentArea>
              <S.ContentAreaTitle>
                <h1>Privilige Policy</h1>
              </S.ContentAreaTitle>
              <S.DataArea>
                <pre>{oldValue}</pre>
              </S.DataArea>
            </S.ContentArea>
          </S.ContentAreaWrapperWrapper>
        </S.Wrapper2>
      )}
    </S.Wrapper>
  );
};

export default MarkDiff;
