from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 웹 드라이버 경로 설정

# 브라우저 옵션 설정
options = webdriver.ChromeOptions()

# SPA 페이지 로딩을 위해 대기할 시간 설정
options.page_load_strategy = 'eager'  # 또는 'normal'

# 웹 드라이버 생성
driver = webdriver.Chrome(options=options)

# 대기 시간 설정
wait = WebDriverWait(driver, 10)  # 10초로 설정한 예시입니다.

# 웹 페이지 열기
url = ("https://id.wanted.jobs/login?service=wanted&before_url=https://www.wanted.co.kr/jobsfeed&client_id"
       "=AhWBZolyUalsuJpHVRDrE4Px&redirect_url=https://www.wanted.co.kr/api/chaos/auths/v1/callback/set-token"
       "&message_key=userweb_default")  # 크롤링하려는 SPA 웹사이트 URL을 입력하세요
driver.get(url)

# 로딩이 완료될 때까지 대기
email = driver.find_element(By.XPATH, "//*[@id='__next']/div/div/div/div/form/div[1]/input")
email.send_keys("contact@teamsparta.co")
login_btn = driver.find_element(By.XPATH, "//*[@id='__next']/div/div/div/div/form/button")
login_btn.click()

password = driver.find_element(By.XPATH, "//*[@id='__next']/div/div/div/div[2]/form/div[2]/input")
password.send_keys("Tmvkfmxk0423!")
password_btn = driver.find_element(By.XPATH, "//*[@id='__next']/div/div/div/div/form/button")
password_btn.click()

# 드라이버 종료
driver.quit()
