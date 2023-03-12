import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { supabase } from '../supabase';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const token = req.headers.authorization;
  const jwt = token?.split(' ')[1];

  if (jwt) {
    const { user } = await supabase.auth.api.getUser(jwt);
    return { req, res, prisma, user, supabase };
  }

  return { req, res, prisma, user: null, supabase };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
