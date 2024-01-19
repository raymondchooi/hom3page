import { useState } from "react"

// Dfinity
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"
import { resizeImage } from "../utils/image"

import { useAuth } from "../service/use-auth-client"
import { makeTemplateBackendActor } from "../service/actor-locator"

const IMAGE_MAX_WIDTH = 2048
const TEXT_WIDTH = "120px"

export const DataSection = () => {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [maxLimit, setMaxLimit] = useState(0)
  const [file, setFile] = useState(null)
  const { principal } = useAuth()

  // const [loading, setLoading] = useState("")

  function onChangeName(e) {
    const newName = e.target.value
    setName(newName)
  }

  function onChangeSymbol(e) {
    const newSymbol = e.target.value
    setSymbol(newSymbol)
  }

  function onChangeMaxLimit(e) {
    const newMaxLimit = Number(e.target.value)
    setMaxLimit(newMaxLimit)
  }

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"]
    },
    onDrop: async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        try {
          const firstFile = acceptedFiles[0]
          const resizedImage = await resizeImage(firstFile, IMAGE_MAX_WIDTH)
          setFile(resizedImage)
        } catch (error) {
          console.error(error)
        }
      }
    }
  })

  async function submit() {
    const templateBackendActor = makeTemplateBackendActor()
    const imageData = await toBase64(file)
    const result = await templateBackendActor.createNFT(
      principal,
      name,
      symbol,
      maxLimit,
      file.type,
      imageData
    )
    console.log(result)
  }

  return (
    <Flex flexDirection="column" gap="5" mt="5">
      <FormControl id="name" display="flex" alignItems="baseline">
        <FormLabel minWidth={TEXT_WIDTH}>NFT name:</FormLabel>
        <Input
          id="name"
          alt="Name"
          type="text"
          value={name}
          onChange={onChangeName}
        />
      </FormControl>
      <FormControl id="symbol" display="flex" alignItems="baseline">
        <FormLabel minWidth={TEXT_WIDTH}>NFT symbol:</FormLabel>
        <Input
          id="symbol"
          alt="Symbol"
          type="text"
          value={symbol}
          onChange={onChangeSymbol}
        />
      </FormControl>
      <FormControl id="maxLimit" display="flex" alignItems="baseline">
        <FormLabel minWidth={TEXT_WIDTH}>NFT max limit:</FormLabel>
        <Input
          id="maxLimit"
          alt="Maximum Limit"
          type="number"
          value={maxLimit}
          onChange={onChangeMaxLimit}
        />
      </FormControl>
      <FormControl id="image" display="flex" alignItems="baseline">
        <FormLabel minWidth={TEXT_WIDTH}>NFT logo:</FormLabel>
        {file ? (
          <Text flex="1" marginX="12px">
            {file.name}
          </Text>
        ) : (
          <Button
            {...getRootProps({ className: "dropzone" })}
            flex="1"
            marginX="12px"
          >
            Pick an Image
            <Input {...getInputProps()} />
          </Button>
        )}
      </FormControl>
      <Button alignSelf="center" width="100%" onClick={submit}>
        Submit
      </Button>
      {/* <Box>
        <Text>Response: &nbsp;</Text>
        {loading && <Text>Loading...</Text>}
        {!loading && <Text>{greetingMessage}</Text>}
      </Box> */}
    </Flex>
  )
}
