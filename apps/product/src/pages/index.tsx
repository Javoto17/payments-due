import { trpc } from '../clients/trpc';

import styles from './index.module.css';

import Link from 'next/link';

export function Index() {
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/signup">Register</Link>
    </div>
  );
}

export default Index;
