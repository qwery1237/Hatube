import "./db"; // db파일 자체를 임폴트해옴
import "./models/Video";
import "./models/User"
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT}`)

app.listen(PORT, handleListening);