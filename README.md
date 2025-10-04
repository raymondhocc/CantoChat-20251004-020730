# CantoChat: Your Real-Time Cantonese Conversational AI

[cloudflarebutton]

CantoChat is a visually stunning web application designed to simulate a native iOS mobile app experience for a real-time Cantonese conversational chatbot. The application's primary focus is on providing a clean, minimalist, and immersive environment for users to practice and learn conversational Cantonese. It leverages the powerful Cloudflare Agents backend for stateful, streaming conversations. The user interface is meticulously crafted to mirror the aesthetics of iOS, featuring iMessage-style chat bubbles, native-like animations, and responsive typography. The entire application is self-contained within a single, elegant view, ensuring the user's focus remains entirely on the conversation.

## Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Key Features

- **iOS-Inspired UI**: A beautiful, minimalist interface that faithfully emulates Apple's iMessage design.
- **Real-Time Streaming**: Bot responses stream in character-by-character for a natural, conversational feel.
- **Stateful Conversations**: Chat history is persisted using Cloudflare Agents (Durable Objects), allowing for context-aware conversations.
- **Mobile-First & Responsive**: Flawless experience on any device, from mobile phones to desktops.
- **Serverless Backend**: Powered by a Hono backend running on Cloudflare Workers for global low-latency.
- **Modern Frontend**: Built with React, TypeScript, and Zustand for robust and scalable state management.

## Technology Stack

### Frontend
- **Framework**: React (with Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend
- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **State Management**: Cloudflare Agents (Durable Objects)
- **AI Integration**: Cloudflare AI Gateway

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A [Cloudflare account](https://dash.cloudflare.com/sign-up).
- The [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/cantochat.git
    cd cantochat
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Configure Environment Variables:**
    Create a `.dev.vars` file in the root of the project. This file is used by Wrangler for local development. You will need to add your Cloudflare AI Gateway credentials.

    ```ini
    # .dev.vars

    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_NAME/openai"
    CF_AI_API_KEY="YOUR_CLOUDFLARE_API_KEY"
    ```

    > **Note**: Replace `YOUR_ACCOUNT_ID`, `YOUR_GATEWAY_NAME`, and `YOUR_CLOUDFLARE_API_KEY` with your actual Cloudflare credentials.

## Development

To start the local development server, which includes both the Vite frontend and the Wrangler backend, run:

```sh
bun dev
```

This will start the application on `http://localhost:3000` (or the next available port). The frontend will automatically reload on changes, and the worker will be rebuilt as you edit the backend code.

## Deployment

Deploying the application to Cloudflare is a straightforward process.

1.  **Configure Production Secrets:**
    Before deploying, you must set your production secrets in the Cloudflare dashboard or via the Wrangler CLI. These are not read from the `.dev.vars` file in production.

    ```sh
    wrangler secret put CF_AI_BASE_URL
    wrangler secret put CF_AI_API_KEY
    ```
    You will be prompted to enter the value for each secret.

2.  **Deploy the application:**
    Run the deploy script to build the frontend and deploy the worker to your Cloudflare account.

    ```sh
    bun deploy
    ```

    Wrangler will handle the entire process and provide you with the URL of your deployed application.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[cloudflarebutton]

## Project Structure

The codebase is organized into two main directories:

-   `src/`: Contains all the frontend React application code.
    -   `components/`: Reusable UI components, including shadcn/ui components.
    -   `pages/`: Top-level page components for different routes.
    -   `stores/`: Zustand stores for client-side state management.
    -   `lib/`: Utility functions and service abstractions (e.g., `chatService`).
-   `worker/`: Contains all the backend Cloudflare Worker and Agent code.
    -   `agent.ts`: The core `ChatAgent` Durable Object class.
    -   `chat.ts`: Handles AI model interaction and tool logic.
    -   `userRoutes.ts`: Defines the Hono API routes.
    -   `index.ts`: The entry point for the Cloudflare Worker.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.