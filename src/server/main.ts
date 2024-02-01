import 'dotenv/config';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';

import { appRouter, subscribeRouter } from '~/routers';
import { createContext } from '~/utils/trpc';

const PORT = process.env.PORT ?? '3000';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny', { skip: (req) => !req.originalUrl.startsWith('/api') }));

app.use(
  '/api',
  subscribeRouter,
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

ViteExpress.listen(app, Number(PORT), () =>
  console.log(`Server is listening on port ${PORT}...`),
);
