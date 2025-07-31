# IntelliChat AI 🤖

**The Most Intuitive Multi-Model Chat Application**

IntelliChat is a sophisticated AI chat application that brings together multiple AI models in one seamless interface. Built with modern web technologies, it offers a comprehensive chat experience with advanced tools, customizable settings, and support for various AI providers.

## ✨ Features

### 🧠 Multi-Model AI Support

- **OpenAI**: GPT-4o, GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- **Anthropic**: Claude 3 Opus, Sonnet, and Haiku
- **Google**: Gemini 2.0 Pro, Gemini 2.0 Flash, Gemini 1.5 Flash
- **xAI**: Grok-2, Grok-2 Vision, Grok Beta
- **DeepSeek**: Advanced reasoning models
- **Ollama**: Local model support (Phi3, Llama2, etc.)

### 🛠️ Built-in Tools

- **Calculator**: Perform mathematical operations
- **Web Search**: DuckDuckGo integration for real-time information
- **Google Search**: Enhanced search capabilities
- **DALL-E**: AI image generation
- **Memory**: Persistent conversation memory
- **Website Reader**: Extract and analyze web content

### 💡 Smart Features

- **Assistants**: Create and manage custom AI assistants
- **Prompts Library**: Pre-built and custom prompts
- **Session Management**: Organize conversations effectively
- **Speech-to-Text**: Voice input support
- **Image Attachments**: Upload and analyze images
- **Syntax Highlighting**: Code syntax highlighting with Highlight.js
- **Real-time Streaming**: Live response streaming
- **Dark/Light Theme**: Adaptive theming with system preference detection

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly across all devices
- **Framer Motion**: Smooth animations and transitions
- **Radix UI**: Accessible and customizable components
- **Tailwind CSS**: Modern styling with custom design system
- **Progressive Web App**: Install as a native app experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/buntyanvi/Intellichat_AI.git
   cd Intellichat_AI
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your API keys:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   XAI_API_KEY=your_xai_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start using IntelliChat.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── anthropic/     # Claude AI integration
│   │   ├── bots/          # Assistant management
│   │   ├── extract/       # Content extraction
│   │   ├── search/        # Search functionality
│   │   └── speechToText/  # Voice input processing
│   ├── chat/              # Chat interface
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── assistants/        # Assistant management UI
│   ├── history/           # Chat history components
│   ├── layout/            # Layout components
│   ├── messages/          # Message display components
│   ├── prompts/           # Prompt management
│   ├── settings/          # Settings interface
│   └── ui/                # Base UI components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
└── tools/                 # AI tool implementations
```

## 🔧 Configuration

### Model Configuration

Models are configured in `src/hooks/use-model-list.tsx`. You can customize:

- Available models per provider
- Model parameters and settings
- API endpoints and configurations

### Tool Configuration

Tools are located in `src/tools/` directory:

- `calculator.ts` - Mathematical operations
- `duckduckgo.ts` - Web search functionality
- `google.ts` - Google search integration
- `dalle.ts` - Image generation
- `memory.ts` - Conversation memory

### Theme Customization

Styling is handled through:

- `tailwind.config.ts` - Tailwind CSS configuration
- `src/app/globals.css` - Global styles
- Theme switching via `next-themes`

## 🛡️ Privacy & Security

- **Local Data Storage**: Conversations stored locally using IndexedDB
- **API Key Security**: Keys stored securely in environment variables
- **No Data Tracking**: Privacy-focused design with no user tracking
- **Supabase Integration**: Optional cloud storage with full user control

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Repository**: [GitHub](https://github.com/buntyanvi/Intellichat_AI)
- **Issues**: [Bug Reports &amp; Feature Requests](https://github.com/buntyanvi/Intellichat_AI/issues)
- **Discussions**: [Community Forum](https://github.com/buntyanvi/Intellichat_AI/discussions)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/buntyanvi/Intellichat_AI/issues) page
2. Create a new issue if your problem isn't already reported
3. Join our community discussions

---

**Made with ❤️ by the Lagishetti Vignesh**

*Empowering conversations with AI*
