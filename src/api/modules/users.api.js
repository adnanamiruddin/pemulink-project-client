import publicClient from "../clients/public.client";
import privateClient from "../clients/private.client";

const usersEndpoint = {
  signUp: "/users/sign-up",
  signIn: "/users/sign-in",
  profile: "/users/profile",
  updateToAdmin: ({ id }) => `/users/update-to-admin/${id}`,
};

const userApi = {
  signUp: async ({ email, fullName, password }) => {
    try {
      const response = await publicClient.post(usersEndpoint.signUp, {
        email,
        fullName,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  signIn: async ({ email, password }) => {
    try {
      const response = await publicClient.post(usersEndpoint.signIn, {
        email,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getProfile: async () => {
    try {
      const response = await privateClient.get(usersEndpoint.profile);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
