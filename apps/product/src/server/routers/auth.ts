import * as trpc from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { supabase } from '../../clients/supabase';

export const authRouter = router({
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      const { email, password } = input;

      const res = supabase.auth.signInWithPassword({
        email,
        password,
      });

      return res;
    }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      const { email, password } = input;

      const res = supabase.auth.signUp({
        email,
        password,
      });

      return res;
    }),
});
