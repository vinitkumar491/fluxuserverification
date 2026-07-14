import React, { useState } from "react";
import axios from "axios";
import { verifyUser } from "../services/userService";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
}

  const Verifydetails = () => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      mobile: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<User | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });

      setMessage("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.name || !form.email || !form.mobile) {
        setMessage("Please fill all fields.");
        return;
      }

      if (!/^\d{10}$/.test(form.mobile)) {
        setMessage("Please enter a valid 10-digit mobile number.");
        return;
      }

      setLoading(true);
      setMessage("");
      setUser(null);

      try {
        const data = await verifyUser(
          form.name.trim(),
          form.email.trim(),
          Number(form.mobile)
        );

        setMessage(data.message);
        setUser(data.user);

      } catch (err) {
        if (axios.isAxiosError(err)) {
          setMessage(err.response?.data?.message || "Verification failed");
        } else {
          setMessage("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h2>User Verification</h2>
        <p className="subtitle">
          Verify user details by entering the registered information.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter 10-digit Mobile Number"
              value={form.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Only digits

                if (value.length <= 10) {
                  setForm({
                    ...form,
                    mobile: value,
                  });
                }

                setMessage("");
              }}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify User"}
          </button>
        </form>

        {message && <div className="message">{message}</div>}

        {user && (
          <div className="user-card">
            <h3>Verified User</h3>

            <div className="detail">
              <span>Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="detail">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="detail">
              <span>Phone</span>
              <strong>{user.phone}</strong>
            </div>

            <div className="detail">
              <span>User ID</span>
              <strong>{user._id}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verifydetails;