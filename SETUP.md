# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone & Install
```bash
git clone https://github.com/your-username/lorikeet-ai-platform.git
cd lorikeet-ai-platform
npm install
```

### Step 2: Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### Step 3: Create Environment File
Create `.env` in the project root:
```env
GEMINI_API_KEY=paste_your_key_here
```

### Step 4: Start the App
```bash
npm run dev
```

Visit `http://localhost:5000` - you're ready to go!

## 🧪 Test the AI Features

1. Click "Conversations" in the sidebar
2. Select "Sarah Johnson" conversation
3. Type a message as the customer
4. Watch Gemini AI respond automatically!

## 📊 Explore Features

- **Dashboard**: View real-time analytics
- **Workflows**: See automated processes  
- **Integrations**: Manage external connections
- **Settings**: Configure system preferences

## 🆘 Troubleshooting

**Can't connect to Gemini?**
- Check your API key in `.env`
- Make sure you have billing enabled in Google Cloud

**Port already in use?**
- The app uses port 5000 by default
- Stop other services or change the port in `server/index.ts`

**Need help?**
- Check the main README.md for detailed documentation
- Open an issue on GitHub