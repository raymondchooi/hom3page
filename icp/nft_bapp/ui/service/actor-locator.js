import {
  createActor as createTemplateBackendActor,
  canisterId as templateBackendCanisterID
} from "../declarations/template_backend"

export const makeActor = (canisterId, createActor) => {
  return createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST
    }
  })
}

export function makeTemplateBackendActor() {
  return makeActor(templateBackendCanisterID, createTemplateBackendActor)
}
