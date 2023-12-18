# SpeedCubeShare

Welcome to **SpeedCubeShare** – the online hub for speedcubing enthusiasts to connect, share, and celebrate their cubing journey!

Join us at [SpeedCubeShare](https://speedcubeshare.vercel.app) and let's break records together!

## What is SpeedCubeShare?

SpeedCubeShare is designed to fill the gap in the online space for speedcubers seeking a community-driven platform to share successes, discuss cube choices, and connect with like-minded individuals.

## Features:

- **Customizable Profiles:** Personalize your profile to showcase your speedcubing achievements, favorite cubes, and personal bests.

- **Algorithm Library:** Access a comprehensive library of algorithms to enhance your skills. Contribute your own algorithms to the community.

- **Stats and Achievements:** Track your progress, set goals, and celebrate milestones with our statistics and achievements tracking system.

- **Cube Reviews and Recommendations:** Explore and discuss the latest speedcubing hardware with reviews and recommendations from the community.

## Setup for Local Development:

1. Clone the repository and install dependencies with `npm install`

2. Start a local development server with `npm run dev`. Note that this will start a local database instance with Docker Compose, so make sure you have it [installed](https://docs.docker.com/compose/install/).

3. Visit http://localhost:5173/

4. The following services will also be launched in the background:
   - [MailCatcher](https://www.npmjs.com/package/maildev) at http://localhost:1080
   - [Prisma Studio](https://www.prisma.io/studio) at http://localhost:5555
