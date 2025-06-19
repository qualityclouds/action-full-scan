

![BANNER](https://github.com/user-attachments/assets/c5fe2e36-5c2c-4655-a732-27273064042a)

1. [Built for Salesforce. Designed for GitHub.](#built-for-salesforce-designed-for-github)
2. [What Is Quality Clouds?](#what-is-quality-clouds)
3. [Why Your Linter Isn’t Enough](#why-your-linter-isnt-enough)
4. [For Builders and Gatekeepers](#for-builders-and-gatekeepers)
5. [Set It Up Once. Scan Every Pull Request.](#set-it-up-once-scan-every-pull-request)
6. [Use with Your Existing Quality Clouds License](#use-with-your-existing-quality-clouds-license)
7. [Configuration Inputs and Options](#configuration-inputs-and-options)
8. [What You’ll See That Others Don’t](#what-youll-see-that-others-dont)
9. [Get Started in Under a Minute](#get-started-in-under-a-minute)
10. [Need Help or Want to Learn More?](#need-help)

## Built for Salesforce. Designed for GitHub.

<p><strong>Quality Clouds Build Check for Salesforce</strong> brings platform-specific governance directly into your GitHub workflow.</p>
<p>Whether you're managing metadata, enforcing org-wide naming standards, or safeguarding production from non-compliant changes, this GitHub Action delivers instant, actionable insights when a <strong> pull request </strong> is opened.</p>
<p>It’s the ultimate native pull request tool designed specifically for Salesforce teams, <strong>trusted by enterprise architects, release managers, and developers</strong> who care about getting it right before anything ships.</p>

**Because when code lives in GitHub but breaks in production, generic linters aren't enough.**

## What Is Quality Clouds?

<p><strong>Quality Clouds is the AI-powered governance layer</strong> built for enterprise platforms, starting with Salesforce.</p>
<p>We go beyond generic code checks by scanning platform-specific configurations, metadata, and code against your org’s quality and compliance KPIs.</p>
<p>Trusted by <strong>Fortune 500 teams</strong>, Quality Clouds helps developers, architects, and release managers catch issues early, enforce standards automatically, and ship with confidence- now directly from GitHub.</p>

![PARTNERS_CLIENTS LOGOS](https://github.com/user-attachments/assets/d6e4211e-11c8-4974-bb13-62320f6dfcf5)


## Why Your Linter Isn’t Enough

<p>Most linters catch syntax and formatting issues. But:</p>
<ul>
  <li>They don’t understand Salesforce.</li>
  <li>They miss metadata risks, naming violations, and org-specific rules that can break releases..</li>
</ul>

<p>Quality Clouds checks code, configuration, and compliance in one scan. Everything is aligned to your platform’s standards.

Because clean code isn’t enough. It has to be correct for your environment. </p>

![LINTERS VS QC](https://github.com/user-attachments/assets/161f0c2a-f4a0-4fde-8d0e-241fff6f2845)

## For Builders and Gatekeepers

<h3>For Developers</h3>
<p>Get <strong>instant feedback</strong> inside GitHub. See what needs fixing, why it matters, and how to resolve it before code review. Reduce back-and-forth, avoid late rework, and improve with every pull request.</p>

<h3>For Release Managers & Architects</h3>
<p>Enforce platform standards automatically while keeping teams moving. Gain <strong>visibility into every pull request</strong>, apply organization-specific rules, and ensure only compliant code moves forward.

This is how quality becomes part of the process, not a blocker at the end.
</p>



## Set It Up Once. Scan Every Pull Request.

<ol>
  <li>Install the Quality Clouds Build Check plugin from the GitHub Marketplace</li>
  <li>Add your API key to your YAML file</li>
  <li>Open a pull request and the scan runs automatically </li>
  <li>Review and approve directly in GitHub with clear, inline results</li>
</ol>

<p>No tool switching. No extra setup. Just instant feedback where your team already works.
</p>


## Use with Your Existing Quality Clouds License

<p>If you already have a Quality Clouds license, you’re ready to go. Just connect your account using your API key and start scanning pull requests right inside GitHub.
</p>

<p><strong>New to Quality Clouds?</strong> <a href="https://marketing.qualityclouds.com/meet-quality-clouds">Reach out to us</a> and we’ll help you get started with the right plan for your team.</p>

This GitHub Action is built to extend the value of your existing platform governance -seamlessly, without switching tools.

<hr />

<h2>Configuration Inputs and Options</h2>

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>token</code></td>
      <td>✅ Yes</td>
      <td>You need to provide a valid API key to connect the Quality Clouds ruleset against which your code will be checked. To obtain an API key, contact your Quality Clouds admin. If you're an admin, check the <a href="https://qualityclouds.com/documentation/qc/admin-portal-overview/administering-api-keys/">Administering API keys article</a>. 
    </tr>
    <tr>
      <td><code>mode</code></td>
      <td>Optional</td>
      <td><code>local</code> (default) or <code>cloud</code>. Local mode performs a live check of the files. Cloud mode runs a scan against the branch of the repository where the action is performed.</td>
    </tr>
    <tr>
      <td><code>review</code></td>
      <td>Optional</td>
      <td><code>true</code> adds inline PR comments. Only used in <code>cloud</code> mode.</td>
    </tr>
    <tr>
      <td><code>allIssues</code></td>
      <td>Optional</td>
      <td><code>true</code> shows blockers + non-blockers. Only used in <code>cloud</code> mode.</td>
    </tr>
    <tr>
      <td><code>gitHubToken</code></td>
      <td>Optional</td>
      <td>Only used if<code>review</code> is <code>true</code>.</td>
    </tr>
    <tr>
      <td><code>pr_fails_on_blockers</code></td>
      <td>Optional</td>
      <td>Only used if<code>review</code> is <code>true</code>. Determine if the PR should be marked as failed when the Quality Gate does not pass.</td>
    </tr>    
  </tbody>
</table>

## Example Usage

```# This is a basic workflow to help you get started with Actions   
name: QualityClouds

# Controls when the action will run. 
on:
  # Triggers the workflow on push or pull request events
  push:
  pull_request:
  
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v2

      - name: Quality Clouds Scan
        uses: qualityclouds/action-full-scan@2.0.0
        with:
          mode: cloud
          token: 'MyGitQCToken'
          review: True 
          allIssues: True 
          gitHubToken: 'MyGitHubToken'
          pr_fails_on_blockers: True
```


## What You’ll See That Others Don’t

Quality Clouds Build Check gives you visibility that generic linters miss, because it understands Salesforce, not just syntax.
<ul>
  <li><strong>Automated Branch Scans</strong> – Automatically trigger code and configuration scans on every pull request.  
.</li>
  <li><strong>Integrated Quality Gates</strong> – Enforce your org’s specific compliance and quality rules before merge.  
</li>
  <li><strong>Inline Issue Reporting</strong> – See exactly what’s wrong, where it is, how severe it is, and how to fix it, right inside GitHub.</li>
  <li><strong>Context-Aware Feedback</strong> – Developers get real-time insights where they code, improving quality and learning on the go.</li>
  <li><strong>Simple API-Key Setup</strong> – Connect securely in minutes, no complex setup or switching tools.</li>

This is quality governance, not just linting. And it’s built for how Salesforce teams actually work.
</ul>

## Get Started in Under a Minute

1.  Install from the GitHub Marketplace  
     
2.  Paste your API key in the YAML  
       
3.  Open a PR and start scanning instantly

That’s it. No tool switching, no complex configuration. Just instant visibility and quality control built into every GitHub workflow

## Need Help?

<p>We’re here to support you every step of the way. Visit our <a href="https://docs.qualityclouds.com">our documentation</a> for setup, API key management, and advanced configuration options.</p>

<p><strong>Still need support?</strong></p>
<ul>
  <li>📧 <a href="mailto:support@qualityclouds.com">support@qualityclouds.com</a></li>
  <li>💼 <a href="mailto:sales@qualityclouds.com">sales@qualityclouds.com</a></li> 
</ul>

<p>We’ve got you covered—whether you’re evaluating or already scanning.</p>
