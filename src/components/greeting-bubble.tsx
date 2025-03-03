import { TBot } from "@/hooks/use-bots"
import { BotAvatar } from "./ui/bot-avatar"
import { motion } from "framer-motion"
import { Tooltip } from "./ui/tooltip"

export type TGreetingBubble = {
  bot: TBot
}

export const GreetingBubble = ({ bot }: TGreetingBubble) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-6 w-full">
      <div className="px-0 md:px-3 py-1">
        <Tooltip content={bot?.name}>
          <BotAvatar size="small" name={bot?.name} avatar={bot?.avatar} />
        </Tooltip>
      </div>
      <div className="rounded-2xl w-full flex flex-col items-start">
        <div className="py-1.5 w-full">
          <p className="text-sm md:text-base">
            <motion.span
              className="dark:text-zinc-100 text-zinc-700 tracking-[0.01em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8 } }}
            >
              {bot.greetingMessage}
            </motion.span>
          </p>
        </div>
      </div>
    </div>
  )
}
