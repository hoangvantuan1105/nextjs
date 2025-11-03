"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaLock } from "react-icons/fa";
import "./users.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(" Lỗi khi lấy dữ liệu user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-page">
      <h1>Users management</h1>

      {loading ? (
        <p> Đang tải danh sách user...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.roles}</td>
                  <td style={{ color: u.status === "active" ? "#0f9" : "red" }}>
                    {u.status === "active" ? "Active" : "Hidden"}
                  </td>
                  <td>{u.created_at}</td>
                  <td className="actions">
                    <FaLock className="icon lock" title="Lock" />
                    <FaTrashAlt className="icon delete" title="Delete" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Không có user nào để hiển thị.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
