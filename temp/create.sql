SET FOREIGN_KEY_CHECKS = 0;

-- 🚨 기존 테이블 삭제 (순서 중요) 🚨
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS common_codes;
DROP TABLE IF EXISTS common;

SET FOREIGN_KEY_CHECKS = 1;

-- ✅ 공통 코드 테이블 생성
CREATE TABLE common (
    common_id INT AUTO_INCREMENT PRIMARY KEY,
    common_code VARCHAR(50) UNIQUE NOT NULL,
    common_code_create_date DATETIME DEFAULT CURRENT_TIMESTAMP
)
-- ✅ 공통 코드 상세 테이블 생성
CREATE TABLE common_codes (
    common_code_id INT AUTO_INCREMENT PRIMARY KEY,
    common_code VARCHAR(50) NOT NULL,
    common_name VARCHAR(100) NOT NULL,
    common_value VARCHAR(50) NOT NULL,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    common_id INT,
    FOREIGN KEY (common_code) REFERENCES common(common_code) ON DELETE CASCADE,
    FOREIGN KEY (common_id) REFERENCES common(common_id) ON DELETE CASCADE,
    KEY (unique_common_code_value) (common_code, common_value),
    KEY idx_common_value (common_value)
)
-- ✅ 회원 테이블 생성
CREATE TABLE members (
    id VARCHAR(20) PRIMARY KEY,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(10) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    tel VARCHAR(11) UNIQUE NOT NULL,
    age TINYINT(1) DEFAULT 0,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    lang VARCHAR(50) NULL,
    view_adult TINYINT(1) NOT NULL DEFAULT 0,
    save_history TINYINT(1) NOT NULL DEFAULT 0,
    user_type VARCHAR(50) NULL,
    token VARCHAR(30),
    period_validity DATETIME,
    FOREIGN KEY (lang) REFERENCES common_codes(common_value) ON DELETE SET NULL,
    FOREIGN KEY (user_type) REFERENCES common_codes(common_value) ON DELETE SET NULL,
)
-- ✅ 회원 테이블 생성
CREATE TABLE movie (
    movie_code VARCHAR(8) PRIMARY KEY,
    category
)
CREATE TABLE categorys (
    categorys_id INT AUTO_INCREMENT PRIMARY KEY,
)
CREATE TABLE categorys (
    categorys_id INT AUTO_INCREMENT PRIMARY KEY,
)