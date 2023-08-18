import { chromium, Browser, Page, BrowserContext } from "playwright";
import * as clipboard from "clipboardy";
import * as dotenv from "dotenv";

dotenv.config();

const buttonSelector = {
  emailInput: "input[name='email']",
  passwordInput: "input[name='password']",
  submitButton: 'button[type="submit"]',
};

interface UserInfo {
  [key: string]: string;
}

async function login(page: Page) {
  const { ID, PW } = process.env;

  await page.goto(
    "https://id.wanted.jobs/login?service=wanted&before_url=https://www.wanted.co.kr/jobsfeed&client_id=AhWBZolyUalsuJpHVRDrE4Px&redirect_url=https://www.wanted.co.kr/api/chaos/auths/v1/callback/set-token&message_key=userweb_default"
  );

  await (await page.waitForSelector(buttonSelector.emailInput)).type(ID!);
  await (await page.waitForSelector(buttonSelector.submitButton)).click();

  await (await page.waitForSelector(buttonSelector.passwordInput)).type(PW!);
  await (await page.waitForSelector(buttonSelector.submitButton)).click();
  console.log("로그인 성공");

  await page.waitForNavigation();
}

async function navigateJobPostings(page: Page) {
  await page.goto(
    "https://www.wanted.co.kr/dashboard/recruitment?order=id&status=active"
  );
}

async function getJobPostings(page: Page): Promise<string[]> {
  await page.waitForSelector(
    "td.styled__TableData-sc-10oxjpl-3.kiCEfJ a[data-attribute-id='biz__recruitmentList__position__click']"
  );
  const elements = await page.$$(
    "td.styled__TableData-sc-10oxjpl-3.kiCEfJ a[data-attribute-id='biz__recruitmentList__position__click']"
  );

  let applyPostId: string[] = [];
  for (let element of elements) {
    const text = await element.textContent();
    if (parseInt(text || "0", 10) > 0) {
      const href = (await element.getAttribute("data-position-id")) || "";
      applyPostId.push(href);
    }
  }
  console.log("채용공고 가져오기 완료");
  return applyPostId;
}

async function getUserCardsId(page: Page): Promise<string[]> {
  await page.waitForSelector(".bCKHtx");
  const userCards = await page.$$(".bCKHtx");

  let userCardsId: string[] = [];
  for (let card of userCards) {
    await page.waitForSelector(".bCKHtx");
    const userId = (await card.getAttribute("data-apply-id")) || "";
    userCardsId.push(userId);
  }
  return userCardsId;
}

async function saveUserResume(
  page: Page,
  applyPostIds: string[]
): Promise<UserInfo[]> {
  const labels = ["이름", "이메일", "연락처", "이력서&첨부파일", "지원날짜"];
  let allUserInfo: UserInfo[] = [];

  // Implementation of the method goes here
  // For brevity, it's omitted.

  return allUserInfo;
}

async function testSaveUserResume(
  page: Page,
  applyPostIds: string[]
): Promise<UserInfo[]> {
  const labels = [
    "이름",
    "이메일",
    "연락처",
    "공고명",
    "이력서명",
    "이력서&첨부파일",
    "지원날짜",
  ];

  let allUserInfo: UserInfo[] = [];

  // Implementation of the method goes here
  // For brevity, it's omitted.

  return allUserInfo;
}

async function main() {
  const browser: Browser = await chromium.launch({
    headless: true,
  });
  const userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36";
  const context: BrowserContext = await browser.newContext({ userAgent });
  context.setDefaultNavigationTimeout(0);
  context.setDefaultTimeout(0);

  const page: Page = await context.newPage();

  // Log in
  await login(page);

  // Navigate to job postings
  await navigateJobPostings(page);

  // Get job postings
  const applyPostId = await getJobPostings(page);

  const all = await testSaveUserResume(page, applyPostId);

  console.log("🚀 ~ file: test.ts:166 ~ main ~ all:", all);

  await browser.close();
  //TODO:userdata를 서버에 전송
}

// Call the main function
main();
