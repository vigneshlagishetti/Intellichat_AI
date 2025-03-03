"use client"

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
  const newAssistants = assistants.map((assistant) =>
    assistant.key === assistantKey
      ? { ...assistant, ...newAssistant }
      : assistant
  )
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

// Assistants Context
import { TAssistant } from "@/hooks/use-chat-session"
import { TModel, useModelList } from "@/hooks/use-model-list"
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { usePreferenceContext } from "./preferences"
import { Drawer } from "vaul"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Flex } from "@/components/ui/flex"
import { Type } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { CreateAssistant } from "@/components/assistants/create-assistant"
import { AssistantItem } from "@/components/assistants/assistant-item"
import { defaultPreferences } from "@/hooks"

export type TAssistantsProvider = {
  children: React.ReactNode
}

export type TAssistantsContext = {
  open: () => void
  dismiss: () => void
  assistants: TAssistant[]
  selectedAssistant?: {
    assistant: TAssistant
    model: TModel
  }
}

export const AssistantsContext = createContext<undefined | TAssistantsContext>(
  undefined
)

export const useAssistantContext = () => {
  const context = useContext(AssistantsContext)
  if (!context) {
    throw new Error("useAssistants must be used within an AssistantsProvider")
  }
  return context
}

export const AssistantsProvider = ({ children }: TAssistantsProvider) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [openCreateAssistant, setOpenCreateAssistant] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const [updateAssistant, setUpdateAssistant] = useState<TAssistant>()
  const [selectedAssistant, setSelectedAssistant] = useState<string>("")
  const { preferences, updatePreferences } = usePreferenceContext()

  useEffect(() => {
    if (isAssistantOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isAssistantOpen])

  useEffect(() => {
    setSelectedAssistant(preferences.defaultAssistant)
  }, [preferences])

  const dismiss = () => setIsAssistantOpen(false)

  const {
    assistants,
    getAssistantByKey,
    createAssistantMutation,
    updateAssistantMutation,
    deleteAssistantMutation,
  } = useModelList()

  return (
    <AssistantsContext.Provider
      value={{
        open: () => setIsAssistantOpen(true),
        dismiss,
        assistants,
        selectedAssistant: getAssistantByKey(selectedAssistant),
      }}
    >
      {children}
      <Drawer.Root
        direction="bottom"
        shouldScaleBackground
        open={isAssistantOpen}
        onOpenChange={setIsAssistantOpen}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[400] bg-zinc-500/70 dark:bg-zinc-900/70 backdrop-blur-sm" />
          <Drawer.Content
            className={cn(
              "flex flex-col items-center outline-none max-h-[430px] fixed bottom-0 z-[500] md:bottom-4 mx-auto md:left-[50%] md:ml-[-200px] md:w-[400px] w-full"
            )}
          >
            <Command className="rounded-2xl relative dark:border-white/10 dark:border">
              <CommandInput
                placeholder="Search..."
                className="h-12"
                ref={searchRef}
              />
              <CommandList className="border-t border-zinc-500/20">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <Flex direction="col" className="p-2 w-full">
                    <Type weight="medium" size="base" className="px-3 py-2">
                      Assistants
                    </Type>
                    <Type size="xs" textColor="tertiary">
                      Experience AI capabilities with Custom Assistants
                    </Type>
                    {assistants?.map((assistant) => (
                      <AssistantItem
                        key={assistant.key}
                        assistant={assistant}
                        onSelect={() => {
                          setSelectedAssistant(assistant.key)
                          dismiss()
                        }}
                        onDelete={() => deleteAssistantMutation.mutate(assistant.key)}
                        onEdit={() => setUpdateAssistant(assistant)}
                      />
                    ))}
                  </Flex>
                </CommandGroup>
              </CommandList>
            </Command>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </AssistantsContext.Provider>
  )
}
