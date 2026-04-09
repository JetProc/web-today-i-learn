# SQL 실습 문제 답안

## 전제
- 문법은 MySQL 기준으로 작성했다.
- 문제 1~4를 통해 `attendance`를 정규화하고, 이후 문제는 `crew` 테이블이 이미 존재한다고 가정했다.
- 제공된 seed 데이터에는 `어셔`, `주니`, `아론`이 없어서 문제 6~9는 `crew.nickname` 기준으로 동작하는 일반형 쿼리로 작성했다.

## DDL 실습

### 문제 1. 테이블 생성하기
생각해보기:
중복되는 컬럼은 `nickname`이다. `crew_id`와 `nickname`의 매핑이 반복해서 저장되고 있으므로, 크루 고유 정보는 `crew` 테이블로 분리하는 것이 좋다.

크루 정보 추출:
```sql
SELECT DISTINCT
  crew_id,
  nickname
FROM attendance
ORDER BY crew_id;
```

`crew` 테이블 생성:
```sql
CREATE TABLE crew (
  crew_id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(50) NOT NULL,
  PRIMARY KEY (crew_id)
);
```

크루 정보 삽입:
```sql
INSERT INTO crew (crew_id, nickname)
SELECT DISTINCT
  crew_id,
  nickname
FROM attendance
ORDER BY crew_id;
```

### 문제 2. 테이블 컬럼 삭제하기
생각해보기:
`crew` 테이블로 크루 정보를 분리했다면, `attendance`에서 불필요해지는 컬럼은 `nickname`이다.

```sql
ALTER TABLE attendance
DROP COLUMN nickname;
```

### 문제 3. 외래키 설정하기
생각해보기:
`attendance.crew_id`가 `crew.crew_id`를 반드시 참조하도록 만들어야, 존재하지 않는 크루의 출석 기록이 남는 고아 데이터 문제를 막을 수 있다.

```sql
ALTER TABLE attendance
ADD CONSTRAINT fk_attendance_crew
FOREIGN KEY (crew_id)
REFERENCES crew(crew_id)
ON UPDATE CASCADE
ON DELETE RESTRICT;
```

### 문제 4. 유니크 키 설정
생각해보기:
닉네임 중복이 금지라면 `crew.nickname`에 유니크 제약을 추가해야 한다.

```sql
ALTER TABLE crew
ADD CONSTRAINT uq_crew_nickname
UNIQUE (nickname);
```

## DML(CRUD) 실습

### 문제 5. 크루 닉네임 검색하기
3월 4일에 닉네임 첫 글자가 `디`인 크루 찾기:
```sql
SELECT DISTINCT
  c.nickname
FROM attendance a
JOIN crew c
  ON c.crew_id = a.crew_id
WHERE a.attendance_date = '2025-03-04'
  AND c.nickname LIKE '디%';
```

결과:
`디노`

### 문제 6. 출석 기록 확인하기
생각해보기:
누락 여부를 확인할 때는 특정 날짜 조건을 `LEFT JOIN`의 `ON` 절에 두면, 크루는 보이되 출석 기록만 비어 있는 상태를 확인하기 쉽다.

```sql
SELECT
  c.crew_id,
  c.nickname,
  a.attendance_date,
  a.start_time,
  a.end_time
FROM crew c
LEFT JOIN attendance a
  ON a.crew_id = c.crew_id
 AND a.attendance_date = '2025-03-06'
WHERE c.nickname = '어셔';
```

### 문제 7. 누락된 출석 기록 추가
생각해보기:
사후 입력이라도 같은 날짜의 기록이 이미 있으면 중복 삽입이 되면 안 되므로 `NOT EXISTS`를 함께 두는 편이 안전하다.

```sql
INSERT INTO attendance (crew_id, attendance_date, start_time, end_time)
SELECT
  c.crew_id,
  '2025-03-06',
  '09:31',
  '18:01'
FROM crew c
WHERE c.nickname = '어셔'
  AND NOT EXISTS (
    SELECT 1
    FROM attendance a
    WHERE a.crew_id = c.crew_id
      AND a.attendance_date = '2025-03-06'
  );
```

### 문제 8. 잘못된 출석 기록 수정
```sql
UPDATE attendance a
JOIN crew c
  ON c.crew_id = a.crew_id
SET a.start_time = '10:00'
WHERE c.nickname = '주니'
  AND a.attendance_date = '2025-03-12';
```

