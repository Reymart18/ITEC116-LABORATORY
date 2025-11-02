import Swal from "sweetalert2";

export default function Header({ setCurrentPage }) {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => setCurrentPage("login"), 1500);
      }
    });
  };

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
      <h1 style={{ color: "#667eea" }}>MY BLOG</h1>
      <div>
        <button className="navBtn" onClick={() => setCurrentPage("home")}>
          Home
        </button>
        {!token ? (
          <>
            <button className="navBtn" onClick={() => setCurrentPage("login")}>
              Login
            </button>
            <button className="navBtn" onClick={() => setCurrentPage("register")}>
              Register
            </button>
          </>
        ) : (
          <button className="navBtn" onClick={handleLogout}>
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
          background: #667eea;
          color: #fff;
          cursor: pointer;
          font-weight: bold;
          transition: 0.3s;
        }
        .navBtn:hover {
          background: #5568d3;
        }
      `}</style>
    </header>
  );
}
