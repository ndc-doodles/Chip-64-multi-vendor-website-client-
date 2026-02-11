import { Laptop, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import { logoutAllApi } from "@/API/userAPI";
export default function SecuritySessions() {
  const user = useSelector((s) => s.user?.user);
  const sessions = user?.recentLogins || [];
  const dispatch=useDispatch()
  const logoutAll = async () => {
  await  logoutAllApi();
  dispatch({ type: "LOGOUT" });
  window.location.href = "/";
};

  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderLayout/>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Devices & Sessions
          </h1>
          <p className="text-gray-500 mt-2">
            You’re logged in on these devices
          </p>
        </div>

        {/* Sessions list */}
        <div className="space-y-4">
          {sessions.length === 0 && (
            <p className="text-sm text-gray-500">
              No active sessions found
            </p>
          )}

          {sessions.map((session, index) => {
            const isCurrent = index === 0;

            return (
              <div
                key={session._id}
                className={`flex items-center justify-between rounded-xl border bg-white p-5 ${
                  isCurrent ? "border-gray-900" : "border-gray-200"
                }`}
              >
                <div className="flex gap-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <Laptop size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {session.device}
                    </p>

                    <p className="text-xs text-gray-500">
                      {session.location || "Unknown location"}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Last active:{" "}
                      {new Date(session.loggedAt).toLocaleString()}
                    </p>

                    {isCurrent && (
                      <span className="inline-block mt-2 text-xs font-medium text-green-600">
                        Current device
                      </span>
                    )}
                  </div>
                </div>

                {!isCurrent && (
                  <button className="text-sm text-red-600 hover:text-red-700">
                    Sign out
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Global sign out */}
        {sessions.length > 1 && (
          <button className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-black hover:bg-gray-800 transition" onClick={logoutAll}>
            <LogOut size={16}  />
            Sign out of all  devices
          </button>
        )}
      </section>
    </main>
  );
}
