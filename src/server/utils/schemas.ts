import { z } from 'zod';

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
  description: z.string().optional(),
  url: z.string().url().optional(),
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
  workItem: workItemSchema.optional(),
});

export type Game = z.infer<typeof gameSchema>;

// Create game

export const createGameSchema = z.object({
  playerName: z.string(),
  votingSystem: votingSystemSchema,
});

// Join game

export const joinGameSchema = z.object({
  gameId: z.string(),
  playerName: z.string(),
  isSpectator: z.boolean(),
});
