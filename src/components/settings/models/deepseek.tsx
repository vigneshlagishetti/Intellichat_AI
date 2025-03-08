// import { ArrowRight, Info } from "@phosphor-icons/react"
// import { useEffect, useState } from "react"
// import { Button } from "../../ui/button"
// import { Input } from "../../ui/input"
// import { useLLMTest } from "@/hooks/use-llm-test"
// import { SettingsContainer } from "../settings-container"
// import { usePreferenceContext } from "@/context/preferences"

// export const DeepSeekSettings = () => {
//   const [key, setKey] = useState<string>("")
//   const { apiKeys, updateApiKey } = usePreferenceContext()
//   const { renderSaveApiKeyButton } = useLLMTest()

//   useEffect(() => {
//     setKey(apiKeys.deepseek || "")
//   }, [apiKeys.deepseek])

//   return (
//     <SettingsContainer title="DeepSeek Settings">
//       <div className="flex flex-row items-end justify-between">
//         <p className="text-xs md:text-sm text-zinc-500">DeepSeek API Key</p>
//       </div>
//       <Input
//         placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
//         value={key}
//         type="password"
//         autoComplete="off"
//         onChange={(e) => setKey(e.target.value)}
//       />
//       <div className="flex flex-row items-center gap-2">
//         <Button
//           size="sm"
//           variant="secondary"
//           onClick={() => {
//             window.open(
//               "https://platform.deepseek.com/settings/api-keys",
//               "_blank"
//             )
//           }}
//         >
//           Get your API key here <ArrowRight size={16} weight="bold" />
//         </Button>
//         {key &&
//           key !== apiKeys?.deepseek &&
//           renderSaveApiKeyButton("deepseek", key, () => {
//             updateApiKey("deepseek", key)
//           })}
//         {apiKeys?.deepseek && (
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               setKey("")
//               updateApiKey("deepseek", "")
//             }}
//           >
//             Remove API Key
//           </Button>
//         )}
//       </div>
//       <div className="flex flex-row items-center gap-1 py-2 text-zinc-500">
//         <Info size={16} weight="bold" />
//         <p className="text-xs">
//           Your API Key is stored locally on your browser and never sent anywhere
//           else.
//         </p>
//       </div>
//     </SettingsContainer>
//   )
// }
