import { Router } from 'express';

import { authenticate } from '~/utils/auth';
import { getGameById } from '~/utils/game';
import { keys, paths, redis } from '~/utils/redis';

const router = Router();

router.get('/game/:gameId/subscribe', async (req, res) => {
  const { gameId } = req.params;

  const token = await authenticate(req);
  if (!token) return res.status(401).send('UNAUTHORIZED');

  const exists = await Boolean(await redis.exists(keys.user(token.id)));
  if (!exists) return res.status(401).send('UNAUTHORIZED');

  const isPlayerInGame = await Boolean(
    redis.call('JSON.GET', keys.game(gameId), paths.player(token.id)),
  );
  if (!isPlayerInGame) return res.status(401).send('UNAUTHORIZED');

  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };

  res.writeHead(200, headers);

  const subscriber = redis.duplicate();

  await subscriber.subscribe(keys.game(gameId));

  const onMessage = (_channel: string, message: string) => {
    res.write(`data: ${JSON.stringify(JSON.parse(message))}\n\n`);
  };

  const game = await getGameById(gameId);
  subscriber.on('message', onMessage);

  res.write(`event: subscribed\n`);
  res.write(`data: ${JSON.stringify(game)}\n\n`);

  const closeHandler = async () => {
    subscriber.removeListener('message', onMessage);
    await subscriber.unsubscribe();
    await subscriber.quit();
  };

  req.on('close', closeHandler);
  req.on('end', closeHandler);
});

export { router as subscribeRouter };
