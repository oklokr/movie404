-- COMMON 및 COMMON_CODE
INSERT INTO COMMON (COMMON_CODE) VALUES 
('LANG_TPCD'), ('DATE_TPCD'), ('USER_TPCD'), ('RATING_TPCD'), ('TERMS_TPCD');

INSERT INTO COMMON_CODE (COMMON_ID, COMMON_CODE, COMMON_NAME, COMMON_VALUE) VALUES
(1, 'LANG_TPCD', '영어', '1'),
(1, 'LANG_TPCD', '한국어', '2'),
(2, 'DATE_TPCD', 'yyyy-MM-dd', '1'),
(3, 'USER_TPCD', 'user', '1'),
(3, 'USER_TPCD', 'admin', '2'),
(3, 'USER_TPCD', 'vip', '3'),
(3, 'USER_TPCD', 'delete', '4'),
(4, 'RATING_TPCD', '성인', '1'),
(4, 'RATING_TPCD', '전체', '2'),
(5, 'TERMS_TPCD', '서비스이용약관 ', '1'),
(5, 'TERMS_TPCD', '개인정보처리방침 ', '2'),
(5, 'TERMS_TPCD', '마케팅약관 ', '3'),
(5, 'TERMS_TPCD', '통신사이용약관 ', '4');

-- MEMBERS
INSERT INTO MEMBERS (USER_ID, PASSWD, USER_NAME, EMAIL, TEL, AGE, LANG_TPCD, DATE_TPCD, VIEW_ADULT, SAVE_HISTORY, TERMS, USER_TPCD)
VALUES
('user', '1234', '홍길동', 'user1@example.com', '01012345678', 25, '1', '1', 'N', 'Y', 'Y', '1'),
('vip', '1234', '이순신', 'vip@example.com', '01012341234', 25, '1', '1', 'N', 'Y', 'Y', '3'),
('admin', '1234', '관리자', 'admin@example.com', '01043211234', 25, '1', '1', 'N', 'Y', 'Y', '2'),
('delete', '1234', '김유신', 'delete@example.com', '01056781234', 25, '1', '1', 'N', 'Y', 'Y', '4'),
('user2', '1234', '강감찬', 'user2@example.com', '01087654321', 25, '1', '1', 'N', 'Y', 'Y', '1'),
('user3', '1234', '대조영', 'user3@example.com', '01043214321', 25, '1', '1', 'N', 'Y', 'Y', '1');


-- GENRE
INSERT INTO GENRE (GENRE_CODE, GENRE_NAME) VALUES
('ACT', 'Action'), ('COM', 'Comedy'), ('DRM', 'Drama');

-- CREATOR
INSERT INTO CREATOR (CREATOR_CODE, CREATOR_NAME, GENDER, BIRTH, HOMETOWN) VALUES
('C001', '감독 A', 'M', '1970-05-01', '서울'),
('C002', '배우 B', 'F', '1985-11-23', '부산'),
('CREATOR_UNKNOWN', 'CREATOR_UNKNOWN', '1', null, 'CREATOR_UNKNOWN')

-- MOVIE
INSERT INTO MOVIE (MOVIE_CODE, GENRE_CODEA, MOVIE_NAME, DIRECT_CODEA, ACTOR_CODEA, RUNTIME, RATING_TPCD, MOVIE_RELEASE)
VALUES
('M001', 'ACT', '액션영화1', 'C001', 'C002', 110, '1', '2023-10-05');

-- VOD
INSERT INTO VOD (MOVIE_CODE, PRICE, START_DATE, END_DATE)
VALUES
('M001', 12000, '2024-01-01', '2024-12-31');

-- THEATER
INSERT INTO THEATER (THEATER_CODE, THEATER_NAME) VALUES
('T001', '강남점');

-- SEAT
INSERT INTO SEAT (SEAT_CODE, THEATER_CODE, PRICE) VALUES
('A1', 'T001', 10000),
('A2', 'T001', 10000);

-- RUN_SCHEDULE
INSERT INTO RUN_SCHEDULE (SCHEDULE_CODE, THEATER_CODE, MOVIE_CODE, RUN_DATE, START_TIME, END_TIME)
VALUES
('S001', 'T001', 'M001', '2024-05-20', '14:00:00', '15:50:00');

-- RESERVATION
INSERT INTO RESERVATION (RESERVE_CODE, RESERVE_DATE, USER_ID, THEATER_CODE, MOVIE_CODE, SEAT_CODE, PRICE)
VALUES
('R001', '2024-05-20', 'user', 'T001', 'M001', 'A1', 10000);

