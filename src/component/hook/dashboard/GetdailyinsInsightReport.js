const DailyInsight = async () => {
  try {
    const response = await fetch(
      `/server/api/v1/dashboard/daily-insight?user_id=1`,
      {
        method: "GET",
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

export default DailyInsight;