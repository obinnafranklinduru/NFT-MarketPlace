import { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

import { NFTStorage, File } from 'nft.storage';
import mime from 'mime';

const NFT_STORAGE_KEY = process.env.NFT_MARKETPLACE_IPFS_KEY || 'MISSING_IPFS_KEY';
import { marketplaceAddress } from "../../.config.js";
import NFTMarketplace from '../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json';

export default function CreateItem() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
  const router = useRouter();

  useEffect(() => {
    listNFTForSale();
  }, [])

  async function storeNFT(image, previewImage, name, description) {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

    const imageType = mime.getType(image);
    const previewImageType = mime.getType(previewImage);

    const metadata = {
      name,
      description,
      image: new Blob([image], { type: imageType }),
      properties: {
        content: new Blob([image], { type: imageType }),
        'content-type': imageType,
        preview: new Blob([previewImage], { type: previewImageType }),
        'preview-type': previewImageType,
      },
    };

    try {
      const metadataCID = await nftstorage.storeBlob(new Blob([JSON.stringify(metadata)]));
      console.log('metadataCID:', metadataCID);
      return metadataCID;
    } catch (error) {
      console.log('Failed to store NFT:', error);
      return null;
    }
  }

  async function onChange(e) {
  try {
      const file = e.target.files[0];

      const content = await file.arrayBuffer();

      const type = mime.getType(file);

      const imagePath = new File([content], file.name, { type });

      const image = URL.createObjectURL(imagePath);
      setFile(image);
    } catch (error) {
      console.log('Error processing file:', error);
      alert('Error processing file');
    }
  }

  async function listNFTForSale() {
    const { name, description, price } = formInput;
    const url = await storeNFT(file, file, name, description);

    console.log('name:', name, 'description:', description, 'url:', url, 'price:', price)

    if (!name || !description || !url || !price) {
      console.log('Please enter all fields');
      return;
    }
    
    const parsedPrice = ethers.utils.parseUnits(price, 'ether');

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
    let listingPrice = await contract.getListPrice();
    listingPrice = listingPrice.toString();

    try {
      setLoading(true)
      const transaction = await contract.createToken(url, parsedPrice, { value: listingPrice });
      await transaction.wait();
      setLoading(false);
      console.log('Transaction succeeded:', transaction);
      router.push('/')
    } catch (error) {
      console.log('Transaction failed:', error);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          required
        />
        <input
          placeholder="Asset Price in Eth"
          type='number'
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          required
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
          required
        />
        {
          file && (
            <img className="rounded mt-4" width="350" src={file} />
          )
        }
        <button
          onClick={listNFTForSale}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
          disabled={!formInput.name || !formInput.description || !formInput.price || !file}
        >
          {loading ? 'Transaction in Progress...' : 'Create NFT'}
        </button>
      </div>
    </div>
  )
}