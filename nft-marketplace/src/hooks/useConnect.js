import Web3Modal from 'web3modal'
import { ethers } from 'ethers';

const useConnect = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    console.log("provider:", provider)
    const signer = provider.getSigner()
    console.log("signer:", signer)

    return { provider, signer }
}

export default useConnect;