// script to commit an update to a git repo
const simpleGit = require('simple-git');
const config = require('./config.js');

async function commitUpdateToRepo(repoPath) {
    const repo = simpleGit(repoPath);
    await repo.add('./*');
    await repo.commit('Update generated client files');
    await repo.push('origin', 'main');
}

async function run() {
    const repos = config.getRepos();
    for(const repo of repos) {
        try {
            await commitUpdateToRepo(repo.localPath);
        } catch(e) {
            console.error(`Error: Could not commit repo: ${repo.url}`);
            console.error(e);
        }
    }
}

run();
