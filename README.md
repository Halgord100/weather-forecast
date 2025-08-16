# Gemini AI Chatbot

A modern, responsive chatbot application powered by Google's Gemini AI API. Built with React, TypeScript, and styled with CSS.

## Features

- 🤖 **AI-Powered**: Uses Google's Gemini Pro model for intelligent conversations
- 💬 **Real-time Chat**: Interactive chat interface with typing indicators
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast**: Optimized for performance with smooth scrolling and animations
- 🔒 **Secure**: API key stored in environment variables

## Setup

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

1. Rename `.env.example` to `.env` (or create a new `.env` file)
2. Add your Gemini API key:

```bash
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Usage

1. **Start Chatting**: Type your message in the input field and press Enter or click the send button
2. **Real-time Responses**: The AI will respond with intelligent, contextual answers
3. **Conversation History**: Your chat history is maintained during the session
4. **Responsive Design**: The interface adapts to different screen sizes

## Technologies Used

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Google AI SDK** - Official Gemini API integration
- **CSS3** - Modern styling with gradients and animations
- **Responsive Design** - Mobile-first approach

## API Configuration

The chatbot uses the Gemini Pro model by default. You can modify the model in `src/components/ChatBot.tsx`:

```typescript
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
```

Available models:
- `gemini-pro` - Text generation
- `gemini-pro-vision` - Text and image generation

## Customization

### Styling
- Modify `src/components/ChatBot.css` to change colors, fonts, and layout
- The design uses CSS custom properties for easy theming

### Functionality
- Add new features in `src/components/ChatBot.tsx`
- Implement conversation persistence with localStorage
- Add user authentication and chat history

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in the `.env` file
- Verify the API key has the necessary permissions
- Check the browser console for error messages

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure you're using Node.js 16+ and npm 8+

## License

This project is open source and available under the MIT License.

## Support

For issues related to:
- **Gemini API**: Check [Google AI Studio documentation](https://ai.google.dev/docs)
- **React/TypeScript**: Check [React documentation](https://react.dev)
- **This Project**: Open an issue on GitHub

---

**Note**: Keep your API key secure and never commit it to version control. The `.env` file is already added to `.gitignore`.
