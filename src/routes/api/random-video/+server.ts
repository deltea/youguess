import { json, type RequestHandler } from "@sveltejs/kit";
import { generate } from "random-words";
import { YOUTUBE_API_KEY } from "$env/static/private";
import youtubeSearch from "youtube-search-api";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function randomVideoId(): Promise<string> {
  const randomQuery = generate(random(1, 10)).join(" ");
  const videos = await youtubeSearch.GetListByKeyword(randomQuery, false, 1);
  const videoId = videos.items[0].id;

  if (!videos || videos.length === 0 || videoId.length !== 11) return await randomVideoId();

  return videoId;
}

export const GET: RequestHandler = async () => {
  const videoId = await randomVideoId();

  const result = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&maxResults=1&key=${YOUTUBE_API_KEY}`);

  const data = await result.json();
  const title = data.items[0].snippet.title;
  const views = data.items[0].statistics.viewCount;
  const thumbnails = data.items[0].snippet.thumbnails;

  return json({
    title,
    views,
    thumbnails,
    videoId,
  });
}
