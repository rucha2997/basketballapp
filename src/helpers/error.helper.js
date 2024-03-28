export const serverErrorCheck = async (response) => {
    if (response.status === 500) {
      const json = await response.json();
      const message = json?.data
        ? `Please report error id '${json.data}' to support.`
        : "Unknown server error, please report to support.";
      throw new Error(message);
    }
  };