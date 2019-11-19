## k8s-wait

This utility is designed to be used as a Kubernetes `initContainer` that will wait for another service, job, or pod to become available before exiting.

## Why did you write this?

The original intent was to lessen the dependency on using Helm Hooks with the `--wait` flag to delay running jobs until services were started. Using Helm in this way had some issues because it waits for _all_ pods to be running, not just certain ones that are actual dependencies.

This project was heavily inspired by [groundnuty/k8s-wait-for](https://github.com/groundnuty/k8s-wait-for) but I had several issues using that script. I wanted to rewrite it in a language that could be easily unit tested. The resulting docker image for this project is larger than `k8s-wait-for` but in my opinion the easy of reading the code and the ability to rely on propper unit tests outweighs the image size.

## Why are there 2 images? (why a client and server?)

You will notice that this utility is split into a server portion that runs as it's own service, and a client portion that is intended to run in an init container.

This is because determining the status of jobs and services requires certain permissions on RBAC enabled clusters. Kubernetes requires that all containers defined by a deployment use the same `ServiceAccount`. This means that if the `initContainers` themselves were to check the pod states, you would have to add permissions to any `ServiceAccounts` in use, or add them to `default`. Adding permissions to `default` can be dangerous and expose information that should be secret.

To circumvent this, there is a server portion that can run with it's own `ServiceAccount` to grant it permissions. Then the `initContainer`-based client portion can simply query the server for status, without needing special permissions, and without risking exposing job and service definitions.

# Usage

Normal practice would be to use the prebuilt image off DockerHub as an `initContainer`, and pass in the dependencies to wait for as parameters.

(to be defined)

# Contributing

This project is built as a `yarn` monorepo.

To install dependencies:
```
yarn install
```

To run tests for both client and server:
```
yarn test
```

To build docker images for both client and server:
```
yarn build
```

To cut a new version:
```
./scripts/publish.sh {next version number}
```
for example:
```
./scripts/publish.sh 1.2.3
```
will build docker images with the version number as the label, update `package.json` to the version, and make a `git` commit and tag with this version number.