### 문제 9. 허위 출석 기록 삭제
```sql
DELETE a
FROM attendance a
JOIN crew c
  ON c.crew_id = a.crew_id
WHERE c.nickname = '아론'
  AND a.attendance_date = '2025-03-12';
```

### 문제 10. 출석 정보 조회하기
생각해보기:
`JOIN`을 사용하면 `crew_id`로 연결된 `nickname`을 함께 가져올 수 있어서, 결과를 사람이 읽기 쉬운 형태로 바로 확인할 수 있다.

```sql
SELECT
  a.attendance_date,
  c.nickname,
  a.start_time,
  a.end_time
FROM attendance a
JOIN crew c
  ON c.crew_id = a.crew_id
ORDER BY a.attendance_date, c.nickname;
```

### 문제 11. nickname으로 쿼리 처리하기
예시: 닉네임이 `검프`인 크루의 출석 기록 조회
```sql
SELECT
  attendance_date,
  start_time,
  end_time
FROM attendance
WHERE crew_id = (
  SELECT crew_id
  FROM crew
  WHERE nickname = '검프'
)
ORDER BY attendance_date;
```

### 문제 12. 가장 늦게 하교한 크루 찾기
전날인 2025년 3월 5일 기준 가장 늦게 하교한 크루 조회:
```sql
SELECT
  c.nickname,
  a.end_time
FROM attendance a
JOIN crew c
  ON c.crew_id = a.crew_id
WHERE a.attendance_date = '2025-03-05'
ORDER BY a.end_time DESC
LIMIT 1;
```

결과:
`네오`, `18:15`

## 집계 함수 실습

### 문제 13. 크루별로 기록된 날짜 수 조회
```sql
SELECT
  c.nickname,
  COUNT(a.attendance_id) AS recorded_days
FROM crew c
LEFT JOIN attendance a
  ON a.crew_id = c.crew_id
GROUP BY c.crew_id, c.nickname
ORDER BY c.crew_id;
```

제공된 seed 데이터 기준 결과:
- 검프 7
- 구구 6
- 네오 5
- 브라운 7
- 브리 6
- 포비 5
- 워니 4
- 리사 7
- 제임스 7
- 류시 7
- 디노 7
- 시지프 7

### 문제 14. 크루별로 등교 기록이 있는 날짜 수 조회
```sql
SELECT
  c.nickname,
  COUNT(a.start_time) AS started_days
FROM crew c
LEFT JOIN attendance a
  ON a.crew_id = c.crew_id
GROUP BY c.crew_id, c.nickname
ORDER BY c.crew_id;
```

제공된 seed 데이터 기준에서는 모든 행의 `start_time`이 `NULL`이 아니므로 문제 13과 같은 결과가 나온다.

### 문제 15. 날짜별로 등교한 크루 수 조회
```sql
SELECT
  attendance_date,
  COUNT(DISTINCT crew_id) AS started_crew_count
FROM attendance
WHERE start_time IS NOT NULL
GROUP BY attendance_date
ORDER BY attendance_date;
```

제공된 seed 데이터 기준 결과:
- 2025-03-04: 12명
- 2025-03-05: 12명
- 2025-03-06: 9명
- 2025-03-07: 10명
- 2025-03-10: 10명
- 2025-03-11: 10명
- 2025-03-12: 12명

### 문제 16. 크루별 가장 빠른 등교 시각과 가장 늦은 등교 시각
```sql
SELECT
  c.nickname,
  MIN(a.start_time) AS earliest_start_time,
  MAX(a.start_time) AS latest_start_time
FROM crew c
LEFT JOIN attendance a
  ON a.crew_id = c.crew_id
GROUP BY c.crew_id, c.nickname
ORDER BY c.crew_id;
```

제공된 seed 데이터 기준 결과:
- 검프: 09:45 / 12:55
- 구구: 09:58 / 10:10
- 네오: 09:55 / 13:05
- 브라운: 09:59 / 13:00
- 브리: 09:55 / 10:20
- 포비: 09:52 / 13:10
- 워니: 09:50 / 12:59
- 리사: 09:55 / 13:02
- 제임스: 09:55 / 12:59
- 류시: 09:45 / 13:03
- 디노: 09:55 / 12:57
- 시지프: 09:52 / 12:58
