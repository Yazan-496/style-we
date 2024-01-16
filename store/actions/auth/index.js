export const RegisterGuestReducer = (data) => ({
  type: "REGISTER_GUEST_REDUCERS",
  payload: data,
});

export const startAuthLoading = () => ({
  type: "AUTH_START_LOADING",
});

export const stopAuthLoading = () => ({
  type: "AUTH_STOP_LOADING",
});
