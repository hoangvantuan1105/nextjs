"use client";
import { useState, useEffect } from "react";
import "./dashboard.css";
import MovieManagement from "./moviemanagement/page";
import UsersPage from "./users/page";
import RoleAdminPage from "./role_admin/page";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== PHÂN TRANG MOVIE =====
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const moviesPerPage = 5;
  const indexOfLastMovie = currentMoviePage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalMoviePages = Math.ceil(movies.length / moviesPerPage);

  // ===== PHÂN TRANG USER =====
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentUserPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalUserPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRes = await fetch("http://127.0.0.1:8000/api/movies");
        const moviesData = await moviesRes.json();

        const usersRes = await fetch("http://127.0.0.1:8000/api/users");
        const usersData = await usersRes.json();

        setMovies(moviesData);
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ========================== RENDER CONTENT ==========================
  const renderContent = () => {
    switch (active) {
      case "MovieManagement":
        return <MovieManagement />;
      case "UserManagement":
        return <UsersPage />;
      case "Admin":
        return <RoleAdminPage />;
      case "Reviews":
        return (
          <div className="content-box fade">
            <h2>Đánh giá</h2>
            <p>Chưa làm gì cả hehe 🤡🤡🤡🤡</p>
          </div>
        );

      default:
        return (
          <div className="content-box fade">
            <h1>Dashboard</h1>

            {loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div className="grid">
                <div className="table-box">
                  <h3>🔥 Latest Movies</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>Poster</th>
                        <th>Video</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMovies.length > 0 ? (
                        currentMovies.map((movie) => (
                          <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>
                              {movie.poster ? (
                                <img
                                  src={movie.poster}
                                  alt={movie.title}
                                  width="50"
                                  height="50"
                                  style={{ borderRadius: "6px" }}
                                />
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>
                              {movie.link ? (
                                <a
                                  href={movie.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  🔗 Xem
                                </a>
                              ) : (
                                "N/A"
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>Không có phim nào</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {totalMoviePages > 1 && (
                    <div className="pagination" style={{ marginTop: "10px" }}>
                      <button
                        disabled={currentMoviePage === 1}
                        onClick={() =>
                          setCurrentMoviePage(currentMoviePage - 1)
                        }
                      >
                        ◀
                      </button>
                      {Array.from({ length: totalMoviePages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentMoviePage(i + 1)}
                          style={{
                            fontWeight:
                              currentMoviePage === i + 1 ? "bold" : "normal",
                            margin: "0 4px",
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        disabled={currentMoviePage === totalMoviePages}
                        onClick={() =>
                          setCurrentMoviePage(currentMoviePage + 1)
                        }
                      >
                        ▶
                      </button>
                    </div>
                  )}
                </div>

                <div className="table-box">
                  <h3>👥 New Users</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>CREATED AT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>Không có người dùng nào</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {totalUserPages > 1 && (
                    <div className="pagination" style={{ marginTop: "10px" }}>
                      <button
                        disabled={currentUserPage === 1}
                        onClick={() => setCurrentUserPage(currentUserPage - 1)}
                      >
                        ◀
                      </button>
                      {Array.from({ length: totalUserPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentUserPage(i + 1)}
                          style={{
                            fontWeight:
                              currentUserPage === i + 1 ? "bold" : "normal",
                            margin: "0 4px",
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        disabled={currentUserPage === totalUserPages}
                        onClick={() => setCurrentUserPage(currentUserPage + 1)}
                      >
                        ▶
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <h2>Movie App</h2>
        </div>
        <ul className="menu">
          {[
            "Dashboard",
            "MovieManagement",
            "UserManagement",
            "Admin",
            "Reviews",
          ].map((item) => (
            <li
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">{renderContent()}</main>
    </div>
  );
}
