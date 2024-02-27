This is an assessment project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). for the purpose of getting hired by CCript.

## Getting Started

server code is required to run this code locally, which can be found [here](https://github.com/dev-status-200/ccript-server). or place the contents of .env in the .env.development file to connect direcly with cloud hosted server.

After cloning this repository, make sure to install all the dependencies

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Project Dependencies

1. Axios: To make simple & easy REST Api requests.
2. Moment: To parse database date values into simple readable format.
3. Tailwind CSS: As per the assemssement requirements.
4. No other library has been used.

## Project Features

A To-do list App, where we can keep track of daily tasks.
1. Tasks can be created.
2. Every Task has the date, when it was created.
3. Tasks can be Edited.
4. Tasks are deletable.
5. Status can be changed from pending to completed.
6. Status can be reversed.
Noe: All of this can be clearly understood by the project's simple UI, which is self-explanatory.

## Code Structure

1. Next.js's App-router structure is used.
2. All the API endpoints have been stored in the api folder, located in app directory.
3. CSS has been used only for scroll-bar styling, otherwise all the styles are implemented from tailwind classes.
4. This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deployed on Vercel

This repository is deployed on vercel, which is the easiest & most suitable hosting for Next.js projects.

This is the [URL](https://ccript-client.vercel.app/).
