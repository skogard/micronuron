import Head from 'next/head'
import Link from 'next/link'
import { useState } from "react";
import Image from 'next/image'
import * as bip39 from '@scure/bip39';
import { v4 as uuidv4 } from 'uuid';
import { wordlist } from '@scure/bip39/wordlists/english';
import Nextparty from 'nextparty'
import styles from '../styles/Home.module.css'
export default function Home() {
  const [ mn, setMn ] = useState("")
  const [ secret, setSecret ] = useState("")
  const [ auth, setAuth ] = useState({})
  const generate = async () => {
    setMn(bip39.generateMnemonic(wordlist))
  }
  const generateSecret = () => {
    const uu = uuidv4();
    setSecret(uu)
  }
  const generateAuth = async () => {
    let auth = await fetch("/api/fs/auth", {
      method: "POST",
    }).then((res) => {
      return res.json()
    })
    setAuth(auth) 
  }
  return (
    <main className='main'>
      <nav>
        <Link href="/api/privateparty/gate/admin?callback=/">Logout</Link>
      </nav>
      <h1>micronuron</h1>
      <div>
        <Link href="/deploy">
          <a className="menu-item">Deploy</a>
        </Link>
        <Link href="/generate">
          <a className="menu-item">Generate API Key</a>
        </Link>
      </div>
      <div className="section">
        <h2>Step 1. Generate signing wallet</h2>
        <div>click <strong>generate</strong> to generate a seed phrase (securely generated inside the browser)</div>
        <button id='generate' onClick={generate}>generate</button>
        { mn && mn.length > 0 &&
          <textarea id='bip39' readOnly value={mn}></textarea>
        }
      </div>
      { mn && mn.length > 0 &&
        <div className="section">
          <h2>Step 2. Generate cookie secret</h2>
          <div>Generate a cookie signing secret (securely generated inside the browser)</div>
          <button onClick={generateSecret}>generate</button>
          { secret && secret.length > 0 &&
            <textarea readOnly value={secret}></textarea>
          }
        </div>
      }
      { secret && secret.length > 0 &&
        <div className="section">
          <h2>Step 3. Generate IPFS key</h2>
          <div>Generate a decentralized auth token to publish your files to the IPFS network</div>
          <button onClick={generateAuth}>generate</button>
          { auth && Object.keys(auth).length > 0 &&
          <div>
            <b>Auth</b>
            <textarea value={JSON.stringify(auth)} readOnly />
          </div>
          }
        </div>
      }
      { auth && Object.keys(auth).length > 0 &&
        <div className="section">
          <h2>Step 3. Deploy</h2>
          <div>Click the deploy button to go to the deployment page, and enter the following environment variables.</div>
          <div>
            <b>SECRET</b>
            <textarea value={JSON.stringify({ seed: mn, secret, auth})} readOnly />
          </div>
          <div>
            <b>ADMIN</b>
            <div>The admin wallet address (Only the admin can generate API keys)</div>
          </div>
          <br/>
          <a target="_blank" rel="noreferrer" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fskogard%2Fmicronuron&env=AUTH,ADMIN&envDescription=Enter%20the%20signer%20wallet%20seed%20phrase%20and%20API%20admin%20address%20from%20nuron%20deploy&envLink=https%3A%2F%2Fdeploy.nuron.app&project-name=mnuron&repo-name=mnuron"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
        </div>
      }
    </main>
  );
}
export async function getServerSideProps({ req, res }) {
  const auth = JSON.parse(process.env.AUTH)
  const party = new Nextparty({ secret: auth.secret })
  let error = await party.protect("admin", req, res)
  if (error) {
    return error
  } else {
    return { props: {} }
  }
}
