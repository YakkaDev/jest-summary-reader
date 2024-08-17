# Jest-Summary-Reader Github Action
![Jest Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YakkaDev/25a7339dde450b2a63576f0ec7575448/raw/jest-coverage.json)
![Latest Release](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YakkaDev/25a7339dde450b2a63576f0ec7575448/raw/git-latest-release.json) 
![Package Size](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YakkaDev/25a7339dde450b2a63576f0ec7575448/raw/git-size.json) 
![Files Count](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YakkaDev/25a7339dde450b2a63576f0ec7575448/raw/git-file-count.json) 
![Last Commit](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YakkaDev/25a7339dde450b2a63576f0ec7575448/raw/git-last-commit-date.json)

- [Introduction](#introduction)
- [Usage](#usage)
- [Options](#options)
- [Outputs](#outputs)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction
This [GitHub Action](https://github.com/features/actions) resolves a [Jest](https://jestjs.io/) *coverage-summary file* into simple percentage values.

[Jest-Summary-Reader](https://github.com/YakkaDev/jest-coverage-reader) based on the CommonJS engine and is limited by Github Actions.

## Usage
At first, you need to edit your jest settings file and add the following lines:
```js
coverageReporters: [
  "json-summary"
]
```

Then, you need to generate the `coverage-summary.json` file in one of the possible ways, for example, using the command line argument:
```js
jest --coverage
```

Finally, you need to specify the path to this file relative to the root directory of the project in your GitHub Actions, following the example:
```yml
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Read Jest-Summary
      id: jest-summary
      uses: YakkaDev/jest-summary-reader@v1.0.0
      with:
        path: ./coverage/coverage-summary.json
          
    - run: |
        echo Coverage Average - ${{ steps.jest-summary.outputs.average }}
        echo Coverage Functions - ${{ steps.jest-summary.outputs.functions }}
        echo Coverage Lines - ${{ steps.jest-summary.outputs.lines }}
        echo Coverage Statements - ${{ steps.jest-summary.outputs.statements }}
        echo Coverage Branches - ${{ steps.jest-summary.outputs.branches }}
```

Detailed information on setting up Jest can be found directly on the [Jest documentation page](https://jestjs.io/docs/configuration).

## Options
Below you will find all possible options of this application, as well as their description and default values.

| Option         | Description                               | Requried | Default            |
|:--------------:|-------------------------------------------|:--------:|--------------------|
| path           | Path to coverage-summary file             | Yes      | -                  |
| format         | Extension of coverage-summary file        | No       | json               |

## Outputs
| Output     | Description                                       |
|:----------:|---------------------------------------------------|
| average    | Average percentage among all categories           |
| functions  | The percentage value among all covered functions  |
| lines      | The percentage value among all covered rows       |
| statements | The percentage value among all covered statements |
| branches   | The percentage value among all covered branches   |

## Authors
The following people participated in the development:
- [Illia «YakkaDev» Korovin](https://github.com/YakkaDev)

## License
This project is released under the [MIT License](https://github.com/YakkaDev/jest-coverage-reader/LICENSE).

## Acknowledgments
The application uses a [@actions/core](https://github.com/actions/toolkit) packages.

---