import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await login(page);
  await navigateJobPostings(page);
  await browser.close();
}

async function login(page) {
  const { ID, PW } = process.env;

  await page.goto(
    "https://id.wanted.jobs/login?service=wanted&before_url=https://www.wanted.co.kr/jobsfeed&client_id=AhWBZolyUalsuJpHVRDrE4Px&redirect_url=https://www.wanted.co.kr/api/chaos/auths/v1/callback/set-token&message_key=userweb_default"
  );

  await page.type("input[name='email']", ID);
  await page.click('button[type="submit"]');
  await page.waitForSelector("input[name='password']");
  await page.type("input[name='password']", PW);
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  console.log("로그인 성공");

  await page.waitForNavigation();
}

async function navigateJobPostings(page) {
  await page.goto(
    "https://www.wanted.co.kr/dashboard/recruitment?order=id&status=active",
    { waitUntil: "networkidle2" }
  );
  await page.waitForTimeout(3000);

  console.log("채용공고 페이지로 이동");
  const status = await page.evaluate(async () => {
    const baseUrl = location.href.substring(
      0,
      location.href.indexOf(".kr") + 3
    );
    const newUrl = `${baseUrl}/api/dashboard/chaos/applications/v1?column_index=send&position_id=$168887&is_reject=false`;
    const response = await fetch(newUrl);
    return response;
  });

  console.log("status: ", status);
}

run();
