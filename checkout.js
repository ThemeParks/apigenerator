// script to commit an update to a git repo
const simpleGit = require('simple-git');
const fs = require('fs');

const config = require('./config.js');

async function checkoutRepo(repoDir, repoURL) {
  const repo = simpleGit();
  await repo.clone(repoURL, repoDir);
}

async function run() {
    // clear out any existing clients
    const repoStorageDir = config.getRepoStorageDir();
    console.log('Clearing out generated client files...');
    fs.rmSync(repoStorageDir, { recursive: true, force: true });

    // check that folder was deleted
    if (fs.existsSync(repoStorageDir)) {
        console.error('Error: Could not delete folder: ' + repoStorageDir);
        return;
    }

    const repos = config.getRepos();
    for(const repo of repos) {
        try {
            console.log(`Checking out ${repo.name}...`);
            await checkoutRepo(repo.localPath, repo.url);
        } catch(e) {
            console.error(`Error: Could not clone repo: ${repo.url}`);
            console.error(e);
        }
    }
}

run();
