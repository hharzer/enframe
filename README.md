# Enframe

## Remaining Features to Complete

1. Service worker
1. deploy to app stores?
1. Investigate post-heroku deploy steps. I.e., automated custom domain setup via heroku CLI? Automated domain registration (far-fetched)?
1. Programmatic index.html generation?

## Before enframing

* Ensure you have stored your Gitlab SSH key on your dev machine.
* Ensure you have the Heroku CLI on your dev machine.

## Steps

1. Create a new app.

    ```bash
    mkdir new-app
    cd new-app
    ```

1. Add an `enframe.json` file.

    ```json
    {
      "appName": "new-app",
      "gitlabRemoteSSH": "git@gitlab.com:username/new-app.git"
    }
    ```

1. Add and execute enframe.

    ```bash
    yarn add --dev enframe
    yarn enframe
    ```

## Notes

* A `$HEROKU_API_KEY` needs to be stored in your Gitlab project in order for your `gitlab-ci.yml` file to deploy to Heroku successfully. It is in Heroku User Settings. Copy it into Gitlab under `Settings -> CICD -> Variables`. Until you do this, the deploy steps will fail.
* The Gitlab project does not need to exist before you set it as an upstream. Gitlab can create the project for you on first push.
