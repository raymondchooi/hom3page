import { useRouter } from "next/router"
import NFTMintingPage from "../../../ui/components/NFTMintingPage"
import { makeTemplateBackendActor } from "../service/actor-locator"

const UserView = async () => {
  const router = useRouter()
  const nftID = router.query.id

  const templateBackendActor = makeTemplateBackendActor()
  const nftData = await templateBackendActor.getNFTData(nftID)

  return (
    <NFTMintingPage
      name={nftData.name}
      symbol={nftData.symbol}
      logoBase64={nftData.logo.data}
      totalSupply={nftData.totalSupply}
      totalNFTs={nftData.maxLimit}
    />
  )
}

export default UserView
