const config = require('./config.js');
const openapiconfig = require('./openapitools.json');
const fs = require('fs');

async function run() {
    if (!openapiconfig['generator-cli']) {
        openapiconfig['generator-cli'] = {};
    }
    if (!openapiconfig['generator-cli'].version) {
        // a default version number in case the generator-cli version is not set
        openapiconfig['generator-cli'].version = '5.4.0';
    }

    // clear any existing generators
    openapiconfig['generator-cli'].generators = {};

    const repos = config.getRepos();
    for (const repo of repos) {
        const newGenerator = {
            generatorName: repo.generator,
            output: `#{cwd}/../tpw_clients/tpw_${repo.id}`,
            glob: "../themeparksapi/docs/v1.yaml", // TODO
            additionalProperties: repo.additionalProperties || {},
        };

        openapiconfig['generator-cli'].generators[repo.id] = newGenerator;
    }

    // write the updated config file
    fs.writeFileSync('openapitools.json', JSON.stringify(openapiconfig, null, 2));
}

run();
