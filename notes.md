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

So Core-sdk does not have Link to link to the starkex network
The Client in Core-sdk is different
It creates client from pre-defined configs
To avail admin privilage the client in imx-sdk needed to be initialized with a signer but in case of core-sdk api call with ethSigner is required for admin privilage
and the api-call must be signed
