import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      const { token, user } = data;
      console.log({token, user});


      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-BG">
      <div className="w-full max-w-md bg-BC p-8 shadow-xl rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-prime mb-8">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-second text-BC font-semibold hover:bg-H hover:text-BC transition-all transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-text mt-6">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-H hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
