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

So Core-sdk does not have Link to link to the starkex network
The Client in Core-sdk is different
It creates client from pre-defined configs
To avail admin privilage the client in imx-sdk needed to be initialized with a signer but in case of core-sdk api call with ethSigner is required for admin privilage
and the api-call must be signed

---

Core-sdk and imx-sdk has major changes

- No link support for core-sdk
- Core-sdk needs stark signer
- To create stark signer need stark private key
- Now there is no way of creating a stark signer for existing IMX user(existing account created against ethereum public key) - Work aorund can be associate a new stark key with the user - But then won't possible to trade the existing resources on the IMX layer
<!-- - Client in core-sdk does not require signer -->
- But all api call requires signer

---

APIs not developer friendly if considering to create a usable client for general users

- Public key issue: requires uncompressed public key that can be generated from private key
  - requires private key
  - asking users for their private key is not acceptable
  - suitable for server side usage
  -

Minting:

- Mismatch with mintFor in the smart contract of the collection can result into mint failure at the very end
- IDK this is very tiresome :(
