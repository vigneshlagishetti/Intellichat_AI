import { get, set } from "idb-keyval"
import { v4 } from "uuid"
import { useMutation, useQuery } from "@tanstack/react-query"

// Define the TBot type
export type TBot = {
  key: string
  name: string
  avatar: string
  greetingMessage: string
}

// Fetch assistants from IndexedDB
const getAssistants = async (): Promise<TBot[]> => {
  return (await get("assistants")) || []
}

// Create a new assistant (bot)
const createAssistant = async (assistant: Omit<TBot, "key">) => {
  const assistants = await getAssistants()
  const newAssistants = [...assistants, { ...assistant, key: v4() }]
  await set("assistants", newAssistants)
}

// Update an assistant's details
const updateAssistant = async (
  assistantKey: string,
  newAssistant: Omit<TBot, "key">
) => {
  const assistants = await getAssistants()
  const newAssistants = assistants.map((assistant) => {
    if (assistant.key === assistantKey) {
      return { ...assistant, ...newAssistant }
    }
    return assistant
  })
  await set("assistants", newAssistants)
}

// Delete an assistant by key
const deleteAssistant = async (key: string) => {
  const assistants = await getAssistants()
  const newAssistants = assistants.filter((assistant) => assistant.key !== key)
  await set("assistants", newAssistants)
}

// React Query Hooks
export const useAssistants = () => {
  const assistantsQuery = useQuery({
    queryKey: ["assistants"],
    queryFn: getAssistants,
  })

  const createAssistantMutation = useMutation({
    mutationFn: createAssistant,
    onSuccess: () => {
      assistantsQuery.refetch()
    },
  })

  const updateAssistantMutation = useMutation({
    mutationFn: ({
      assistantKey,
      newAssistant,
    }: {
      assistantKey: string
      newAssistant: Omit<TBot, "key">
    }) => updateAssistant(assistantKey, newAssistant),
    onSuccess: () => {
      assistantsQuery.refetch()
    },
  })

  const deleteAssistantMutation = useMutation({
    mutationFn: deleteAssistant,
    onSuccess: () => {
      assistantsQuery.refetch()
    },
  })

  return {
    getAssistants,
    createAssistant,
    updateAssistant,
    assistantsQuery,
    createAssistantMutation,
    updateAssistantMutation,
    deleteAssistantMutation,
  }
}
