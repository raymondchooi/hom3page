import { useState } from "react"

// Dfinity
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"
import { resizeImage } from "../utils/image"
import { LedgerCanister, AccountIdentifier } from "@dfinity/ledger-icp"
import { useAuth } from "../service/use-auth-client"
import { makeTemplateBackendActor } from "../service/actor-locator"
import { createAgent } from "@dfinity/utils"

const IMAGE_MAX_WIDTH = 2048
const TEXT_WIDTH = "120px"
const WIDTH = "450px"

export const DataSection = () => {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [maxLimit, setMaxLimit] = useState(0)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [errorMessage, setError] = useState(null)
  const { identity, principal } = useAuth()

  // const [loading, setLoading] = useState("")

  function onChangeName(e) {
    const newName = e.target.value
    setName(newName)
  }

  function onChangeSymbol(e) {
    const newSymbol = e.target.value
    setSymbol(newSymbol)
  }

  function onChangeMaxLimit(newMaxLimit) {
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
      Number(maxLimit),
      file.type,
      imageData
    )
    if (result?.id) {
      setResult(result.id)
      setError("")
    } else {
      setResult("")
      setError("The operation was not successful")
    }
    console.log(result)
  }

  async function fetchMetadata() {
    const agent = await createAgent({
      identity,
      host: process.env.NEXT_PUBLIC_IC_HOST
    })

    const ledgerCanister = LedgerCanister.create({
      agent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai"
    })

    console.log(ledgerCanister)

    const accountIDParams = AccountIdentifier.fromPrincipal({ principal })

    console.log(accountIDParams.toHex())

    console.log(accountIDParams)

    const balance = await ledgerCanister.accountBalance({
      accountIdentifier: accountIDParams,
      certified: false
    })

    console.log(balance)

    return balance
  }

  return (
    <Flex flexDirection="column" gap="5" mt="5">
      {/* <Button onClick={fetchMetadata}>get balance</Button> */}
      <FormControl id="name" display="flex" alignItems="baseline" width={WIDTH}>
        <FormLabel minWidth={TEXT_WIDTH}>NFT name:</FormLabel>
        <Input
          id="name"
          alt="Name"
          type="text"
          value={name}
          onChange={onChangeName}
        />
      </FormControl>
      <FormControl
        id="symbol"
        display="flex"
        alignItems="baseline"
        width={WIDTH}
      >
        <FormLabel minWidth={TEXT_WIDTH}>NFT symbol:</FormLabel>
        <Input
          id="symbol"
          alt="Symbol"
          type="text"
          value={symbol}
          onChange={onChangeSymbol}
        />
      </FormControl>
      <FormControl
        id="maxLimit"
        display="flex"
        alignItems="baseline"
        width="427px"
      >
        <FormLabel minWidth={TEXT_WIDTH} alignSelf="end">
          NFT max limit:
        </FormLabel>
        <NumberInput
          step={5}
          defaultValue={0}
          min={0}
          value={maxLimit}
          onChange={onChangeMaxLimit}
          flex={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl
        id="image"
        display="flex"
        alignItems="baseline"
        width={WIDTH}
      >
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
      <Button
        alignSelf="center"
        onClick={submit}
        ml={0}
        mr="18px"
        width="438px"
      >
        Submit
      </Button>
      {errorMessage && (
        <Text color="red" fontWeight="bold">
          {errorMessage}
        </Text>
      )}
      {result && (
        <Text color="green" fontWeight="bold">
          NFT collection ID: {result} 
        </Text>
      )}

      {/* <Box>
        <Text>Response: &nbsp;</Text>
        {loading && <Text>Loading...</Text>}
        {!loading && <Text>{greetingMessage}</Text>}
      </Box> */}
    </Flex>
  )
}
