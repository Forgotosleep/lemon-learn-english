import server from "../../apis/server";

export function login(data) {
  return async (dispatch, getState) => {
    try {
      const resp = await server({
        url: "/login",
        method: "POST",
        data,
      });

      localStorage.setItem("access_token", resp.data.access_token);
      return true;
    } catch (err) {
      return false;
    }
  };
}
