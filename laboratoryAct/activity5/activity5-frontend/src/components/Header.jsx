export default function Header({ setCurrentPage }) {
    const token = localStorage.getItem("token");
  
    return (
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h1 style={{ color: "#FF6347" }}>My Blog</h1>
        <div>
          <button className="navBtn" onClick={() => setCurrentPage("home")}>Home</button>
          {!token ? (
            <>
              <button className="navBtn" onClick={() => setCurrentPage("login")}>Login</button>
              <button className="navBtn" onClick={() => setCurrentPage("register")}>Register</button>
            </>
          ) : (
            <button
              className="navBtn"
              onClick={() => {
                localStorage.removeItem("token");
                setCurrentPage("login");
              }}
            >
              Logout
            </button>
          )}
        </div>
  
        <style>{`
          .navBtn {
            margin-left: 10px;
            padding: 8px 15px;
            border: none;
            border-radius: 6px;
            background: #FF6347;
            color: #fff;
            cursor: pointer;
            font-weight: bold;
            transition: 0.3s;
          }
          .navBtn:hover {
            background: #ff8566;
          }
        `}</style>
      </header>
    );
  }
  