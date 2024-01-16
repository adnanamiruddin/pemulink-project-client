import privateClient from "../clients/private.client";

const competitionsEndpoint = {
  competitions: "/competitions",
  competitionById: ({ id }) => `/competitions/${id}`,
  missionsByCompetitionId: ({ id }) => `/competitions/${id}/missions`,
};

const competitionsApi = {
  // createCompetition: async ({ name, description, startDate, endDate }) => {
  //   try {
  //     const response = await privateClient.post(
  //       competitionsEndpoint.competitions,
  //       {
  //         name,
  //         description,
  //         startDate,
  //         endDate,
  //       }
  //     );
  //     return { response };
  //   } catch (error) {
  //     return { error };
  //   }
  // },

  getAllCompetitions: async () => {
    try {
      const response = await privateClient.get(
        competitionsEndpoint.competitions
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getCompetitionById: async ({ id }) => {
    try {
      const response = await privateClient.get(
        competitionsEndpoint.competitionById({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  // updateCompetition: async ({ id, name, description, startDate, endDate }) => {
  //   try {
  //     const response = await privateClient.put(
  //       competitionsEndpoint.competitionById({ id }),
  //       {
  //         name,
  //         description,
  //         startDate,
  //         endDate,
  //       }
  //     );
  //     return { response };
  //   } catch (error) {
  //     return { error };
  //   }
  // },

  // deleteCompetition: async ({ id }) => {
  //   try {
  //     const response = await privateClient.delete(
  //       competitionsEndpoint.competitionById({ id })
  //     );
  //     return { response };
  //   } catch (error) {
  //     return { error };
  //   }
  // },

  getAllMissionsByCompetitionId: async ({ id }) => {
    try {
      const response = await privateClient.get(
        competitionsEndpoint.missionsByCompetitionId({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default competitionsApi;
