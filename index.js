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
        let api_url = core.getInput('api_url');
        let api_url_param= "";
        let reporter="";
        if(api_url != null && api_url != "") api_url_param = `-e API_URL=${api_url}`;
       
        let branch = ref.replace("refs/heads/", "")

        if(mode == null) mode = "local";

        let version = core.getInput('version');
        if(version == null) version = "latest";

        let operation = "PUSH";
        let headRef = process.env.GITHUB_HEAD_REF;
        let baseRef = process.env.GITHUB_BASE_REF;
        if(headRef != null && headRef != ""){
            console.log('base :' + baseRef + ' head :' + headRef);
            operation = "PR";
            reporter = "github-pr-check";
            branch = headRef.replace("refs/heads/", "")
        }

        const fs = require('fs');
        const eventPath = process.env.GITHUB_EVENT_PATH;

        const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));

        const pullNumber = eventData.pull_request?.number;

        const review = core.getInput('review');
        const allIssues = core.getInput('allIssues');
        const gitHubToken = core.getInput('gitHubToken');
        
        console.log('HOLA???');
        console.log('starting the scan');
        console.log('github run id :' + currentRunnerID);
        console.log('mode :' + mode);
        console.log('url_id :' + url_id);
        console.log('branch :' + branch);
        console.log('review :' + review);
        console.log('core.getInput(review) :' + core.getInput('review'));
        console.log('ADIOSSS???');
     
        await exec.exec(`docker pull ${docker_name} -q`);
        let command = (`docker run --user root -v ${workspace}:/src/:rw --network="host" ${api_url_param} 
                -e REPO_URL=${repoUrl} 
                -e QC_API_KEY=${token} 
                -e diff_mode="1" 
                -e MODE=${mode} 
                -e URL_ID=${url_id} 
                -e BRANCH=${branch} 
                -e OPERATION=${operation} 
                -e PR_NUMBER=${pullNumber}
                -e REPORTER=${reporter}
                -e REPORTER_TOKEN=${gitHubToken}
                -e REVIEW=${review}
                -e ALL_ISSUES=${allIssues}
                
                -t ${docker_name}:${version} sf-scan`);


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
