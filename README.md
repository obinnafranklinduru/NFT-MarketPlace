# Full stack NFT MarketPlace built with Polygon, Solidity, IPFS, & Next.js
<hr>

# NFT MarketPlace (Smart Contract)

This is a Solidity smart contract for a Non-Fungible Token (NFT) marketplace. The smart contract allows users to create NFTs, sell them, and resell them. This contract is built using the OpenZeppelin library, which provides useful contracts to help build secure smart contracts. This smart contract inherits from ERC721URIStorage, which is a standard for NFTs on Ethereum.

## How to use
The smart contract contains the following functions:

- createToken: Mints an NFT and lists it for sale on the marketplace. This function takes a tokenURI and price for the NFT. The tokenURI is the URL where the metadata for the NFT is stored, and the price is the price at which the NFT will be sold.
- resellToken: Allows someone to resell an NFT they have purchased. This function takes a tokenId and a price for the NFT. The tokenId is the ID of the NFT being sold, and the price is the new price at which the NFT will be sold.
- updateListPrice: Updates the listing price of the marketplace. This function takes a new listPrice.
- getListPrice: Returns the current listing price.
- getItemSold: Returns the number of items sold.
- getLatestIdToListedToken: Returns the most recently created NFT listed on the marketplace.
- getOwnerOfToken: Returns the owner of the given token ID.
- getListedTokenForId: Returns the listed token of the given token ID.
- getCurrentToken: Returns the most recent minted token ID.

## Variables
- listPrice: The fee charged by the marketplace to be allowed to list an NFT.
- _tokenIds: A counter that keeps track of the most recently minted token ID.
- _itemsSold: A counter that keeps track of the number of items sold on the marketplace.
- owner: The contract address that deployed the smart contract.
- idToListedToken: A mapping that maps token ID to token info and is helpful when retrieving details about a token.

## Events
- TokenListedSuccess: This event is emitted when a token is successfully listed.

## License
This smart contract is licensed under the MIT License. You can find the SPDX-License-Identifier at the beginning of the file.

[View Live Contract ]("https://mumbai.polygonscan.com/address/0x9204ed613a2e9e352e6e6370e5fcd2437ac7d818")
<hr>

# NFT MarketPlace (NextJs FrontEnd)

## About
The NFT marketplace, developed with Polygon, Solidity, IPFS, and Next.js, heralds a new age in blockchain technology and digital asset ownership. Users may utilize the platform to create, purchase, and sell non-fungible tokens (NFTs) in a decentralized and secure environment. The adoption of Polygon, a Layer-2 scaling solution for Ethereum, enables quicker and cheaper transactions, while Solidity, a programming language for smart contracts, assures the execution of safe and trustworthy smart contracts. IPFS provides a decentralized storage solution for NFT data, ensuring its availability and accessibility. Finally, Next.js, a popular React-based framework, provides a slick and responsive user experience for the marketplace.

## Features
The website is structured into separate pages, including:

- `create-nft`: This page allows users to submit an image and enter parameters like as name, description, and price, and then posts the NFT for sale on the marketplace. The code stores the picture and metadata in IPFS and interacts with the blockchain using Web3Modal.

- `dashboard`: It retrieves and shows the creator's listed NFTs (Non-Fungible Tokens) from an Ethereum smart contract running at the address "marketplaceAddress." If the component has finished loading and there are no NFTs listed, a notice is displayed.

- `index`: This page lists NFTs available for purchase in a marketplace and allows users to purchase them. When the page loads, it searches the smart contract for available NFTs and shows them along with their information. When a user hits the "Buy" button, the page asks the user to pay the requested amount, and the transaction is completed. A notice is displayed if there are no products in the marketplace.

- `my-nft`: This page allows users to view their owned NFTs and list them for sale.

- `resell-nfts`: The page retrieves the token metadata and shows the picture, lets the user choose a sale price in ETH, and then lists the token for sale on the marketplace contract upon submission.

## Dependencies
To run the project, you will need to install Node.js and Nextjs using npm, the Node.js package manager.

## Installation and Usage
To install the dependencies, run npm install. Once the dependencies are installed, run npm dev to start the development server. You can then access the website at http://localhost:3000 in your web browser.

## Challenges Faced
Creating a full-stack NFT marketplace with Polygon, Solidity, IPFS, and Next.js poses a number of obstacles. To begin, knowing each technology and its interactions is required for integrating all of the technologies together to produce a smooth user experience. Second, in a decentralized ecosystem, ensuring platform security and user asset protection is crucial. Lastly, in order to scale the platform to support a high number of users and transactions, network congestion and gas prices must be carefully considered. Fourth, designing an easy-to-use interface that lets users simply explore, purchase, and trade NFTs

[View Live Demo](https://google.com)