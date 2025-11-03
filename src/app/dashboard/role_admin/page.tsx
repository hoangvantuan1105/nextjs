"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaLock } from "react-icons/fa";
import "./role_admin.css";

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
      <h1>Admin</h1>

      {loading ? (
        <p> Đang tải danh sách admin...</p>
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
              users.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.roles}</td>
                  <td style={{ color: a.status === "active" ? "#0f9" : "red" }}>
                    {a.status === "active" ? "Active" : "Hidden"}
                  </td>
                  <td>{a.created_at}</td>
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
