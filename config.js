const configData = require('./config.json');
const path = require('path');

// location of our temporary repo storage
function getRepoStorageDir() {
    return path.join(__dirname, '..', 'tpw_clients');
}

const repos = configData.repos.map((x) => {
    return {
        // copy all properties from config.json
        ...x,
        // generate a local path for our temporary git repo to be stored
        localPath: path.join(getRepoStorageDir(), `tpw_${x.id}`),
        additionalProperties: {
            ...x.additionalProperties || {},
            // generate some standard properties (if they don't already exist)
            projectRepository: x.additionalProperties?.projectRepository || x.url,
            projectLicense: x.additionalProperties?.projectLicense || "MIT",
            projectOrganization: x.additionalProperties?.projectOrganization || "ThemeParks",
            projectDescription: x.additionalProperties?.projectDescription || `A ${x.name} client for the ThemeParks.Wiki API`,
            projectName: x.additionalProperties?.projectName || "themeparks",
            name: x.additionalProperties?.name || "themeparks",
        }
    };
});

function getRepos() {
    return repos;
}

module.exports = {
    getRepos,
    getRepoStorageDir,
};
