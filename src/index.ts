import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const app: Express = express();
const port = process.env.PORT || 8001;
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send(
    `
  <div style = "font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <h1 align="center"><strong>Welcome to Express &amp; TypeScript Server</strong></h1>
        <p>&nbsp;</p>
        <p align="center"><strong>Express</strong> and <strong>Typescript</strong> Project Starter For your Projects. It uses <strong>Eslint</strong> and <strong>Prettier</strong> all set 🫡! so you can focus only on the real work.</p>
        <p>here are some useful commands :</p>
        <ul style="line-height:1.67">
            <li><strong>dev</strong>: This command is used to start the development server. and runs the <strong>build</strong> command alongside</li>
            <li><strong>lint</strong> : highlighting any potential issues or violations of coding standards defined in the ESLint configuration.</li>
            <li><strong>lint:fix</strong> : This command is similar to lint, but it also attempts to automatically fix any fixable issues found by ESLint, improving code consistency and adherence to coding standards.</li>
            <li><strong>format</strong>: The format command uses Prettier to automatically format TypeScript, JSON, and YAML files within the src/ directory, ensuring consistent code style across the project.</li>
        </ul>
      </div>
  `,
  );
});

app.listen(port, () => {
  const message = `\n-->\x1b[33m Server is Running at\x1b[0m \x1b[34mhttp://localhost:${port}\x1b[0m\n`;
  console.log(message);
});
