const GetBookmark = async (bookmark_id) => {
  try {
    const response = await fetch(
      `/server/api/v1/users/bookmark/${bookmark_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

export default GetBookmark;
