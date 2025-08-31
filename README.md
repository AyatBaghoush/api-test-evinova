# API Test Automation Framework (BDD)
Welcome to the API Test Automation Framework built with Behavior-Driven Development (BDD) principles. This framework serves for both functional and load testing.

## Features

- **Cucumber BDD:** Write tests in Gherkin syntax.
- **Allure Reporting:** Generate rich HTML reports.
- **Joi Integration:** Schema validation support.
- **Dynamic Test Data:** Generate dynamic test data using Faker.
- **Load Testing:** Load testing using K6.
- **Containerization:** Use docker for running tests on container.
- **CI/CD Integration:** CI/CD integration with Github Actions
- **Documentation Auto-generation:** Auto-generate framework dodumentation using Mintlify
- **Code Coverage:** Measuring code coverage using nyc


## api-test-evinova/
``` 
├── functional-tests/       # Functional testing 
│   ├── features/
│   ├── step-definitions/
├── load-tests/             # Load testing
│   ├── checks/             # Test-specific checks (e.g., responseTime.js)
│   ├── thresholds/         # Test-specific thresholds (default thresholts)
│   ├── options/            # Test-specific options (default options)
│   └── tests/              # Test cases (e.g. user-listing-load-test.js)
├── src/
│   ├── config/             # Configuration files 
│   ├── infra/              # Infrastructure for HTTP calls (Wrapper on top of Supertest)
│   ├── test-data/          # Test data (Schemas, Endpoints,..)
│   └── helpers/            # Helper classes (e.g., logger)
├── docs/                   # Mintlify configuration and .mdx files
├── .github/workflows       # CI/CD yaml file
├── cucumber.js             # Cucumber configuration
├── package.json            # Project dependencies and scripts
├── Dockerfile              # Dockerfile for containerization
└── README.md               # Framework documentation
```
---

## Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone --recurse-submodules https://github.com/AyatBaghoush/api-test-evinova.git
    cd api-test-evinova
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment:**
    - Create `.env` inside ./src/config/ and fill in required values.

---


## Running Tests

- API Functional Tests: Run all Cucumber feature tests:
    ```bash
    npm run test
    ```
- API Functional Tests: Run all Cucumber feature tests and Generate Allure test report:
    ```bash
    npm run test:report
    ```
- API Functional Tests: Run all cucumber tests with measuring code coverage:
  ```bash
  npm run test:coverage
  ```
- API Load Test: Run specific load test:
    ```bash
    K6 run <load-test-file>
    ```
- Generate Allure Report:
    ```bash
    npm run report:generate
    ```
- Open Allure Report:
    ```bash
    npm run report:open
    ```
---
## Docker Container Support
To spin up test environment and run tests inside container:
1. **Build Docker Image:**
    ```bash
    docker build -t <image-name> .
    ```
2. **Run Docker Container and Mount your current directory ($(pwd)) into the container at /app:**
   ```bash
   docker run --rm -v $(pwd):/app <image-name>
   ```
3. **Generate and Open Report:**
   ```bash
   npm run report:generate && npm run report:open
   ```
