import { json, type RequestHandler } from "@sveltejs/kit";
import { generate } from "random-words";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const GET: RequestHandler = async () => {
  const randomQuery = generate(random(1, 10)).toString();

  const apiKey = "AIzaSyAa_5NB11VOBMRpZWD6oJkyMQZRxBezS38";
  const videos = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${randomQuery}&type=video&key=${apiKey}`);
  const videoId = (await videos.json()).items[0].id.videoId;

  const result = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&maxResults=1&key=${apiKey}`);

  const data = await result.json();
  const title = data.items[0].snippet.title;
  const views = data.items[0].statistics.viewCount;
  const thumbnails = data.items[0].snippet.thumbnails;

  return json({
    title,
    views,
    thumbnails
  });
}
