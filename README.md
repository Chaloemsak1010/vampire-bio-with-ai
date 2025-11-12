

# 🦇 Vampire Dating Bio Generator  
**“Find eternal love — one bite at a time.”**

A gothic twist on modern AI apps — this project uses **Generative AI** to create dramatic, poetic vampire dating bios infused with eternal charm, romance, and a hint of danger.

## 🕯️ App Concept

**User Flow:**
1. The user opens the site.  
2. Types in:
   - **Name**
   - **A few interests** (comma-separated)  
3. Presses **“Generate My Vampire Bio 🩸”**  
4. The AI responds with a **romantic, dramatic 80–100 word dating bio** written as if by an ancient vampire.  
5. The result is displayed with gothic fonts, candlelight-inspired styling, and dark romantic vibes.  

---

## 💬 Example

**Input:**

```markdown
Name: Chaloemsak
Interests: coding, classical music, candlelight walks
```

**Output:**
```
🦇 Count Chaloemsak of the Eternal Loop
“Once a mortal coder, now cursed to debug for eternity.
I find beauty in the flicker of candlelight against cold code,
and the sweet symphony of silence at 3AM.
Seeking a soul unafraid of the dark —
bonus if your heart still beats to the rhythm of binary.”
````
## ⚙️ How It Works

### 1. Frontend
- Users enter their **name** and **interests**.
- The app displays a dark-themed form with smooth transitions and candlelight-inspired colors.
- When the user clicks the button, it sends a POST request to the backend API route.

### 2. Backend (`/api/generate`)
- Uses the **Gemini 2.5 Flash model** via the `@google/genai` SDK.
- Includes:
  - System prompt to define vampire writing style.
  - Retry logic with exponential backoff (for 503 service errors).
  - Safety checks to prevent empty or failed responses.

### 3. Output
- The generated bio text is returned to the client and displayed in a beautifully styled card.

---

## 🩸 Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/vampire-bio-with-ai.git
cd vampire-bio-with-ai
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variable

Create a `.env.local` file and add your Gemini API key:

```bash
GEMINI_API_KEY=your_api_key_here
```

### 4. Run the App

```bash
npm run dev
```

Then open:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔮 File Structure

```
vampire-bio-with-ai/
├── app/
│   ├── page.tsx              # Main frontend UI
│   └── api/
│       └── generate/route.ts # API route for AI bio generation
├── public/
│   └── dating-vampire.jpg    # Vampire-themed image
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 💡 Features

* 🕸️ Real-time AI-powered text generation
* 🔥 Gothic visual aesthetic (responsive on all devices)
* 🩸 Retry mechanism for stable API communication
* 🕯️ Loading animations with skeleton placeholders
* 💋 Poetic bios tailored to user input

---

## 🧛 About This Project

Created as a creative exploration of **AI + design + storytelling**.
A small but powerful project that blends **frontend development**, **AI integration**, and **gothic aesthetics** —
proving that even vampires deserve love in the age of AI.

---

🦇 *“Eternal hearts meet not in daylight… but in code.”* 💻❤️

```

---

Would you like me to add a **preview image section** (for GitHub social card or thumbnail) showing your UI screenshot mockup? It can make the README more attractive.
```
