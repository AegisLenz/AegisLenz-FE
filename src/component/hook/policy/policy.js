const GetPolicy = async () => {
  try {
    const response = await fetch(`/server/api/v1/policy/asset/1/policy`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const Data = await response.json();
    return Data;
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

export default GetPolicy;
