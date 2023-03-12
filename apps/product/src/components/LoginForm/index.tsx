import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import { supabase } from '../../clients/supabase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="email" placeholder="Email" {...register('email')} />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
        />
      </div>

      <button type="submit">{isLoading ? 'loading' : 'login'}</button>
    </form>
  );
}

export default LoginForm;
