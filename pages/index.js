import Head from 'next/head'
import { useState } from "react";
import Image from 'next/image'
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import * as JSZip  from "jszip"
import Nextparty from 'nextparty'
import styles from '../styles/Home.module.css'
export default function Home() {
  const [ downloaded, setDownloaded ] = useState(false)
  const [ generated, setGenerated ] = useState(false)
  const [ mnemonic, setMnemonic ] = useState("")
  const [ uuid, setUuid ] = useState("")
  const generate = async () => {
    const mn = bip39.generateMnemonic(wordlist);
    const uu = uuidv4();
    setMnemonic(mn)
    setUuid(uu)
    setDownloaded(true)
  }
  const download = async () => {
    var zip = new JSZip();
    zip.file("config.json", JSON.stringify({
      mnemonic, access_token: uuid
    }))
    let blob = await zip.generateAsync({type:"blob"})
    saveAs(blob, "secret.zip");
    setGenerated(true)
  }
  return (
    <main className='main'>
      <h1>micronuron</h1>
      <div className="section">
        <h2>Step 1. Generate keys</h2>
        <button id='generate' onClick={generate}>generate</button>
      </div>
      { downloaded && 
        <div className="section">
          <h2>Step 2. Download generated secret</h2>
          <textarea id='bip39' readOnly value={uuid}></textarea>
          <textarea id='authtoken' readOnly value={mnemonic}></textarea>
          <button id='download' onClick={download}>download</button>
        </div>
      }
      { generated &&
        <div className="section">
          <h2>Step 3. Deploy</h2>
          <a target="_blank" rel="noreferrer" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fskogard%2Fmicronuron&env=SEED,ACCESS_TOKEN&envDescription=Enter%20the%20signer%20wallet%20seed%20phrase%20and%20API%20access%20token%20you%20created%20from%20nuron%20deploy&envLink=https%3A%2F%2Fdeploy.nuron.app&project-name=mnuron&repo-name=mnuron"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
        </div>
      }
    </main>
  );
}
export async function getServerSideProps({ req, res }) {
  console.log("secret", process.env.SECRET)
  const party = new Nextparty({ secret: process.env.SECRET })
  let error = await party.protect("admin", req, res)
  if (error) {
    return error
  } else {
    return { props: {} }
  }
}
