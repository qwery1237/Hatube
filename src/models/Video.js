import mongoose from "mongoose";

//describing the shape of the data
const videoSchema = new mongoose.Schema({
    title: { type:String, reqired:true, trim: true, maxLength: 80 }, //trim 양쪽 빈공간 제거
    description: { type:String, reqired:true, trim: true, minLength: 20 },
    createdAt: { type:Date, required:true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default:0, reqired: true},
        rating: { type: Number, default:0, reqired: true},
    },
});


//middleware
/*
videoSchema.pre("save", async function(){
    this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
*/

// 함수하나 만들어줌 임폴트가 필요없으니깐
videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});


//creating model
const movieModel = mongoose.model("Video", videoSchema)// 'v' upper case

export default movieModel;

// server.js 에 파일전체를 임폴트해줌