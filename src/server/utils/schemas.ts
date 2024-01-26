import isEmpty from 'lodash.isempty';
import { z } from 'zod';

// Redis transformations

// TODO: Is this needed now? Probs not
const emptyStringToUndefined = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.string().optional(),
);

// JWT

export const jwtPayloadSchema = z.object({
  id: z.string(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

// Voting system

export const votingSystemSchema = z.object({
  name: z.string(),
  values: z.array(z.string()),
});

export type VotingSystem = z.infer<typeof votingSystemSchema>;

// Work item

export const workItemSchema = z.object({
  title: z.string(),
  description: emptyStringToUndefined.pipe(z.string().optional()),
  url: emptyStringToUndefined.pipe(z.string().url().optional()),
});

export type WorkItem = z.infer<typeof workItemSchema>;

// User

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  gameId: z.string(),
  isSpectator: z.boolean(),
});

export type User = z.infer<typeof userSchema>;

// Player

export const playerSchema = userSchema.merge(
  z.object({
    vote: z.string(),
    joinedAt: z.coerce.date(),
  }),
);

export type Player = z.infer<typeof playerSchema>;

// Game

export const gameSchema = z.object({
  id: z.string(),
  isRevealed: z.boolean(),
  players: z.array(playerSchema),
  votingSystem: votingSystemSchema,
  workItem: z.preprocess(
    (value) => (isEmpty(value) ? undefined : value),
    workItemSchema.optional(),
  ),
});

export type Game = z.infer<typeof gameSchema>;

// Full Game

export const fullGameSchema = gameSchema.merge(
  z.object({
    players: z.array(playerSchema),
    votingSystem: votingSystemSchema,
    workItem: z.preprocess(
      (value) => (isEmpty(value) ? undefined : value),
      workItemSchema.optional(),
    ),
  }),
);

export type FullGame = z.infer<typeof fullGameSchema>;

// Create game

export const createGameSchema = z.object({
  playerName: z.string(),
  votingSystem: votingSystemSchema,
});

export type CreateGame = z.infer<typeof createGameSchema>;

// Join game

export const joinGameSchema = z.object({
  gameId: z.string(),
  playerName: z.string(),
  isSpectator: z.boolean(),
});

export type JoinGameBody = z.infer<typeof joinGameSchema>;
