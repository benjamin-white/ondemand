import { useState } from 'react'
import Rareterm     from 'rareterm'

const FormMinter = () => {

  const [tokenURI, setTokenURI] = useState('')

  const rarepress = new Rareterm()

  const handleSubmit = async (event: React.SyntheticEvent) => {

    event.preventDefault()

    try {

      await rarepress.init({host: 'https://eth.rarenet.app/v1'});

      let cid = await rarepress.fs.add('https://thisartworkdoesnotexist.com')
    
      let signedToken = await rarepress.token.create({
        type: 'ERC721',
        metadata: {
          name: '😎',
          description: 'sunglasses',
          image: `/ipfs/${cid}`
        },
      })

      await rarepress.fs.push(cid)
      await rarepress.fs.push(signedToken.tokenURI)
    
      let sent = await rarepress.token.send(signedToken)

      setTokenURI(`https://rarible.com/token/${sent.id}`)

    } catch (error) {

      console.error(error)

    }

  }

  return (
    <div>
      { tokenURI ? <a href={tokenURI} target="_blank" rel="noopener noreferrer">Check your token</a> : ''}
      <form onSubmit={handleSubmit}>
        <h2>This is the minter form.</h2>
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  )

}

export default FormMinter