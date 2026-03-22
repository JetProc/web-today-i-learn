export const pageContent = {
  site: {
    brandName: '파라디 아카이브',
    footerText: '© 2026 파라디 아카이브. Music, code, and everyday notes.',
  },
  profile: {
    nickname: '파라디',
    tagline: '하고 싶은 일 모두 할 수 있음 좋겠네~',
    image: {
      src: './images/profile.jpeg',
      fallbackSrc: './images/profile-mint.svg',
      alt: '파라디의 프로필 사진',
    },
  },
  intro: {
    paragraphs: [
      '안녕하세요? 파라디입니다. 파라디 섬에 꼭 가보고 싶어요.',
    ],
    linksPrefix: '더 자세한 기록은 ',
    links: [{ label: '깃헙 주소', href: 'https://github.com/jetproc' }],
    linksSuffix: '에 들어가도 사실 별 건 없지만 참고해 주세요!',
  },
  infoTable: [
    { label: '이름', value: '파라디' },
    { label: 'MBTI', value: 'INFJ' },
    { label: '취미', value: '개발, 밴드 활동, 음악, 여행, 독서, 배드민턴, 오버워치' },
    { label: '좋아하는 음식', value: '치킨, 보쌈' },
    { label: '좋아하는 디저트', value: '에그타르트' },
    { label: '요즘 관심사', value: '프로젝트 헤일메리 보러 가기' },
  ],
  gallery: {
    subtitle: '실제 사진을 넣기 쉽게 이름을 맞춰 둔 9장의 갤러리입니다. 사진 파일만 바꾸면 화면에 바로 반영됩니다.',
    items: [
      {
        caption: '좋아하는 음식',
        image: {
          src: './images/food.jpeg',
          fallbackSrc: './images/gallery-food.svg',
          alt: '좋아하는 음식 사진',
        },
      },
      {
        caption: '취미',
        image: {
          src: './images/drum.png',
          fallbackSrc: './images/gallery-hobby.svg',
          alt: '취미를 담은 사진',
        },
      },
      {
        caption: '이상형의 분위기',
        image: {
          src: './images/이상형.jpeg',
          fallbackSrc: './images/gallery-ideal.svg',
          alt: '이상형의 분위기를 떠올리게 하는 사진',
        },
      },
      {
        caption: '좋아하는 디저트',
        image: {
          src: './images/dessert.jpeg',
          fallbackSrc: './images/gallery-dessert.svg',
          alt: '좋아하는 디저트 사진',
        },
      },
      {
        caption: '닮은 동물',
        image: {
          src: './images/레서판다.jpeg',
          fallbackSrc: './images/gallery-character.svg',
          alt: '레서판다 사진',
        },
      },
      {
        caption: '기억에 남는 여행지',
        image: {
          src: './images/travel.jpeg',
          fallbackSrc: './images/gallery-travel.svg',
          alt: '기억에 남는 여행지 사진',
        },
      },
      {
        caption: '좋아하는 동물',
        image: {
          src: './images/cat.jpeg',
          fallbackSrc: './images/gallery-animal.svg',
          alt: '좋아하는 동물 사진',
        },
      },
      {
        caption: '좋아하는 계절',
        image: {
          src: './images/spring.jpeg',
          fallbackSrc: './images/gallery-season.svg',
          alt: '좋아하는 계절 사진',
        },
      },
      {
        caption: '좋아하는 색깔',
        image: {
          src: './images/gallery-color.svg',
          fallbackSrc: './images/gallery-color.svg',
          alt: '연한 주황색 단색 이미지',
        },
      },
    ],
  },
  works: [
    {
      category: '인생 영화',
      title: '타임 패러독스',
      summaryParagraphs: [
        '시간여행이라는 소재를 단순한 장치로만 쓰지 않고, 정체성과 선택의 문제까지 밀도 있게 끌고 가는 방식이 정말 인상적이었습니다.',
        '마지막까지 긴장을 놓을 수 없게 만드는 전개 덕분에 여러 번 다시 보게 되는 영화이고, 볼 때마다 구조를 어떻게 이렇게 짰는지 다시 감탄하게 됩니다.',
        '초등학교 때 이런 타임 슬립과 스릴러류의 영화를 처음 봤는데, 그때의 충격이 10년이 넘은 지금도 아직 선명하게 기억에 남아 있습니다.',
      ],
      image: {
        src: './images/work-time-paradox.jpg',
        fallbackSrc: './images/work-time-paradox.svg',
        alt: '타임 패러독스 영화 포스터 또는 관련 사진',
      },
      video: {
        src: 'https://www.youtube.com/embed/fhG9WNQlyLs',
        title: '타임 패러독스 예고편',
      },
    },
    {
      category: '인생 책',
      title: '1984',
      summaryParagraphs: [
        '조지 오웰의 1984는 감시, 언어, 권력이라는 주제를 정말 차갑고 정교하게 밀어붙이는 작품입니다.',
        '읽는 내내 단순히 암울한 미래를 보는 느낌이 아니라, 사람이 무엇을 보고 믿고 말할 수 있는지까지 권력이 통제하려 들 때 어떤 일이 벌어지는지를 계속 생각하게 만들었습니다.',
        '특히 진실이 조작되고 언어의 의미가 흐려질수록 사람의 사고 자체도 흔들릴 수 있다는 점이 너무 인상 깊어서 오래 남는 책입니다.',
      ],
      image: {
        src: './images/work-book-photo.jpg',
        fallbackSrc: './images/work-book.svg',
        alt: '1984 책 표지 또는 관련 사진',
      },
    },
    {
      category: '인생 미드',
      title: '브레이킹 배드',
      summaryParagraphs: [
        '브레이킹 배드는 한 사람의 선택이 어떻게 점점 돌이킬 수 없는 방향으로 흘러가는지를 압도적인 밀도로 보여 주는 작품입니다.',
        '선과 악을 단순하게 나누지 않고, 상황과 욕망, 자존심이 겹치면서 인물이 변해 가는 과정을 끝까지 설득력 있게 끌고 가서 정말 강하게 남았습니다.',
        '긴장감 있는 전개와 연출도 훌륭하지만, 무엇보다 인물이 무너지고 변해 가는 과정이 너무 생생해서 인생 미드로 꼽게 됐습니다.',
      ],
      image: {
        src: './images/work-breaking-bad.jpg',
        fallbackSrc: './images/work-breaking-bad.svg',
        alt: '브레이킹 배드 포스터 또는 관련 사진',
      },
    },
  ],
  tilSeed: [
    {
      id: 'seed-1',
      date: '2026-03-15',
      title: 'HTML 시맨틱 태그 구조화',
      content:
        'header, nav, main, section, article, footer를 역할에 맞게 나누면 문서 구조가 또렷해지고 유지보수가 쉬워진다는 점을 배웠다.',
    },
    {
      id: 'seed-2',
      date: '2026-03-18',
      title: 'CSS Grid로 3열 갤러리 만들기',
      content:
        '반복되는 카드형 이미지는 Grid가 열과 간격을 한 번에 제어하기 쉬워서 9장처럼 규칙적인 배치에 특히 잘 맞는다는 점을 익혔다.',
    },
  ],
};
