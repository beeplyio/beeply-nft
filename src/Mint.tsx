import { useEffect, useRef, useState } from 'react';
import * as xrpl from 'xrpl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Mint() {
  const navigate = useNavigate();

  const PINATA_API_KEY = "e6a6a3f62c60417f883b";
  const PINATA_SECRET_API_KEY = "af5618b87a650073327c5f3a097eb45314d315472f2c1ce6670bd145ffccfdb9";

  const [logs, setLogs] = useState([] as string[]);
  const [nftId, setNftId] = useState(undefined as string | undefined);
  const [isRunning, setIsRunning] = useState(false);

  const messagesEndRef = useRef<HTMLLIElement>(null);
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [logs]);

  const log = (message: string) => {
    setLogs((logs) => [...logs, message]);
  };

  const run = async () => {
    setIsRunning(true);
    setLogs([] as string[]);
    log("Started.");

    log("Connecting to XRPL...");
    await client.connect();
    log("Connected.");

    log("Getting the source wallet info...");
    const sourceWallet = xrpl.Wallet.fromSeed("sEdTST7bgtXjShKFyZ4ErWDUyg5jC9Q");
    log(`Source Wallet: ${JSON.stringify(sourceWallet, null, 2)}`);

    log("Creating the destionation wallet...");
    const destionationWallet = xrpl.Wallet.generate();
    log(`Destionation Wallet: ${JSON.stringify(destionationWallet, null, 2)}`);

    log("Creating IPFS hash...");
    const ipfsHash = await createIpfsHash(new File(["Hello, world!"], "hello.txt"));
    log(`IPFS hash: ${ipfsHash}`);

    // create nft with ipfs hash
    log("Creating NFT...");
    const tx = await mintNft(sourceWallet, ipfsHash);

    log("Created NFT:");
    // @ts-ignore
    log(`${tx.result.meta.nftoken_id}`);
    // @ts-ignore
    setNftId(tx.result.meta.nftoken_id);

    // const nfts = await client.request({
    //   command: "account_nfts",
    //   account: sourceWallet.classicAddress
    // });

    // log("Existing NFTs:")
    // nfts.result.account_nfts.forEach((nft: xrpl.AccountNFToken) => {
    //   log(`${nft.NFTokenID}`);
    // });

    log("Disconnecting from XRPL...");
    await client.disconnect();

    log("Finished.");
    setIsRunning(false);
  }

  const mintNft = async (sourceWallet: xrpl.Wallet, ipfsHash: string) => {
    const transactionBlob: xrpl.NFTokenMint = {
      TransactionType: "NFTokenMint",
      Account: sourceWallet.classicAddress,
      URI: xrpl.convertStringToHex(ipfsHash),
      Flags: 1,
      TransferFee: 0,
      NFTokenTaxon: 0
    };

    const tx = await client.submitAndWait(transactionBlob, {
      wallet: sourceWallet,
    });
    return tx;
  };


  const createIpfsHash = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );

    return response.data.IpfsHash;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Your Certificate's NFT will be ready soon!
      </h2>
      <div className="row">
        <div className="col-md-12">
          <div className="border p-3 overflow-auto" style={{ maxHeight: '100%', marginBottom: '80px' }}>
            <ul className="list-unstyled">
              {logs.map((log, index) => (
                <li key={index}><pre>{log}</pre></li>
              ))}
              <li ref={messagesEndRef} />
            </ul>
          </div>
        </div>
      </div>
      {
        nftId && (
          <>
            <div className="row" style={{ marginBottom: '50px' }}>
              <div className="col-md-12 text-center mb-4">
                <div className="alert alert-success" role="alert">
                  <strong>Your NFT ID</strong>
                  <pre>
                    {nftId}
                  </pre>
                  <button className="btn btn-primary" onClick={() => navigator.clipboard.writeText(nftId)}>
                    Copy the NFT ID
                  </button>
                  <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                    or
                  </span>
                  <button className="btn btn-primary" onClick={() => window.location.href = "/preview.html"}>
                    View Certificate
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      }
      <footer>
        <div className="text-center mt-4">
          <button className="btn btn-primary" disabled={isRunning} onClick={() => navigate("/")}>
            {isRunning ? "Please Wait.." : "Great 🥳 Go back to Home Page"}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Mint;
