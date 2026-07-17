import React, { useState } from "react";
import axios from "axios";
import { verifyUser } from "../services/userService";

interface User {
  _id: string;
  name: string;
  letterNo: string;
  program?: string;
  issueDate?: string;
}

const Verifydetails = () => {
  const [letterNo, setLetterNo] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [user, setUser] = useState<User | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLetterNo(e.target.value);
    setMessage("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!letterNo.trim()) {
      setMessage("Please enter the Letter No.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setStatus("idle");
    setUser(null);

    try {
      const data = await verifyUser(letterNo.trim());

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
      <div className="verify-shell">
        <div className="verify-card">
          <span className="eyebrow">Certificate Check</span>
          <h2>Certificate Verification</h2>
          <p className="subtitle">
            Enter the Letter No. printed on the certificate to confirm its
            authenticity.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="letterNo">Letter No.</label>
              <input
                id="letterNo"
                type="text"
                name="letterNo"
                placeholder="e.g. FLUX/2026/0142"
                value={letterNo}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" aria-hidden="true" />
                  Verifying
                </span>
              ) : (
                "Verify certificate"
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
              <span className="badge-id">#{user._id.slice(-6).toUpperCase()}</span>
            </div>

            <div className="badge-avatar" aria-hidden="true">
              {user.name.trim().charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>

            <div className="badge-punch" />

            <dl className="badge-fields">
              <div className="badge-field">
                <dt>Letter No.</dt>
                <dd>{user.letterNo}</dd>
              </div>
              {user.program && (
                <div className="badge-field">
                  <dt>Program</dt>
                  <dd>{user.program}</dd>
                </div>
              )}
              {user.issueDate && (
                <div className="badge-field">
                  <dt>Issued On</dt>
                  <dd>
                    {new Date(user.issueDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verifydetails;
