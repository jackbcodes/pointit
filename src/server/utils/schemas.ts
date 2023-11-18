import { z } from 'zod';

const booleanSchema = z
  .union([z.enum(['true', 'false']), z.boolean()])
  .transform((value) => (typeof value === 'string' ? value === 'true' : value));

// JWT

export const jwtPayloadSchema = z.object({
  id: z.string(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

// Voting system

const votingSystemValuesSchema = z.array(z.string());

export const votingSystemSchema = z.object({
  name: z.string(),
  values: z
    .union([z.string(), votingSystemValuesSchema])
    .transform((value, ctx) => {
      if (typeof value !== 'string') return value;

      const result = votingSystemValuesSchema.safeParse(JSON.parse(value));
      if (result.success) return result.data;

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'String must represent an array',
        fatal: true,
      });
      return z.NEVER;
    }),
});

export type VotingSystem = z.infer<typeof votingSystemSchema>;

// Work item

export const workItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  url: z.string().url().optional(),
});

export type WorkItem = z.infer<typeof workItemSchema>;

// Player

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  gameId: z.string(),
  vote: z.string(),
  isSpectator: booleanSchema,
  joinedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export type Player = z.infer<typeof playerSchema>;

// Game

export const gameSchema = z.object({
  id: z.string(),
  name: z.string(),
  isRevealed: booleanSchema,
});

export type Game = z.infer<typeof gameSchema>;

// Full Game

export const fullGameSchema = gameSchema.merge(
  z.object({
    players: z.array(playerSchema),
    votingSystem: votingSystemSchema,
    workItem: workItemSchema.optional(),
  }),
);

export type FullGame = z.infer<typeof fullGameSchema>;

// Create game

export const createGameSchema = z.object({
  gameName: z.string(),
  playerName: z.string(),
  votingSystem: votingSystemSchema,
});

export type CreateGame = z.infer<typeof createGameSchema>;

export const startGameResponseSchema = z.object({
  id: z.string(),
});

export type StartGameResponse = z.infer<typeof startGameResponseSchema>;

// Join game

export const joinGameSchema = z.object({
  gameId: z.string(),
  playerName: z.string(),
  isSpectator: z.boolean(),
});

export type JoinGameBody = z.infer<typeof joinGameSchema>;

// Vote

export const voteBodySchema = z.object({
  value: z.string(),
});

export type VoteBody = z.infer<typeof voteBodySchema>;
