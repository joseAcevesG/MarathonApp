# MARATHON APP

## Purpose/Description

App designed to be a personalized running coach offering tailored training plans for a variety of goals and skill levels, from beginners to experienced runners aiming for new personal bests.

## How does it work

- From a **user perspective**: [Figma mockups](<https://www.figma.com/file/rs4EtbKcbPdxSGwxnGQhmw/Buy-Insurance-(Community)-(Community)?type=design&node-id=107-557&mode=design&t=Hae9hdYGQbWAMJig-0>)

- From a **developer perspective**:

      npm install
      npm start
      https//localhost:3000

## How to contribute

- **Repo/Folder structure**: [MVC pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

  - Controllers
  - Middlewares
  - Routes
  - Utils
  - Models

- **Tools**:
  - Javascript
  - Jest
  - HTML
  - CSS
  - Handlebars
  - MongoDB
  - Python
  - Pre-commit
- **Requirements**:
  - Node.js
  - Git
  - Repository permissions (To ask for permissions contact a code owner)

### Contribution Process

- **Commit**:

  - Use of the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - Recommended to use the [gitmoji](https://gitmoji.dev/) to make the commits more readable
  - If vs code is used, the [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) extension is recommended

- **Pull request creation**:
  - To merge something to the branches it is needed to create a pull request and that pull request have to pass all the checks and minimum one review
  - The new created branches needs to be name after the feature that is going to be working in that branch
- **Checks/Tests**:
  - Linter
  - Pre-commit
- **Release process**:

  - Main (Develop): This branch is going to be use for the general development of the project
  - Test: This branch is going to be use for the system test so it enables the merge to production
  - Production: This branch its the main versioning for the main app

### Mockups

![Mockup](./resources/mock-home.jpg)
![Mockup](./resources/mock-distance.jpg)
![Mockup](./resources/mock-activities.jpg)
![Mockup](./resources/mock-plan.jpg)
