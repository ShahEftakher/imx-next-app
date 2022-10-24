2 types of api calls possible with ImmutableXClient, 
- one initialized only with apiAddress, 
- 2nd with signer, starkContractAddress, registrationContract address. 
 - here signer is created with user pk
 - starkContractAddress is the deployed smart contract
 - registrationContract address is most likely the user registration contract address deployed on L1

Things possible without signer: 
Most probably the collections on the IMX and the listings. Nothing else...

So I solved the issue of signer. I can get signer from metamask but that would require me to connect metamask to the 
front end client. Without connecting to the frontend client with metamask it's not possible.

issue:
- Will it be user friendly to connect their metamask wallet
- might be, only when minting or doing any admin op only then the connect, but once they connect they need to connect for the entirity of use
- 