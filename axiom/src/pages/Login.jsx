import { useEffect, useState } from 'react';
import { Auth } from '../lib/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem('last_email');
    if (last) setForm((f) => ({ ...f, email: last }));
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await Auth.login(form); // <- lanza si 401/400
      localStorage.setItem('auth_user', JSON.stringify(res.user));
      window.location.assign('/chat'); // <- al chat en éxito
    } catch (e) {
      setErr(e.message || 'Error al ingresar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ax-main">
      <div className="section">
        <div className="container-xl" style={{ maxWidth: 520 }}>
          <h1 style={{ marginTop: 24, marginBottom: 16 }}>Ingresar</h1>
          <p className="hero-sub" style={{ marginBottom: 24 }}>
            Accede a tu cuenta para continuar.
          </p>

          <form onSubmit={onSubmit} className="card-like">
            <div className="field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
              />
            </div>
            <div className="field">
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={onChange}
              />
            </div>

            {err && (
              <div className="error" role="alert" style={{ marginBottom: 12 }}>
                {err}
              </div>
            )}

            <div className="actions">
              <button disabled={loading} className="button-primary" type="submit">
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
              <a className="button-ghost" href="/register">Crear cuenta</a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
