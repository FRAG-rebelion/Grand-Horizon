/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [countries, setCountries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:5000/getallcountries");
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();


    if (!name || !email || !phone || !selectedCountry || !dob || !password) {
      alert("Please fill in all fields.");
      return;
    }

  
    const nationality_id = parseInt(selectedCountry, 10);
    if (isNaN(nationality_id)) {
      alert("Please select a valid country.");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      nationality_id,  
      dob,
      password,
    };

    console.log("Register payload:", payload);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        console.error("Backend error response:", data);
        alert("Registration failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-BG p-6">
      <div className="w-full max-w-md bg-BC p-8 shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-prime mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
          />

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all"
          >
            <option value="" disabled>
              Select Nationality
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-second text-BC py-3 rounded-lg font-semibold hover:bg-H hover:text-BC transition-all transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-text mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-H hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
