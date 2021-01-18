# PaymentSimulation

This project that simulates sending money to another person, by credit card

## Stacks

- `Angular CLI: 8.3.29`
- `Node: 10.15.3`
- `OS: win32 x64`
- `Angular: 8.2.14`
- `Angular Material: ^8.2.3` to components
- `Bulma` to grid layout

## Conventional Libs

- `git-commit-msg-linter` to standardize commit messages
- `config global git alias` to simplify git commands

## Setup

Run `npm i` for install all dependencies.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## Structure

1. `src/app/core`
  - The folder where has services, domains, api urls, anything that can be shared to another project;
2. `src/app/shared`
  - The folder where has services, components, material components, constants, anything that can be shared in this project;
3. `app.component.*`
  - I decided to put the user list and transaction modal in app.component.* Because the project is small.
4. `styles.scss`
  - The global styles

