import React, { useState } from "react";
import axios from "axios";
import { verifyUser } from "../services/userService";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  letterNo: String;
}

const Verifydetails = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [user, setUser] = useState<User | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.mobile) {
      setMessage("Please fill all fields.");
      setStatus("error");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setStatus("idle");
    setUser(null);

    try {
      const data = await verifyUser(
        form.name.trim(),
        form.email.trim(),
        Number(form.mobile)
      );

      setMessage(data.message);
      setStatus("success");
      setUser(data.user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Verification failed");
      } else {
        setMessage("Something went wrong");
      }
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className={`verify-shell ${user ? "has-result" : ""}`}>
        <div className="verify-card">
          <span className="eyebrow">Identity Check</span>
          <h2>User Verification</h2>
          <p className="subtitle">
            Enter the registered name, email, and mobile number to confirm
            this person's details.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="mobile">Mobile number</label>
              <div className="mobile-field">
                <span className="mobile-prefix">+91</span>
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  placeholder="10-digit number"
                  value={form.mobile}
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      setForm({
                        ...form,
                        mobile: value,
                      });
                    }

                    setMessage("");
                    setStatus("idle");
                  }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" aria-hidden="true" />
                  Verifying
                </span>
              ) : (
                "Verify user"
              )}
            </button>
          </form>

          {message && (
            <div className={`message message-${status}`} role="status">
              {status === "success" && (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M5 10.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {status === "error" && (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 6v5M10 14h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
              <span>{message}</span>
            </div>
          )}

          <footer className="verify-footer">
            <span>Powered by</span>
            <strong>FLUX</strong>
          </footer>
        </div>

        {user && (
          <div className="badge-card">
            <div className="badge-stamp">Verified</div>
            <div className="badge-header">
              <span className="badge-eyebrow">Record found</span>
              {/* <span className="badge-id">#{user._id.slice(-6).toUpperCase()}</span> */}
            </div>

            <div className="badge-avatar" aria-hidden="true">
              {user.name.trim().charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>

            <div className="badge-punch" />

            <dl className="badge-fields">
              <div className="badge-field">
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="badge-field">
                <dt>Phone</dt>
                <dd>{user.phone}</dd>
              </div>
                 <div className="badge-field">
                  <dt>Letter No</dt>
                  <dd>{user.letterNo}</dd>
                </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verifydetails;
