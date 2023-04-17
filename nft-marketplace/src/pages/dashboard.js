import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { marketplaceAddress } from "../../.config.js";
import NFTMarketplace from '../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json';

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNFTs()
  }, []);
    
  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
    const data = await contract.fetchMyNFTs()

    const items = await Promise.all(data.map(async nft => {
      const tokenUri = await contract.tokenURI(nft.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: nft.tokenId.toNumber(),
        seller: nft.seller,
        owner: nft.owner,
        image: meta.data.image,
      }
      return item
    }))

    setLoading(true)
    setNfts(items)
    setLoading(false) 
  }
  if (loading) return (<h1 className="py-10 px-20 text-3xl">Loading...</h1>)
  if (!nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>)
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Listed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}