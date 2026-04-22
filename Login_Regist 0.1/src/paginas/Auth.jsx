import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function Auth() {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    // 🔥 LIMPIEZA (clave)
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      let userCredential;

      if (modo === "login") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          cleanPassword
        );

        setMensaje(`Bienvenido ${userCredential.user.email}`);
        navigate("/inicio");
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          cleanPassword
        );

        setMensaje(`Usuario creado con éxito`);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);

      if (modo === "login") {
        switch (error.code) {
          case "auth/user-not-found":
            setMensaje("Usuario no encontrado");
            break;
          case "auth/wrong-password":
            setMensaje("Contraseña incorrecta");
            break;
          case "auth/invalid-credential":
            setMensaje("Email o contraseña incorrectos");
            break;
          case "auth/invalid-email":
            setMensaje("Correo inválido");
            break;
          case "auth/too-many-requests":
            setMensaje("Demasiados intentos. Probá más tarde");
            break;
          default:
            setMensaje("Error: " + error.message);
        }
      } else {
        switch (error.code) {
          case "auth/email-already-in-use":
            setMensaje("El correo ya está registrado");
            break;
          case "auth/weak-password":
            setMensaje("La contraseña debe tener al menos 6 caracteres");
            break;
          case "auth/invalid-email":
            setMensaje("Correo inválido");
            break;
          case "auth/too-many-requests":
            setMensaje("Demasiados intentos. Probá más tarde");
            break;
          default:
            setMensaje("Error: " + error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* 🔥 SWITCH */}
      <div style={styles.switchContainer}>
        <button
          onClick={() => {
            setModo("login");
            setMensaje("");
          }}
          style={{
            ...styles.switchBtn,
            background: modo === "login" ? "#1976d2" : "#eee",
            color: modo === "login" ? "#fff" : "#000",
          }}
        >
          Login
        </button>

        <button
          onClick={() => {
            setModo("registro");
            setMensaje("");
          }}
          style={{
            ...styles.switchBtn,
            background: modo === "registro" ? "#1976d2" : "#eee",
            color: modo === "registro" ? "#fff" : "#000",
          }}
        >
          Registro
        </button>
      </div>

      <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.btn}>
          {loading
            ? modo === "login"
              ? "Ingresando..."
              : "Registrando..."
            : modo === "login"
            ? "Ingresar"
            : "Registrarse"}
        </button>
      </form>

      {mensaje && <p style={styles.msg}>{mensaje}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "340px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
  },
  switchContainer: {
    display: "flex",
    marginBottom: "15px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  switchBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  msg: {
    marginTop: "15px",
  },
};