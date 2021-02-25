const core = require('@actions/core');
const exec = require('@actions/exec');
const _ = require('lodash');

async function run() {

    try {
        let workspace = process.env.GITHUB_WORKSPACE;
        let currentRunnerID = process.env.GITHUB_RUN_ID;
        let repoUrl = "https://github.com/" +  process.env.GITHUB_REPOSITORY + ".git";
        let ref = process.env.GITHUB_REF;
        let token = core.getInput('token');
        let mode = core.getInput('mode');
        let url_id = core.getInput('url_id');
        let docker_name = "qualityclouds/pipeline-salesforce";
       
        let branch = ref.replace("refs/heads/", "")

        if(mode == null) mode = "local";

        console.log('starting the scan');
        console.log('github run id :' + currentRunnerID);
        console.log('mode :' + mode);
        console.log('url_id :' + url_id);
        console.log('branch :' + branch);

     
        await exec.exec(`docker pull ${docker_name} -q`);
        let command = (`docker run --user root -v ${workspace}:/src/:rw --network="host" -e REPO_URL=${repoUrl} -e QC_API_KEY=${token} -e diff_mode="1" -e MODE=${mode} -e URL_ID=${url_id} -e BRANCH=${branch} -t ${docker_name} sf-scan`);


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
