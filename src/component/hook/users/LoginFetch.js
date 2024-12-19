const LoginformHook = async (Uname, Upw) => {
  const body = JSON.stringify({
    user_name: Uname,
    user_password: Upw,
  });
  console.log(body);
  try {
    const url = `/server/api/v1/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json", // Content-Type 헤더 추가
      },
      body: body,
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default LoginformHook;