-- WATCH_HISTORY
INSERT INTO WATCH_HISTORY (USER_ID, MOVIE_CODE, WATCH_DATE, WATCH_TIME)
VALUES
('user', 'M001', '2024-05-20', '15:00:00');

-- CREDIT_CARD
INSERT INTO CREDIT_CARD (CARD_NUM, USER_ID, EXP_MONTH, CVC, BANK_CODE)
VALUES
('1234567890123456', 'user', '202512', '123', 'KB');

-- ORDER_HISTORY
INSERT INTO ORDER_HISTORY (ORDER_CODE, USER_ID, MOVIE_CODE, PRICE, ORDER_DATE, CARD_NUM)
VALUES
('O001', 'user', 'M001', 12000, '2024-05-21', '1234567890123456');

-- NOTICE
INSERT INTO NOTICE (NOTICE_CODE, CATEGORY, WRITE_DATE, TITLE, CONTENT, WRITER)
VALUES
('N001', 'EVENT', '2024-03-01', '이벤트 공지', '이벤트 내용입니다.', 'user');

-- FAQ
INSERT INTO FAQ (FAQ_CODE, QUESTION, ANSWER)
VALUES
('F001', '어떻게 예매하나요?', '예매는 홈페이지에서 가능합니다.');

-- QNA
INSERT INTO QNA (QNA_CODE, TITLE, CONTENT, USER_ID, WRITE_DATE, REPLY)
VALUES
('Q001', '로그인 오류', '로그인이 안됩니다.', 'user', '2024-04-01', '확인 후 연락드리겠습니다.');

SELECT m.MOVIE_NAME, m.SYNOPSIS, w.WATCH_DATE, w.WATCH_TIME 
FROM ORDER_HISTORY oh, WATCH_HISTORY w, MOVIE m 
where oh.MOVIE_CODE = m.MOVIE_CODE and oh.MOVIE_CODE = w.MOVIE_CODE 

select * from movie;
select * from creator where `CREATOR_CODE`="60279"

select * from vod;
select * from members;

select * from order_history;
select mv.`POSTER`, mv.`MOVIE_NAME`, mv.`SYNOPSIS`, 
wh.`WATCH_DATE`, wh.`WATCH_TIME`, ca.`CREATOR_NAME` as director,cb.`CREATOR_NAME` as actora, cc.`CREATOR_NAME` as actorb, cd.`CREATOR_NAME` as actorc
from members m 
left join order_history oh on oh.`MOVIE_CODE`=`MOVIE_CODE`
left join movie mv on mv.`MOVIE_CODE`= oh.`MOVIE_CODE`
left join watch_history wh on m.`USER_ID`=wh.`USER_ID` and wh.`MOVIE_CODE`=mv.`MOVIE_CODE`
left join creator ca on mv.`DIRECT_CODEA`=ca.`CREATOR_CODE`
left join creator cb on mv.`ACTOR_CODEA`=cb.`CREATOR_CODE`
left join creator cc on mv.`ACTOR_CODEB`=cc.`CREATOR_CODE`
left join creator cd on mv.`ACTOR_CODEC`=cd.`CREATOR_CODE`
where m.`USER_ID`="user"
;

  select mv.`POSTER` as poster, mv.`MOVIE_NAME` as movieName, mv.`SYNOPSIS`as synopsis, 
wh.`WATCH_DATE` as watchdate, wh.`WATCH_TIME` as watchtime, ca.`CREATOR_NAME` as directorA,
cb.`CREATOR_NAME` as actorA, cc.`CREATOR_NAME` as actorB, cd.`CREATOR_NAME` as actorC
from members m 
left join order_history oh on oh.`MOVIE_CODE`=`MOVIE_CODE`
left join movie mv on mv.`MOVIE_CODE`= oh.`MOVIE_CODE`
left join watch_history wh on m.`USER_ID`=wh.`USER_ID` and wh.`MOVIE_CODE`=mv.`MOVIE_CODE`
left join creator ca on mv.`DIRECT_CODEA`=ca.`CREATOR_CODE`
left join creator cb on mv.`ACTOR_CODEA`=cb.`CREATOR_CODE`
left join creator cc on mv.`ACTOR_CODEB`=cc.`CREATOR_CODE`
left join creator cd on mv.`ACTOR_CODEC`=cd.`CREATOR_CODE`
where m.`USER_ID`="user"

select * from watch_history