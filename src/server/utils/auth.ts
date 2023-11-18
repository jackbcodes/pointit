import type { Request, Response } from 'express';
import { createSigner, createVerifier } from 'fast-jwt';

import type { JwtPayload } from '~/utils/schemas';

export const AUTH_COOKIE_NAME = '_pointit_id';

const signer = createSigner({ key: process.env.AUTH_SECRET });

const verifier = createVerifier({ key: process.env.AUTH_SECRET });

export const signJwt = (payload: JwtPayload) => signer(payload);

export const verifyJwt = (token: string) => verifier(token);

export const authenticate = async (req: Request) => {
  const cookie = req.cookies[AUTH_COOKIE_NAME];
  if (!cookie) return;

  const payload = await verifyJwt(cookie);
  if (!payload) return;

  return { id: payload.id as unknown as string };
};

export const setAuthCookie = (playerId: string, res: Response) => {
  const token = signJwt({ id: playerId });
  res.cookie(AUTH_COOKIE_NAME, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 120,
  });
};
