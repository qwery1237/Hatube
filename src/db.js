import mongoose from "mongoose";


//creating db server
mongoose.connect("mongodb://127.0.0.1:27017/hatube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} ); //기본url/nameOfDb



// error checking
const db = mongoose.connection; // db 연결상태
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
db.on("error", handleError); // 에러는 여러번 날 수 있으니깐
db.once("open", handleOpen); // 연결은 한번만 실행해줘도되니깐



//CRUD: creat,read,upload,delete