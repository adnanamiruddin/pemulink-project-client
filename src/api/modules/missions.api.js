import privateClient from "../clients/private.client";

const missionsEndpoint = {
  missions: "/missions",
  missionById: ({ id }) => `/missions/${id}`,
};

const missionsApi = {
  createMission: async ({ title, description, reward, status }) => {
    try {
      const response = await privateClient.post(missionsEndpoint.missions, {
        title,
        description,
        reward,
        status,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllWeeklyMissions: async () => {
    try {
      const response = await privateClient.get(missionsEndpoint.missions);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getMissionById: async ({ id }) => {
    try {
      const response = await privateClient.get(
        missionsEndpoint.missionById({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateMission: async ({ id, title, description, reward, status }) => {
    try {
      const response = await privateClient.put(
        missionsEndpoint.missionById({ id }),
        {
          title,
          description,
          reward,
          status,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteMission: async ({ id }) => {
    try {
      const response = await privateClient.delete(
        missionsEndpoint.missionById({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default missionsApi;
