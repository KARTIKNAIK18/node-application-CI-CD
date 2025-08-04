---------

# 🕒 Node.js Date & Time Web App

A minimal Node.js Express application that displays the current date and time. Designed for containerized deployment and automated CI/CD using **Docker** and **GitHub Actions**.

----------

## 🌟 Key Highlights

-   📅 Displays real-time date and time
-   🖼️ Static frontend served via `public/index.html`
-   🐳 Containerized using Docker
-   🔄 Automated CI/CD with GitHub Actions:
    -   Build & Push Docker image
    -   Scan with Trivy
    -   Deploy and test container with `curl`

----------

## ⚙️ CI/CD Pipeline Implementation

This project uses **GitHub Actions** to automate the entire container lifecycle—from building and scanning to testing the deployed image.

### 🔄 Workflow Breakdown

#### 🛠️ 1. Build & Push (`docker.yml`)

Triggered on every push to the `main` branch:

-   ✅ Checks out the latest code
    
-   🔐 Logs in to Docker Hub using GitHub Secrets
    
-   🏗️ Builds the Docker image: `demo-nodeapp-v1:latest`
    
-   📦 Tags and pushes the image to Docker Hub
    

yaml

```
on:
  push:
    branches:
      - main

```

#### 🛡️ 2. Security Scan (`scan.yml`)

Runs after a successful build:

-   📥 Pulls the latest image from Docker Hub
    
-   🔍 Scans the image using Trivy for `CRITICAL` and `HIGH` vulnerabilities
    
-   📄 Outputs results in SARIF format for GitHub integration
    

yaml

```
needs: build

```

#### 🧪 3. Test Container (`test.yml`)

Runs after the scan completes:

-   📥 Pulls the scanned image
    
-   🚀 Runs the container in detached mode
    
-   ⏱️ Waits for readiness
    
-   🔁 Uses `curl` to verify the app is responding on port `3000`
    

yaml

```
needs: scan

```

### 🖼️ CI/CD Workflow Visuals
## 🚀 Local Development (Without Docker)

**Pre-requisite**: Node.js installed locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Run the app
node app.js

```

Access at [http://localhost:3000](http://localhost:3000/)

----------

## 🐳 Docker Usage

```bash
# Build the Docker image
docker build -t demo-nodeapp-v1 .

# Run the container
docker run -p 3000:3000 demo-nodeapp-v1

```

----------

## 🔐 GitHub Secrets for CI/CD

Set the following secrets in your GitHub repository under:

`Settings → Secrets and variables → Actions → New repository secret`


DOCKERUSERNAME

Docker Hub username

DOCKERPASSWORD

Docker Hub password or access token

----------

## ⚙️ CI/CD Workflow Overview

Workflows located at `.github/workflows/` include:

Workflow

Purpose

`docker.yml`

Build & push Docker image to Docker Hub

`scan.yml`

Scan image for vulnerabilities using Trivy

`test.yml`

Deploy container & verify HTTP response with curl

### 🔁 Workflow Flow

```text

<img width="1100" height="252" alt="Screenshot 2025-08-04 195850" src="https://github.com/user-attachments/assets/5d9cff97-c41d-45f6-8308-20536bcb9a92" />

```

----------

## 🔍 Automated Trivy Scan

```bash
docker pull <your-image>:latest
trivy image <your-image>:latest

```

----------

## ✅ Automated Testing

CI workflow performs:

-   Pull image from Docker Hub
-   Run container in background
-   Pause for readiness
-   Test HTTP response using `curl`

----------

## 📁 Project Structure

```plaintext
├── app.js
├── package.json
├── public/
│   └── index.html
├── Dockerfile
└── .github/
    └── workflows/
        ├── docker.yml
        ├── scan.yml
        └── test.yml

```

----------

