// src/components/LoginForm.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Format email tidak valid";
    if (!form.password) e.password = "Password wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // simulasi API
      alert("Login sukses (mock)");
    } catch {
      setErrors({ root: "Email atau password salah" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {errors.root && (
        <div className="alert alert-error" role="alert">
          {errors.root}
        </div>
      )}

      <fieldset className="fieldset space-y-3">
        {/* Email */}
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`input w-full ${errors.email ? "input-error" : ""}`}
          placeholder="nama@sekolah.sch.id"
          value={form.email}
          onChange={onChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-error text-sm mt-1">
            {errors.email}
          </p>
        )}

        {/* Password */}
        <label className="label mt-3" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            className={`input w-full pr-10 ${
              errors.password ? "input-error" : ""
            }`}
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="btn btn-ghost btn-xs absolute right-2 top-1/2 -translate-y-1/2"
            aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="text-error text-sm mt-1">
            {errors.password}
          </p>
        )}

        {/* Extra actions */}
        <div className="flex items-center justify-between mt-3">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="text-sm">Ingat saya</span>
          </label>
          <a href="/forgot" className="link link-hover text-sm">
            Lupa password?
          </a>
        </div>

        {/* Submit button */}
        <button
          disabled={loading}
          className="btn btn-primary w-full mt-4"
          type="submit"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </button>
      </fieldset>
    </form>
  );
}
