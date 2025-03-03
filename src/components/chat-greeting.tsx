import { motion } from "framer-motion"
import moment from "moment"
import { Hand, Bot } from "lucide-react" // Using Hand and Bot from lucide-react

export const ChatGreeting = () => {
  const renderGreeting = () => {
    const date = moment()
    const hours = date.get("hour")
    if (hours < 12) return `Good Morning,`
    if (hours < 18) return `Good Afternoon,`
    return `Good Evening,`
  }

  return (
    <div className="flex flex-row items-start justify-start w-[720px] gap-2">
      <motion.h1
        className="text-3xl font-semibold py-2 text-left leading-9 tracking-tight text-zinc-800 dark:text-zinc-100"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
      >
        {/* <Bot className="w-12 h-12 text-gray-600" /> */}
        <span className="text-zinc-300 dark:text-zinc-500 flex items-center flex-row gap-1">
          <Hand size={32} strokeWidth={2} />
          Hello Welcome To IntelliChat,
        </span>
        <br></br>
        <span className="text-zinc-300 dark:text-zinc-500 flex items-center flex-row gap-1">
          <Bot size={32} strokeWidth={2} />
          How may I assist you today? 😊
        </span>
      </motion.h1>
    </div>
  )
}
