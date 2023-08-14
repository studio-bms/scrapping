import { chromium } from "playwright";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const ID = process.env.ID;
  const PW = process.env.PW;

  //원티드  페이지 로그인
  await page.goto(
    "https://id.wanted.jobs/login?service=wanted&before_url=https://www.wanted.co.kr/jobsfeed&client_id=AhWBZolyUalsuJpHVRDrE4Px&redirect_url=https://www.wanted.co.kr/api/chaos/auths/v1/callback/set-token&message_key=userweb_default"
  );

  await (await page.waitForSelector("input[name='email']")).type(ID);
  await (await page.waitForSelector('button[type="submit"]')).click();

  await (await page.waitForSelector("input[name='password']")).type(PW);
  await (await page.waitForSelector('button[type="submit"]')).click();

  //   await page.goto("https://www.wanted.co.kr/dashboard/home");
  await (
    await page.waitForSelector("li[data-gnb-kind='forEmployers']")
  ).click();

  await (await page.waitForSelector("div.dDgszH")).click();

  await (await page.waitForSelector(".dCEdlK")).click();
  await (await page.waitForSelector("li[data-tab-kind='active']")).click();

  await page.waitForTimeout(8000);
  await browser.close();
})();
