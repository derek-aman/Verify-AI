import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from 'axios';
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1+1;\n}`);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      setLoading(true);
      const response = await axios.post("https://code-check.onrender.com", { code });
      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Error while reviewing the code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    const confirmClear = window.confirm("Are you sure you want to clear the code and review?");
    if (confirmClear) {
      setCode('');
      setReview('');
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="section-label">📝 Review Output</div>
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>

        <div className="right">
          <div className="section-label">💻 Your Code</div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                background: "#282c34",
                color: "#fff",
                borderRadius: "6px",
              }}
            />
          </div>

          <div className="buttons">
            <button
              className="review"
              onClick={reviewCode}
              disabled={loading}
              title="Send your code to get AI review"
            >
              {loading ? <div className="spinner" /> : "Review"}
            </button>
            <button
              className="clear"
              onClick={clearAll}
              title="Clear code and review"
            >
              Clear
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
