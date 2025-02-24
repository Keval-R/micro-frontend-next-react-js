# Micro Frontend Architecture

This project implements a **Micro Frontend** architecture using **Next.js** as the host and product applications, and **React.js** for the basket module. The integration is achieved via Webpack Module Federation.

## Project Structure
```
root/
  ├── host/         # Next.js host application
  ├── product/      # Next.js product microfrontend
  ├── basket/       # React.js basket microfrontend
```

## Getting Started
### Prerequisites
Ensure you have **Node.js (v16+)** and **npm/yarn** installed.

### Install Dependencies
Navigate into each project directory and install dependencies:
```sh
cd host && pnpm install
cd ../product && pnpm install
cd ../basket && pnpm install
```

### Running the Applications
Start each micro frontend separately:
```sh
# Start Host (Next.js)
cd host && pnpm run dev  # Runs on http://localhost:3000

# Start Product (Next.js)
cd ../product && pnpm run dev  # Runs on http://localhost:3001

# Start Basket (React.js)
cd ../basket && pnpm run dev  # Runs on http://localhost:3002
```



## Deployment
Ensure each micro frontend is deployed separately and update the **remote URLs** in the host app accordingly.

## Conclusion
This setup enables independent development, deployment, and scaling of different parts of your application while keeping them integrated seamlessly.


