
import { useEffect, useState } from "react";

import axios from "axios"

import { useAddress, useNFTCollection, useMarketplace } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

import { ethers } from 'ethers';

export default function CreateCollection()
{

    const address = useAddress()

    console.log(address)

    useEffect(() =>
    {
        if (!address) return
        console.log('123')
    },[address])

    return (
        <>
            createCollection
        </>
    )
}
