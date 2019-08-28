# Enframe

You focus on `src/`, enframe will take care of the rest.

## Script Principles

1. Idempotent
1. Quick (re)execution

## Todos until v1

1. introduce psql
1. webmanifest and mobile friendlyness
1. introduce integration tests
1. Well-order the package.json
1. deploy to app stores?
1. Investigate post-heroku deploy steps. I.e., automated custom domain setup via heroku CLI? Automated domain registration (far-fetched)?
1. Programmatic index.html generation?

## Before enframing

* Ensure you have stored your Gitlab SSH key on your dev machine.
* Ensure you have the Heroku CLI on your dev machine.
* Ensure you have your `HEROKU_API_KEY` stored in Gitlab.
  * You can find your Heroku API key on your Heroku User Settings page online.
  * Copy your Heroku API key into Gitlab in `Settings -> CICD -> Variables`.
  * The deploy step of the gitlab pipeline will fail until you set this key.

## Usage

### From Scratch

1. Create a directory.

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

### To Maintain

```bash
yarn upgrade enframe
yarn enframe
```

A useful aspect of enframe is the ability to no longer worry about application infrastructure. It will take care of it for you while you simply focus of `src/`.

## Notes

* The Gitlab repository does not need to exist before you set it as an upstream. If the repository does not already exist, Gitlab will create the project for you on first push.

* The app name you choose will need to be unique on Heroku. For example, the above app name, `new-app`, will try to create two new application on Heroku, `new-app-staging` and `new-app-prod`. If those heroku app names are taken, you will not be able to make them.
