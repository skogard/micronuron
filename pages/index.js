import Head from 'next/head'
import Link from 'next/link'
import { useState } from "react";
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <main className='main'>
      <nav>
        <a href="/api/privateparty/gate/admin?callback=/">Logout</a>
      </nav>
      <div>
        <Link href="/deploy">
          <a className="menu-item">Deploy</a>
        </Link>
        <Link href="/generate">
          <a className="menu-item">Generate API Key</a>
        </Link>
      </div>
    </main>
  );
}
