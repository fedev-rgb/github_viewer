import { Octokit } from '@octokit/core';

class OctokitService {
  static instance = null;

  constructor() {
    if (OctokitService.instance) {
      return OctokitService.instance;
    }

    this.octokit = new Octokit();
    OctokitService.instance = this;
  }

  getOctokit() {
    return this.octokit;
  }
}

export default OctokitService;
