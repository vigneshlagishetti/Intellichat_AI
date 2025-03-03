import { useState } from "react"
import { TBaseModel, useModelList } from "./use-model-list"
import { useToast } from "@/components/ui/use-toast"
import { usePreferences } from "./use-preferences"
import { Button } from "@/components/ui/button"

export const useLLMTest = () => {
  const { getModelByKey, createInstance, getTestModelKey } = useModelList()

  const [isTestRunning, setIsTestRunning] = useState(false)

  const { toast } = useToast()

  const { getApiKey } = usePreferences()

  const testLLM = async (model: TBaseModel, apiKey?: string) => {
    try {
      const modelKey = getTestModelKey(model)

      if (!apiKey) {
        return false
      }

      const selectedModelKey = getModelByKey(modelKey)

      if (!selectedModelKey) {
        return false
      }

      const selectedModel = await createInstance(selectedModelKey, apiKey)
      const data = await selectedModel
        .withListeners({
          onError: (error) => {
            console.error("OpenAI API Error:", error)
          },
        })
        .withConfig({ recursionLimit: 2 })
        .invoke("This is a test message")
        .catch((error) => {
          console.error("Invocation Error:", error)
          throw new Error(error)
        })

      // const data = await selectedModel
      //   .withListeners({
      //     onError: (error) => {
      //       console.error("error", error)
      //     },
      //   })
      //   .withConfig({
      //     recursionLimit: 2,
      //   })
      //   .invoke("This is a test message", {
      //     callbacks: [
      //       {
      //         handleLLMError: (error: any) => {
      //           console.error("lll", error)
      //           throw new Error(error)
      //         },
      //       },
      //     ],
      //   })

      if (data) {
        return true
      }
      return false
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const renderSaveApiKeyButton = (
    model: TBaseModel,
    key: string,
    onValidated: () => void
  ) => {
    return (
      <Button
        size={"sm"}
        onClick={async () => {
          setIsTestRunning(true)
          const isWorking = await testLLM(model, key)
          if (isWorking) {
            onValidated()
            toast({
              title: "API Key Saved successfully",
              description: "Model is working as expected",
              variant: "default",
            })
          } else {
            if (!key.startsWith("sk-")) {
              toast({
                title: "Invalid API Key",
                description: "API key format is incorrect.",
                variant: "destructive",
              })
              return false
            }
          }
          setIsTestRunning(false)
        }}
      >
        {isTestRunning ? "Validating ..." : "Save API Key"}
      </Button>
    )
  }

  return { testLLM, renderSaveApiKeyButton }
}
