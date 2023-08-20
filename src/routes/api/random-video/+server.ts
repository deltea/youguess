import { json, type RequestHandler } from "@sveltejs/kit";
import puppeteer from "puppeteer";

export const GET: RequestHandler = async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  await page.goto("https://devpicker.com/random-youtube-video", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector("div.col-md-4 > button");
  await page.click("div.col-md-4 > button");

  await page.waitForSelector("iframe");

  const videoUrl = await page.evaluate(() => {
    const url = document.querySelector("#youtube-link") as HTMLInputElement;

    return url.value;
  });

  browser.close();

  const youtubeIdRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;
  const videoId = videoUrl.match(youtubeIdRegex)?.[5];

  const apiKey = "AIzaSyAa_5NB11VOBMRpZWD6oJkyMQZRxBezS38";
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
