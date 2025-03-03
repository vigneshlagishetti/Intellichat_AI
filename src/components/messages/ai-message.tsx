"use client"
import { useRef, useState } from "react"
import * as Selection from "selection-popover"
import { Copy, Check, Quote, Trash, ThumbsDown } from "lucide-react"

import {
  useChatContext,
  useSessionsContext,
  useSettingsContext,
} from "@/context"
import { TChatMessage } from "@/hooks/use-chat-session"
import {
  useClipboard,
  useMarkdown,
  useModelList,
  useTextSelection,
  useTools,
} from "@/hooks"
import { RegenerateWithModelSelect } from "../regenerate-model-select"
import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { Flex } from "../ui/flex"
import Spinner from "../ui/loading-spinner"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Type } from "../ui/text"
import { Tooltip } from "../ui/tooltip"

export type TAIMessage = {
  chatMessage: TChatMessage
  isLast: boolean
}

export const AIMessage = ({ chatMessage, isLast }: TAIMessage) => {
  const { id, rawAI, isLoading, stop, stopReason, tools, inputProps } =
    chatMessage

  const { getToolInfoByKey } = useTools()
  const messageRef = useRef<HTMLDivElement>(null)
  const { showCopied, copy } = useClipboard()
  const { getModelByKey, getAssistantByKey, getAssistantIcon } = useModelList()
  const { renderMarkdown } = useMarkdown()
  const { open: openSettings } = useSettingsContext()
  const { removeMessage } = useSessionsContext()
  const { handleRunModel, setContextValue, editor } = useChatContext()
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const { selectedText } = useTextSelection()

  const isToolRunning = !!tools?.filter((t) => !!t?.toolLoading)?.length

  const handleCopyContent = () => {
    if (messageRef.current && rawAI) {
      copy(rawAI)
    }
  }

  return (
    <div className="flex flex-row mt-6 w-full">
      <div className="p-2 md:px-3 md:py-2">
        <Tooltip content={inputProps?.assistant.name}>
          {getAssistantIcon(inputProps!.assistant.key)}
        </Tooltip>
      </div>
      <Flex
        ref={messageRef}
        direction="col"
        gap="md"
        items="start"
        className="w-full p-2 flex-1 overflow-hidden"
      >
        {rawAI && (
          <Selection.Root>
            <Selection.Trigger asChild>
              <article className="prose dark:prose-invert w-full prose-zinc">
                {renderMarkdown(rawAI, !!isLoading, id)}
              </article>
            </Selection.Trigger>
            <Selection.Portal
              container={document?.getElementById("chat-container")}
            >
              <Selection.Content sticky="always" sideOffset={10}>
                {selectedText && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setContextValue(selectedText)
                      editor?.commands.clearContent()
                      editor?.commands.focus("end")
                    }}
                  >
                    <Quote size={16} /> Reply
                  </Button>
                )}
              </Selection.Content>
            </Selection.Portal>
          </Selection.Root>
        )}

        <Flex justify="between" items="center" className="w-full pt-1">
          {isLoading && (
            <Flex gap="sm">
              <Spinner />
              <Type size="sm" textColor="tertiary">
                {!!rawAI?.length ? "Typing ..." : "Thinking ..."}
              </Type>
            </Flex>
          )}
          {!isLoading && !isToolRunning && (
            <div className="flex flex-row gap-1">
              <Tooltip content="Copy">
                <Button
                  variant="ghost"
                  size="iconSm"
                  onClick={handleCopyContent}
                >
                  {showCopied ? <Check size={18} /> : <Copy size={18} />}
                </Button>
              </Tooltip>
              <Tooltip content="Dislike">
                <Button variant="ghost" size="iconSm">
                  <ThumbsDown size={18} />
                </Button>
              </Tooltip>
              <Tooltip content="Delete">
                <Popover
                  open={openDeleteConfirm}
                  onOpenChange={setOpenDeleteConfirm}
                >
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="iconSm">
                      <Trash size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <p className="text-sm md:text-base font-medium pb-2">
                      Are you sure you want to delete this message?
                    </p>
                    <div className="flex flex-row gap-1">
                      <Button
                        variant="destructive"
                        onClick={() => removeMessage(id)}
                      >
                        Delete Message
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setOpenDeleteConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </Tooltip>
            </div>
          )}
          {chatMessage && isLast && (
            <RegenerateWithModelSelect
              assistant={inputProps!.assistant}
              onRegenerate={(assistant: string) => {
                const props = getAssistantByKey(assistant)
                if (!props?.assistant) {
                  return
                }
                handleRunModel({
                  input: chatMessage.rawHuman,
                  messageId: chatMessage.id,
                  assistant: props.assistant,
                  sessionId: chatMessage.sessionId,
                })
              }}
            />
          )}
        </Flex>
      </Flex>
    </div>
  )
}
