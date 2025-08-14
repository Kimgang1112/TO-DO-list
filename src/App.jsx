import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "React 공부", date: "2025-08-13", done: false, important: false },
    { id: 2, text: "운동하기", date: "2025-08-14", done: false, important: true },
    { id: 3, text: "책 읽기", date: "2025-08-13", done: true, important: false },
  ]);

  const [filterDate, setFilterDate] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const filteredTodos = todos.filter((todo) => {
    if (filterDate === "today" && todo.date !== todayStr) return false;
    if (filterDate === "tomorrow" && todo.date !== tomorrowStr) return false;
    if (search && !todo.text.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const completedCount = todos.filter((t) => t.done).length;

  const toggleDone = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const toggleImportant = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
  };

  return (
    <div
      style={{
        width: '1920px',
        height: '950px',
        margin: '0',
        
        background: darkMode ? "#4e4e4eff" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        
        display: "flex", // 중앙정렬
        flexDirection: "column",
        alignItems: "center",
        
        
        transition: "background 0.3s ease"
      }}
    >
      <button
        style={{marginTop:'10px', marginLeft:'1790px', backgroundColor: '#e2e2e2ff'}}
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? "라이트모드" : "다크모드"}
      </button>
      
      <h2 style={{fontSize:'500%', marginTop:'50px'}}>Todo List</h2>

      
      

      
      

      <div style={{ marginBottom: "0.5rem" }}>
        <button style={{marginRight:'5px', backgroundColor: darkMode ? '#e2e2e2ff' : '#e0e0e0ff'}} onClick={() => setFilterDate("all")}>전체</button>
        <button style={{marginRight:'5px', backgroundColor: darkMode ? '#e2e2e2ff' : '#e0e0e0ff'}} onClick={() => setFilterDate("today")}>오늘</button>
        <button style={{marginRight:'5px', backgroundColor: darkMode ? '#e2e2e2ff' : '#e0e0e0ff'}} onClick={() => setFilterDate("tomorrow")}>내일</button>
      </div>

      
      

      {/* 완료율 */}
      <div style={{ margin: "1rem 0" }}>
        완료율: 총 {todos.length}개 중 {completedCount}개 완료 (
        {todos.length > 0
          ? Math.round((completedCount / todos.length) * 100)
          : 0}
        %)
      </div>

      <div style={{height: '1px', width: '1600px', backgroundColor: 'black', marginTop:'20px', marginBottom: '30px'}}>

      </div>

      <input
        type="text"
        placeholder=" 검색..."
        value={search}
        style={{width:'800px', height:'20px', padding:'10px',  borderRadius:'5px', border:'none', marginBottom:'10px'}}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 할 일 목록 */}
      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: "400px" }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              margin: "0.5rem 0",
              padding: "0.5rem",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: todo.important ? "#fff3cd" : "transparent",
              borderRadius: "5px",
            }}
          >
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleDone(todo.id)}
            >
              {todo.text} ({todo.date})
            </span>
            <FaStar
              onClick={() => toggleImportant(todo.id)}
              style={{
                color: todo.important ? "gold" : "#ccc",
                cursor: "pointer",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
  