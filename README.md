# Twilio Serverless VSCode Extension
![frame-002](https://user-images.githubusercontent.com/1418949/62335662-86fcb500-b481-11e9-8605-0028f1b39815.jpg)

<!-- TOC -->
## Contents

   * [Description](#description)
   * [Status](#status)
   * [Requirements](#requirements)
   * [Getting Started](#getting-started)
   * [Features](#features)
      * [Initialize a new project](#init)
      * [Create a new function](#new)
      * [Start a local server for development](#start)
      * [Create new environments](#create-env)
      * [Activate a function](#activate)
      * [Deploy a function](#deploy)
      * [List functions](#list)
   * [Contributing](#contributing)
      * [First time contributors](#first-time-contributors)
      * [General contributions](#general-contributions)
      * [How to develop locally and contribute changes](#develop-locally)
   * [License](#license)
   * [Questions or Comments?](#questions)

<!-- End TOC -->

<a name="description"></a>
## Description
Develop, test and deploy Twilio Functions right from Visual Studio Code!

<a name="status"></a>
## ️️⚠️ Status ⚠️
This project is currently on beta and some features _(such as listing the existing functions)_ are not currently supported, but are in the roadmap. All feedback is greatly appreciated.

<a name="requirements"></a>
## Requirements
For this extension to work properly, you need to have the Twilio CLI and Twilio Serverless plugin installed in your computer. Additionally, having the `code` command installed in your PATH allows the extension to open VSCode after a new project is created.

### Installing the Twilio CLI
Run `npm install twilio-cli -g` in your terminal (If you run into permission issues while doing this, running the command using `sudo` might help).

### Installing the Twilio Serverless Plugin
Run `twilio plugins:install @twilio-labs/plugin-serverless` in your terminal.

### Installing the `code` command in your PATH _(optional)_

1. Run the Command Palette in your VSCode app _(Ctrl+Shift+P in Windows and Linux, Cmd+Shift+P in macOS)_.
2. Search for "Shell Command: Install `code` command in PATH" and execute.

<a name="getting-started"></a>
## Getting Started
1. Install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Twilio.vscode-twilio) (or through your VSCode app).
2. Access the VSCode command palette _(Ctrl+Shift+P in Windows/Linux or Cmd+Shift+P in macOS)_.
3. Enter "Twilio Serverless" to get a list of the available commands.
4. Select a command to execute.

<a name="features"></a>
## Features
These are the features currently supported by this extension:

<a name="init"></a>
### Initialize a new project

##### `Twilio Serverless: Create project`
Initializes a new Twilio Serverless project by creating the necessary files and folders, and installing the dependencies to start developing.

<a name="new"></a>
### Create a new function

##### `Twilio Serverless: New Function`
Creates a new Twilio Function using one of the starter templates or from scratch.

<a name="start"></a>
### Start a local server for development

##### `Twilio Serverless: Start Local Server`
Starts a local instance that serves the existing functions for local development and testing.

<a name="create-env"></a>
### Create new environments

##### `Twilio Serverless: Create Environment`
Creates a new environment to deploy functions to.

<a name="activate"></a>
### Activate a function

##### `Twilio Serverless: Activate`
Moves an active deployment from one environment to another.

<a name="deploy"></a>
### Deploy a function

##### `Twilio Serverless: Deploy`
Deploy functions from your local to the specified environment.

<a name="list"></a>
### List functions

##### `Twilio Serverless: List Functions`
List existing functions for your account.

<a name="contributing"></a>
## Contributing
This project adheres to the Twilio Labs [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). Please read before contributing.

<a name="first-time-contributors"></a>
### First time contributors
A good way to get started with contributions is to look at the current open issues and find any that are tagged with the `good first issue` tag. If you find any that look interesting, feel free to ping us and we'll provide context and guidance to work on it.

<a name="general-contributions"></a>
### General contributions
Before starting your work on any issue, please ping us on that same issue and let us know so we can coordinate properly in case someone else is already working on it.

<a name="develop-locally"></a>
### How to develop locally and contribute changes
1. Fork this repository.
2. Open project directory in VSCode.
3. Hit `F5` to compile and launch the extension in debug mode. This will open a new VSCode window in which you can open the Command Palette and try out the commands.
4. Make your changes in a new branch.
5. Commit and push your changes.
6. Open a Pull Request with a description of the changes. Feel free to include anything that could make our review easier _(screenshots, demo gifs, etc.)_

<a name="license"></a>
## License
MIT, Cambridge, MA

<a name="questions"></a>
## Questions or Comments?
Feel free to open an issue and we'll get back to you as soon as possible :)
