# Build Check for Salesforce - Github Action

Build Check for Salesforce - Github Action enables you to scan your code against three levels of controls: Salesforce best practices, industry standards, and Quality Clouds own recommendations. It helps you optimize the automation of your continuous quality and release management with centralized quality gates.

## Inputs

### `token`

**Required** You need to provide a valid API key to connect the Quality Clouds ruleset against which your code will be checked. 
To obtain an API key, contact your Quality Clouds admin. If you're an admin, check the [Administering API keys article](https://docs.qualityclouds.com/qcd/administering-api-keys-31721787.html).

### `mode`

**optional** . Options: local/cloud. Default mode: local. local mode performs a live check of the files. cloud mode runs a scan against the branch of the repository where the action is performed. 

### `review`

**optional** Only used if mode == cloud. Boolean. default false. If true, scan will create a pull request review with inline comments with the issues 

### `allIssues`

**optional** Only used if mode == cloud. Boolean. default false. If true, scan results will show blockers and no blocker issues


## Example usage

```
steps:
  - name: Quality Clouds Build Check for Salesforce
    uses: qualityclouds/action-full-scan@1.0.0
    with:
      token: 'your-token'
      mode: cloud
      review: true
```
