import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.js";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--yellow)] px-5">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-8">
          <h1 className="font-display text-5xl font-black uppercase leading-none tracking-[-0.04em]">
            Idea<span className="text-[var(--red)]">Merch</span>
          </h1>

          <p className="mt-2 text-sm font-black uppercase">
            Admin panel
          </p>
        </div>

        {/* Login */}
        <form
          onSubmit={handleSubmit}
          className="
            border-[3px]
            border-black
            bg-white
            p-6
            shadow-[8px_8px_0_#000]
          "
        >
          <h2 className="font-display text-3xl font-black uppercase">
            Login.
          </h2>

          <div className="mt-6 space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-black uppercase"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="
                  w-full
                  border-[3px]
                  border-black
                  px-4
                  py-3
                  font-bold
                  outline-none
                  focus:bg-[var(--yellow)]
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-black uppercase"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="
                  w-full
                  border-[3px]
                  border-black
                  px-4
                  py-3
                  font-bold
                  outline-none
                  focus:bg-[var(--yellow)]
                "
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border-[3px] border-black bg-[var(--red)] p-3 text-sm font-black uppercase text-white">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                border-[3px]
                border-black
                bg-black
                px-5
                py-3
                font-black
                uppercase
                text-white
                shadow-[4px_4px_0_#000]
                transition-all
                hover:translate-x-[2px]
                hover:translate-y-[2px]
                hover:shadow-[2px_2px_0_#000]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>
        </form>

      </div>

    </main>
  );
}