import { useAdminPanel } from "../hooks/adminPanelHook";
import Background from "../components/Background";
import Header from "../components/Header";
import PanelCard from "../components/PanelCard";

export default function AdminPanel() {
  const {
    users,
    blockUser,
    unblockUser,
    deleteUser,
    rectifyDeleteUser,
  } = useAdminPanel();

  return (
    <Background>
      <Header />
      <PanelCard className="mt-24 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

        <div className="overflow-x-auto border rounded-lg shadow max-h-[500px] overflow-y-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left">Usuario</th>
                <th className="p-3 text-left">Biblioteca</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 break-words">{user.username}</td>
                  <td className="p-3 break-words">{user.library}</td>

                  {/* Estado */}
                  <td className="p-3">
                    {user.is_erased ? (
                      <div className="px-2 py-1 bg-gray-500 text-white rounded-full text-sm w-max">
                        Borrado
                        {user.delete_date && (
                          <span className="text-black text-xs block">
                            {`Fecha: ${user.delete_date}`}
                          </span>
                        )}
                      </div>
                    ) : user.is_blocked ? (
                      <div className="px-2 py-1 bg-red-500 text-white rounded-full text-sm w-max">
                        Bloqueado
                        {user.block_date && (
                          <span className="text-black text-xs block">
                            {`Fecha: ${user.block_date}`}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="px-2 py-1 bg-green-500 text-white rounded-full text-sm">
                        Activo
                      </span>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="p-3 flex gap-2 flex-wrap">
                    {user.is_erased ? (
                      <button
                        className="px-3 py-1 bg-green-200 rounded whitespace-nowrap"
                        onClick={() => rectifyDeleteUser(user.id)}
                      >
                        Rectificar
                      </button>
                    ) : user.is_blocked ? (
                      <>
                        <button
                          className="px-3 py-1 bg-green-200 rounded whitespace-nowrap"
                          onClick={() => unblockUser(user.id)}
                        >
                          Rectificar
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded whitespace-nowrap"
                          onClick={() => deleteUser(user.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-3 py-1 bg-yellow-200 rounded whitespace-nowrap"
                          onClick={() => blockUser(user.id)}
                        >
                          Bloquear
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded whitespace-nowrap"
                          onClick={() => deleteUser(user.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </Background>
  );
}
