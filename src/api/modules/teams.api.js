import privateClient from "../clients/private.client";

const teamsEndpoint = {
  teams: ({ competitionId }) => `/competitions/${competitionId}/teams`,
  joinTeam: ({ competitionId }) => `/competitions/${competitionId}/teams/join`,
  teamById: ({ competitionId, teamId }) =>
    `/competitions/${competitionId}/teams/${teamId}`,
};

const teamsApi = {
  createTeam: async ({ competitionId, name, avatarId, characterId }) => {
    try {
      const response = await privateClient.post(
        teamsEndpoint.teams({ competitionId }),
        {
          name,
          avatarId,
          characterId,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  joinTeam: async ({ competitionId, code }) => {
    try {
      const response = await privateClient.post(
        teamsEndpoint.joinTeam({ competitionId }),
        {
          code,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  chooseCharacter: async ({ competitionId, teamId, characterId }) => {
    try {
      const response = await privateClient.put(
        teamsEndpoint.teamById({ competitionId, teamId }),
        {
          characterId,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getTeamDetailById: async ({ competitionId, teamId }) => {
    try {
      const response = await privateClient.get(
        teamsEndpoint.teamById({ competitionId, teamId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default teamsApi;
