import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from 'axios';
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import './App.css';
import Landing from './Landing';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [newsText, setNewsText] = useState(`Breaking: Scientists discover water on Mars!`);
  const [verdict, setVerdict] = useState('');
  const [popupType, setPopupType] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
    const timer = setTimeout(() => setShowLanding(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  async function analyzeNews() {
    try {
      setLoading(true);
      const response = await axios.post("https://verify-ai-1.onrender.com/ai/get-review", {
        code: newsText
      });

      const aiResponse = response.data;
      setVerdict(aiResponse);

      const lower = aiResponse.toLowerCase();
      if (lower.includes("verdict: real")) {
        setPopupType("real");
      } else if (lower.includes("verdict: fake")) {
        setPopupType("fake");
      } else {
        setPopupType(null);
      }
    } catch (error) {
      setVerdict("⚠️ Error analyzing the news. Please try again.");
      setPopupType(null);
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    const confirmClear = window.confirm("Are you sure you want to clear everything?");
    if (confirmClear) {
      setNewsText('');
      setVerdict('');
      setPopupType(null);
    }
  }

  if (showLanding) return <Landing />;

  return (
    <div className="app scrollable">
      <h1 className="header gradient-text">Let's VERIFY AI</h1>
      <main className="container">
        <div className="section left">
          <div className="section-label"> AI Verdict</div>
          <div className="verdict-box">
            <Markdown rehypePlugins={[rehypeHighlight]}>{verdict}</Markdown>
            {popupType === "real" && <div className="popup popup-green">✅ This news appears to be REAL</div>}
            {popupType === "fake" && <div className="popup popup-red">❌ This news appears to be FAKE</div>}
          </div>
        </div>

        <div className="section right">
          <div className="section-label"> Enter News Article</div>
          <div className="code-box">
            <Editor
              value={newsText}
              onValueChange={setNewsText}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={12}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: 15,
                minHeight: "150px",
                width: "100%",
                background: "#1e1e1e",
                color: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #444",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <div className="buttons">
            <button className="review" onClick={analyzeNews} disabled={loading}>
              {loading ? <div className="spinner" /> : " Analyze"}
            </button>
            <button className="clear" onClick={clearAll}> Clear</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;