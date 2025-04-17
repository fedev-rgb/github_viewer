import OctokitService from './OctokitService';

const octokitService = new OctokitService();

export async function sentRequestToObtainRepos({ org, perPage = 10, page = 1} ) {
  try {
    const response = await octokitService.getOctokit().request(`GET /orgs/${org}/repos?per_page=${perPage}&page=${page}&type=public`, {
      org: 'ORG',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json'
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}
