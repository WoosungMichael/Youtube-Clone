import app from "./app"; //default로 export하는 경우

const PORT = 4000;

const handleListening = () =>
    console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
