"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var dotenv = require("dotenv");
dotenv.config();
var buttonSelector = {
    emailInput: "input[name='email']",
    passwordInput: "input[name='password']",
    submitButton: 'button[type="submit"]',
};
function login(page) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, ID, PW;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = process.env, ID = _a.ID, PW = _a.PW;
                    return [4 /*yield*/, page.goto("https://id.wanted.jobs/login?service=wanted&before_url=https://www.wanted.co.kr/jobsfeed&client_id=AhWBZolyUalsuJpHVRDrE4Px&redirect_url=https://www.wanted.co.kr/api/chaos/auths/v1/callback/set-token&message_key=userweb_default")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector(buttonSelector.emailInput)];
                case 2: return [4 /*yield*/, (_b.sent()).type(ID)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector(buttonSelector.submitButton)];
                case 4: return [4 /*yield*/, (_b.sent()).click()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector(buttonSelector.passwordInput)];
                case 6: return [4 /*yield*/, (_b.sent()).type(PW)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector(buttonSelector.submitButton)];
                case 8: return [4 /*yield*/, (_b.sent()).click()];
                case 9:
                    _b.sent();
                    console.log("로그인 성공");
                    return [4 /*yield*/, page.waitForNavigation()];
                case 10:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function navigateJobPostings(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto("https://www.wanted.co.kr/dashboard/recruitment?order=id&status=active")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getJobPostings(page) {
    return __awaiter(this, void 0, void 0, function () {
        var elements, applyPostId, _i, elements_1, element, text, href;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector("td.styled__TableData-sc-10oxjpl-3.kiCEfJ a[data-attribute-id='biz__recruitmentList__position__click']")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.$$("td.styled__TableData-sc-10oxjpl-3.kiCEfJ a[data-attribute-id='biz__recruitmentList__position__click']")];
                case 2:
                    elements = _a.sent();
                    applyPostId = [];
                    _i = 0, elements_1 = elements;
                    _a.label = 3;
                case 3:
                    if (!(_i < elements_1.length)) return [3 /*break*/, 7];
                    element = elements_1[_i];
                    return [4 /*yield*/, element.textContent()];
                case 4:
                    text = _a.sent();
                    if (!(parseInt(text || "0", 10) > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, element.getAttribute("data-position-id")];
                case 5:
                    href = (_a.sent()) || "";
                    applyPostId.push(href);
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7:
                    console.log("채용공고 가져오기 완료");
                    return [2 /*return*/, applyPostId];
            }
        });
    });
}
function getUserCardsId(page) {
    return __awaiter(this, void 0, void 0, function () {
        var userCards, userCardsId, _i, userCards_1, card, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector(".bCKHtx")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.$$(".bCKHtx")];
                case 2:
                    userCards = _a.sent();
                    userCardsId = [];
                    _i = 0, userCards_1 = userCards;
                    _a.label = 3;
                case 3:
                    if (!(_i < userCards_1.length)) return [3 /*break*/, 7];
                    card = userCards_1[_i];
                    return [4 /*yield*/, page.waitForSelector(".bCKHtx")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, card.getAttribute("data-apply-id")];
                case 5:
                    userId = (_a.sent()) || "";
                    userCardsId.push(userId);
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/, userCardsId];
            }
        });
    });
}
function saveUserResume(page, applyPostIds) {
    return __awaiter(this, void 0, void 0, function () {
        var labels, allUserInfo;
        return __generator(this, function (_a) {
            labels = ["이름", "이메일", "연락처", "이력서&첨부파일", "지원날짜"];
            allUserInfo = [];
            // Implementation of the method goes here
            // For brevity, it's omitted.
            return [2 /*return*/, allUserInfo];
        });
    });
}
function testSaveUserResume(page, applyPostIds) {
    return __awaiter(this, void 0, void 0, function () {
        var labels, allUserInfo;
        return __generator(this, function (_a) {
            labels = [
                "이름",
                "이메일",
                "연락처",
                "공고명",
                "이력서명",
                "이력서&첨부파일",
                "지원날짜",
            ];
            allUserInfo = [];
            // Implementation of the method goes here
            // For brevity, it's omitted.
            return [2 /*return*/, allUserInfo];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, userAgent, context, page, applyPostId, all;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch({
                        headless: true,
                    })];
                case 1:
                    browser = _a.sent();
                    userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36";
                    return [4 /*yield*/, browser.newContext({ userAgent: userAgent })];
                case 2:
                    context = _a.sent();
                    context.setDefaultNavigationTimeout(0);
                    context.setDefaultTimeout(0);
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    // Log in
                    return [4 /*yield*/, login(page)];
                case 4:
                    // Log in
                    _a.sent();
                    // Navigate to job postings
                    return [4 /*yield*/, navigateJobPostings(page)];
                case 5:
                    // Navigate to job postings
                    _a.sent();
                    return [4 /*yield*/, getJobPostings(page)];
                case 6:
                    applyPostId = _a.sent();
                    return [4 /*yield*/, testSaveUserResume(page, applyPostId)];
                case 7:
                    all = _a.sent();
                    console.log("🚀 ~ file: test.ts:166 ~ main ~ all:", all);
                    return [4 /*yield*/, browser.close()];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Call the main function
main();
