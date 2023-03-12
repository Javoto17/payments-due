import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';

import { trpc } from '../../clients/trpc';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = trpc.auth.signUp.useMutation();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = mutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
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
      <button type="submit">{isSubmitting ? 'loading' : 'signup'}</button>
    </form>
  );
}

export default LoginForm;
