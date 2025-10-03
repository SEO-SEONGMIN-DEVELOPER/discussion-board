import { useState, useEffect } from "react";
import "./App.css";

// 고민을 저장할 배열
function App() {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState("");

  // 서버에서 고민 목록 가져오기 (GET)
  useEffect(() => {
    fetch("http://127.0.0.1:8081/api/problems")
      .then((res) => res.json())
      .then((data) => setProblems(data));
  }, []);

  // 고민 추가하기 (POST)
  const addProblem = () => {
    if (!newProblem) return; // 빈 칸일 경우 추가하지 않음
    fetch("https://legendary-space-rotary-phone-gjv56ww4wpr2w7xr-8080.app.github.dev/api/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newProblem }),
    })
      .then((res) => res.json())
      .then((newProblemData) => {
        setProblems((prev) => [...prev, newProblemData]);
        setNewProblem(""); // 입력 칸 초기화
      });
  };

  return (
    <div className="App">
      <h1>고민 의논 게시판</h1>
      <input
        type="text"
        placeholder="고민을 입력하세요..."
        value={newProblem}
        onChange={(e) => setNewProblem(e.target.value)}
      />
      <button onClick={addProblem}>고민 올리기</button>

      <h2>고민 목록</h2>
      <ul>
        {problems.map((problem, index) => (
          <li key={index}>
            <p>{problem.content}</p>
            <button>댓글 달기</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
