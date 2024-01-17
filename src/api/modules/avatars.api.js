import privateClient from "../clients/private.client";

const avatarsEndpoint = {
  avatars: "/avatars",
  avatarById: ({ id }) => `/avatars/${id}`,
};

const avatarsApi = {
  getAllAvatars: async () => {
    try {
      const response = await privateClient.get(avatarsEndpoint.avatars);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAvatarCharactersByAvatarId: async ({ id }) => {
    try {
      const response = await privateClient.get(
        avatarsEndpoint.avatarById({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default avatarsApi;
