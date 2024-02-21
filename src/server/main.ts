import 'dotenv/config';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';

import { appRouter, subscribeRouter } from '~/routers/_app';
import { createContext } from '~/utils/trpc';

const PORT = process.env.PORT ?? '3000';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/.well-known/microsoft-identity-association.json', (req, res) => {
  res.json({
    associatedApplications: [
      {
        applicationId: '23921514-3a50-432a-a2d5-accbfe67f61d',
      },
    ],
  });
});

app.use(
  '/api',
  morgan('tiny'),
  subscribeRouter,
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

ViteExpress.listen(app, Number(PORT), () =>
  console.log(`Server is listening on port ${PORT}...`),
);
