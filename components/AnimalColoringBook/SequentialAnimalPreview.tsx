import React, { useState, useEffect } from 'react';
import { getSVG, getAnimalName, SmallAddressColorSquare } from './AnimalImage'
import svgToMiniDataURI from 'mini-svg-data-uri';
import { ethers } from "ethers";
import {addressH} from '../../lib/AnimalColoringBook/addressHSL';

export default function SequentialAnimalPreview() {
    const [animalType, setAnimalType] = useState(1);
    const [addr1, setAddr1] = useState("0x32ab61fEC224bBFD1cEa38b2FA812a102170CA65")
    const [addr2, setAddr2] = useState("0xc0A874CB3042E8f557819124c665ab6F34174Fca")
    const [addr3, setAddr3] = useState("0x80AEA4EEed34806a038841656C2EDe5F0dC45e95")
    const [addr4, setAddr4] = useState("0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4")
    const [history1, setHistory1] = useState([addr1])
    const [history2, setHistory2] = useState([addr1, addr2])
    const [history3, setHistory3] = useState([addr1, addr2, addr3])
    const [history4, setHistory4] = useState([addr1, addr2, addr3, addr4])

    const toggleAnimal = () => {
        setAnimalType(Math.floor((Math.random() * 6 ) + 1))
    }

    const updateAddr1 = (address) => {
        setAddr1(address) 
        setHistory1([address])
        setHistory2([address, addr2])
        setHistory3([address, addr2, addr3])
        setHistory4([address, addr2, addr3, addr4])
    }

    const updateAddr2 = (address) => {
        setAddr2(address) 
        setHistory2([addr1, address])
        setHistory3([addr1, address, addr3])
        setHistory4([addr1, address, addr3, addr4])
    }

    const updateAddr3 = (address) => {
        setAddr3(address) 
        setHistory3([addr1, addr2, address])
        setHistory4([addr1, addr2, address, addr4])
    }

    const updateAddr4 = (address) => {
        setAddr4(address) 
        setHistory4([addr1, addr2, addr3, address])
    }

    return(
        <div id='sequential-preview-wrapper'>
            <div id='preview-explainer'>
            <p className="float-left century">Paste an address into any step to test its color. </p>
            <p className='float-left century text-btn' onClick={toggleAnimal}> Try a different animal. </p>
            </div>
        
            <AnimalPreviewItem 
            animalType={animalType}
            history={history1}
            address={addr1}
            addressChangeHandler={updateAddr1}
            />
            <AnimalPreviewItem 
            animalType={animalType}
            history={history2}
            address={addr2}
            addressChangeHandler={updateAddr2}
            />
            <AnimalPreviewItem 
            animalType={animalType}
            history={history3}
            address={addr3}
            addressChangeHandler={updateAddr3}
            />
            <AnimalPreviewItem 
            animalType={animalType}
            history={history4}
            address={addr4}
            addressChangeHandler={updateAddr4}
            />
        </div>
    )
}

function AnimalPreviewItem({animalType, history, address, addressChangeHandler}) {
    const [localAddress, setLocalAddress] = useState(address)
    const [error, setError] = useState(false)

    const handleChange = (event) => {
        setError(false)
        const address = event.target.value
        setLocalAddress(address)
        if(!ethers.utils.isAddress(address)){
            setError(true)
            return
        }
        console.log("here")
        addressChangeHandler(address)
    }


    return(
        <div className='sequential-review-item'>   
            <div className='sequential-review-vertical-items'>
                <img className='image-preview' src={svgToMiniDataURI(getSVG(animalType, history))} /> 
                <div className='addr-input'> 
                    <SmallAddressColorSquare address={address} />
                    <input className='float-left short-address-input' value={localAddress} onChange={handleChange} /> 
                </div>
                {error ? <p className='error'> invalid address </p>: <br/> }
            </div>
        </div>
)
}