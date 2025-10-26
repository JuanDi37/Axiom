import { useState } from 'react';
import { Auth } from '../lib/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await Auth.register(form);
      // Opcional: persistir email para el login inmediato
      localStorage.setItem('last_email', form.email);
      window.location.assign('/login');
    } catch (e) {
      setErr(e.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ax-main">
      <div className="section">
        <div className="container-xl" style={{ maxWidth: 520 }}>
          <h1 style={{ marginTop: 24, marginBottom: 16 }}>Crear cuenta</h1>
          <p className="hero-sub" style={{ marginBottom: 24 }}>
            Regístrate para empezar a usar Axiom.
          </p>

          <form onSubmit={onSubmit} className="card-like">
            <div className="field">
              <label>Nombre</label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={onChange}
              />
            </div>
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
                minLength={8}
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
                {loading ? 'Creando...' : 'Crear cuenta'}
              </button>
              <a className="button-ghost" href="/login">Ya tengo cuenta</a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
