import { Router } from 'express';

import { authenticate } from '~/utils/auth';
import { getFullGameById } from '~/utils/game';
import { getPlayerById } from '~/utils/player';
import { redis } from '~/utils/redis';

const router = Router();

router.get('/game/:gameId/subscribe', async (req, res) => {
  const { gameId } = req.params;

  const gameExists = Boolean(await redis.exists(`game:${gameId}`));
  if (!gameExists) return res.status(400).send('NOT_FOUND');

  const user = await authenticate(req);
  if (!user) return res.status(401).send('UNAUTHORIZED');

  const player = await getPlayerById(user.id);
  if (!player) return res.status(401).send('UNAUTHORIZED');

  const isPlayerInGame = await redis.sismember(`players:${gameId}`, player.id);
  if (!isPlayerInGame) return res.status(401).send('UNAUTHORIZED');

  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };

  res.writeHead(200, headers);

  const subscriber = redis.duplicate();

  await subscriber.subscribe(`game:${gameId}`);

  const onMessage = (_channel: string, message: string) => {
    res.write(`data: ${JSON.stringify(JSON.parse(message))}\n\n`);
  };

  const game = await getFullGameById(gameId);
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
