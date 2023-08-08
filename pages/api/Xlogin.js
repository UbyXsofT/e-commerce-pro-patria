import axios from "axios";

export default async function login(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    // Esegui la logica di validazione dei dati di accesso

    // Esegui la chiamata al tuo sistema di autenticazione o database per verificare le credenziali
    // E restituisci una risposta in base all'esito dell'autenticazione

    if (username === "admin" && password === "password") {
      // Autenticazione riuscita
      const token = "Token generato"; // Genera un token JWT valido
      res.status(200).json({ token });
    } else {
      // Autenticazione fallita
      res.status(401).json({ error: "Credenziali non valide" });
    }
  } else {
    res.status(405).json({ error: "operazione non permessa" });
  }
}
