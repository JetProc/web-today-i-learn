export const pageContent = {
  site: {
    brandName: '파라디',
    footerText: '© 2026 Paradi Archive. Today I learned, today I kept.',
  },
  profile: {
    nickname: '파라디',
    tagline: '새로운 곳을 향해 나아가는 개발자',
    image: {
      src: './images/profile-mint.svg',
      alt: '노트북과 메모장을 앞에 두고 미소 짓는 프로필 일러스트',
    },
  },
  intro: {
    paragraphs: ['안녕하세요.'],
    linksPrefix: '더 자세한 기록은 ',
    links: [{ label: 'GitHub', href: 'https://github.com/jetproc' }],
    linksSuffix: '에서 천천히 쌓아 갈 예정입니다.',
  },
  infoTable: [
    { label: '이름', value: '파라디' },
    { label: 'MBTI', value: 'INFJ' },
    { label: '취미', value: '음악, 개발, 운동, 독서' },
    { label: '좋아하는 음식', value: '치킨' },
    { label: '좋아하는 디저트', value: '에그타르트' },
    { label: '요즘 관심사', value: '원정대..원정대...' },
  ],
  gallery: {
    subtitle: '지금의 나를 설명하는 아홉 가지 장면을 사각 프레임 안에 담았습니다.',
    items: [
      {
        caption: '좋아하는 음식',
        image: {
          src: './images/gallery-food.svg',
          alt: '치킨',
        },
      },
      {
        caption: '취미',
        image: {
          src: './images/gallery-hobby.svg',
          alt: '카메라와 메모장이 놓인 취미 장면 일러스트',
        },
      },
      {
        caption: '이상형의 분위기',
        image: {
          src: './images/gallery-ideal.svg',
          alt: '차분한 조명 아래 책을 읽는 사람의 분위기를 담은 일러스트',
        },
      },
      {
        caption: '좋아하는 디저트',
        image: {
          src: './images/gallery-dessert.svg',
          alt: '에그타르트',
        },
      },
      {
        caption: '닮은 캐릭터',
        image: {
          src: './images/gallery-character.svg',
          alt: '포근한 표정의 작은 숲 캐릭터를 표현한 일러스트',
        },
      },
      {
        caption: '기억에 남는 여행지',
        image: {
          src: './images/gallery-travel.svg',
          alt: '노을이 비치는 골목길과 여행 가방을 담은 일러스트',
        },
      },
      {
        caption: '좋아하는 동물',
        image: {
          src: './images/gallery-animal.svg',
          alt: '둥글게 웅크린 고양이를 표현한 일러스트',
        },
      },
      {
        caption: '좋아하는 계절',
        image: {
          src: './images/gallery-season.svg',
          alt: '잔잔한 바람과 햇빛이 비치는 가을 풍경 일러스트',
        },
      },
      {
        caption: '좋아하는 색깔',
        image: {
          src: './images/gallery-color.svg',
          alt: '세이지 그린 소품들이 놓인 색감 보드 일러스트',
        },
      },
    ],
  },
  works: [
    {
      category: '인생 영화',
      title: '월터의 상상은 현실이 된다',
      summary:
        '머릿속으로만 상상하던 장면을 결국 현실로 옮기는 용기가 인상 깊었습니다. 무언가를 완벽하게 준비한 뒤 시작하기보다, 작게라도 먼저 움직여야 길이 열린다는 점을 오래 기억하게 만든 작품입니다.',
      image: {
        src: './images/work-mitty.svg',
        alt: '여행 가방과 카메라로 영화 분위기를 표현한 포스터 일러스트',
      },
      video: {
        src: 'https://www.youtube.com/embed/FEAAmn016_c',
        title: '월터의 상상은 현실이 된다 예고편',
      },
    },
    {
      category: '인생 책',
      title: '1984',
      summary:
        '세상을 바라보는 관점을 조금만 바꿔도 얼마나 다정한 문장이 나올 수 있는지 알려 준 책입니다. 사람을 성급하게 판단하지 않고, 더 섬세하게 관찰하는 태도를 배우게 해 준 작품입니다.',
      image: {
        src: './images/work-book.svg',
        alt: '책 더미와 메모 카드로 책의 분위기를 표현한 포스터 일러스트',
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
