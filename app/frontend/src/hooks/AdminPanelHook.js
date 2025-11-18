import { useState } from "react";

const initialUsers = [
  { id: 1, username: "admin", email: "admin@atenea.com", library: "Biblioteca Central", role: "admin", status: "activo" },
  { id: 2, username: "usuario1", email: "usuario1@atenea.com", library: "Biblioteca Norte", role: "usuario", status: "activo" },
  { id: 3, username: "test", email: "test@atenea.com", library: "Biblioteca Sur", role: "usuario", status: "activo" },
  { id: 4, username: "juan", email: "juan@atenea.com", library: "Biblioteca Este", role: "usuario", status: "activo" },
  { id: 5, username: "maria", email: "maria@atenea.com", library: "Biblioteca Oeste", role: "usuario", status: "bloqueado", blockedDate: "2/11/2024" },
  { id: 6, username: "admin", email: "admin@atenea.com", library: "Biblioteca Central", role: "admin", status: "activo" },
  { id: 7, username: "usuario1", email: "usuario1@atenea.com", library: "Biblioteca Norte", role: "usuario", status: "activo" },
  { id: 8, username: "test", email: "test@atenea.com", library: "Biblioteca Sur", role: "usuario", status: "activo" },
  { id: 9, username: "juan", email: "juan@atenea.com", library: "Biblioteca Este", role: "usuario", status: "activo" },
  { id: 10, username: "maria", email: "maria@atenea.com", library: "Biblioteca Oeste", role: "usuario", status: "bloqueado", blockedDate: "2/11/2024" },
  { id: 11, username: "admin", email: "admin@atenea.com", library: "Biblioteca Central", role: "admin", status: "activo" },
  { id: 12, username: "usuario1", email: "usuario1@atenea.com", library: "Biblioteca Norte", role: "usuario", status: "activo" },
  { id: 13, username: "test", email: "test@atenea.com", library: "Biblioteca Sur", role: "usuario", status: "activo" },
  { id: 14, username: "juan", email: "juan@atenea.com", library: "Biblioteca Este", role: "usuario", status: "activo" },
  { id: 15, username: "maria", email: "maria@atenea.com", library: "Biblioteca Oeste", role: "usuario", status: "bloqueado", blockedDate: "2/11/2024" },
  { id: 16, username: "admin", email: "admin@atenea.com", library: "Biblioteca Central", role: "admin", status: "activo" },
  { id: 17, username: "usuario1", email: "usuario1@atenea.com", library: "Biblioteca Norte", role: "usuario", status: "activo" },
  { id: 18, username: "test", email: "test@atenea.com", library: "Biblioteca Sur", role: "usuario", status: "activo" },
  { id: 19, username: "juan", email: "juan@atenea.com", library: "Biblioteca Este", role: "usuario", status: "activo" },
  { id: 20, username: "maria", email: "maria@atenea.com", library: "Biblioteca Oeste", role: "usuario", status: "bloqueado", blockedDate: "2/11/2024" },
];

export function useAdminPanel() {
  const [users, setUsers] = useState(initialUsers);

  const blockUser = (id) => {
    setUsers(users.map(u =>
      u.id === id
        ? { ...u, status: "bloqueado", blockedDate: new Date().toLocaleDateString() }
        : u
    ));
  };

  const unblockUser = (id) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, status: "activo", blockedDate: null } : u
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return {
    users,
    blockUser,
    unblockUser,
    deleteUser
  };
}
