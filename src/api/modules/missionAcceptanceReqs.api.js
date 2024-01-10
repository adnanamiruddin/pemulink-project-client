import privateClient from "../clients/private.client";

const missionAcceptanceReqsEndpoint = {
  missionAcceptanceReqs: "/mission-acceptance-reqs",
  missionAcceptanceReqById: ({ id }) => `/mission-acceptance-reqs/${id}`,
};

const missionAcceptanceReqsApi = {
  createMissionAcceptanceReq: async ({ id, photoEvidenceURL }) => {
    try {
      const response = await privateClient.post(
        missionAcceptanceReqsEndpoint.missionAcceptanceReqById({ id }),
        {
          photoEvidenceURL,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllMissionAcceptanceReqs: async () => {
    try {
      const response = await privateClient.get(
        missionAcceptanceReqsEndpoint.missionAcceptanceReqs
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getMissionAcceptanceReqById: async ({ id }) => {
    try {
      const response = await privateClient.get(
        missionAcceptanceReqsEndpoint.missionAcceptanceReqById({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateMissionAcceptanceReq: async ({ id, status, message }) => {
    try {
      const response = await privateClient.put(
        missionAcceptanceReqsEndpoint.missionAcceptanceReqById({ id }),
        {
          status,
          message,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default missionAcceptanceReqsApi;
