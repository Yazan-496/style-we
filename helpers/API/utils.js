
export const getAuthToken = () => {
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token;
  }
  return user;
};
export const getLangCode = () => {
  return (
    (typeof window !== "undefined" && localStorage.getItem("language")) || "en"
  );
};
