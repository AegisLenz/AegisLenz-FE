const CreatePrompt = async () => {
  try {
    const response = await fetch(`/server/api/v1/prompt/`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const Session = await response.json();
    return Session;
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

export default CreatePrompt;
