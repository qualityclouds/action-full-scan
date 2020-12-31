const core = require('@actions/core');
const exec = require('@actions/exec');
const _ = require('lodash');

async function run() {

    try {
        let workspace = process.env.GITHUB_WORKSPACE;
        let currentRunnerID = process.env.GITHUB_RUN_ID;
        let repoName = process.env.GITHUB_REPOSITORY;
        let token = core.getInput('token');
        let docker_name = "qualityclouds/pipeline-salesforce";
       

        console.log('starting the program');
        console.log('github run id :' + currentRunnerID);

     
        await exec.exec(`docker pull ${docker_name} -q`);
        let command = (`docker run --user root -v ${workspace}:/code/:rw --network="host" -e QC_API_KEY=${token} -e ISSUES_THRESHOLD=0 -e TECHDEBT_THRESHOLD=0 -e SEVERITY_THRESHOLD=1 -e diff_mode="1" -t ${docker_name} sf-scan`);


        try {
            await exec.exec(command);
        } catch (err) {
            core.setFailed('failed to scan the target: ' + err.toString());
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
