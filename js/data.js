/* ============================================================
   PORTFOLIO DATA
   Вся фактическая информация хранится отдельно от разметки.
   Чтобы обновить портфолио — правьте только этот файл.
   ============================================================ */

const portfolio = {
  name: "Артём Бабанин",
  shortName: "Артём",
  logo: "AB",
  title: "Backend-разработчик, создатель Telegram-ботов и AI-решений",
  slogan: "Надёжные и современные решения, соблюдение сроков, эффективная коммуникация.",
  sirius: "Студент 1 курса IT-специалитета Университета «Сириус» по созданию и разработке сложных информационных систем.",
  heroLead: "Создаю надёжные backend-системы, Telegram-ботов, AI-инструменты и прикладные технологические решения — от идеи и архитектуры до рабочего продукта.",
  photo: "assets/myphoto.jpg",

  status: "OPEN TO TECHNOLOGY PROJECTS",

  nav: [
    { id: "home", label: "Главная" },
    { id: "about", label: "Обо мне" },
    { id: "stack", label: "Стек" },
    { id: "projects", label: "Проекты" },
    { id: "achievements", label: "Достижения" },
    { id: "workflow", label: "Как я работаю" },
    { id: "contact", label: "Контакты" },
  ],

  marquee: [
    "PYTHON", "AI", "TELEGRAM BOTS", "BACKEND", "FASTAPI", "OPENCV",
    "DATABASES", "COMPUTER VISION", "AUTOMATION", "C#", "UNITY",
  ],

  about: {
    index: "01",
    label: "Обо мне",
    heading: "Создаю системы, а не просто пишу код.",
    paragraphs: [
      "Python-программист с опытом более 5 лет. Люблю своё дело, постоянно учусь и совершенствуюсь.",
      "Специализируюсь на backend-разработке, создании Telegram-ботов, интеграции нейросетей и прикладных AI-решений.",
      "Мне интересно строить надёжные системы, автоматизировать процессы и превращать идеи в работающие технологические продукты.",
      "Сейчас я студент 1 курса IT-специалитета Научно-технологического университета «Сириус», где изучаю создание и разработку сложных информационных систем.",
    ],
    stats: [
      { value: "5+", unit: "лет", sub: "Python" },
      { value: "AI", unit: "& Backend", sub: "Computer Vision" },
    ],
  },

  education: {
    heading: "Образование",
    org: "Научно-технологический университет «Сириус»",
    status: "Студент 1 курса",
    track: "IT-специалитет: создание и разработка сложных информационных систем",
    mono: [
      ["SYSTEM_ID", "SIRIUS UNIVERSITY"],
      ["TYPE", "IT SPECIALIZATION"],
      ["YEAR", "01 / FIRST YEAR"],
      ["FOCUS", "INFORMATION SYSTEMS"],
    ],
  },

  stack: {
    index: "02",
    label: "Технологический стек",
    heading: "Инструменты, которыми я создаю продукты.",
    groups: [
      {
        name: "Основной стек",
        items: [
          { tech: "Python", domain: "Backend / AI", level: "ADVANCED", tags: ["Backend", "AI", "Telegram", "Computer Vision", "Automation"] },
          { tech: "Aiogram 3.x", domain: "Telegram Bots", level: "ADVANCED", tags: ["Telegram", "Async"] },
          { tech: "asyncio", domain: "Async Runtime", level: "ADVANCED", tags: ["Backend", "Automation"] },
          { tech: "FastAPI", domain: "Backend API", level: "ADVANCED", tags: ["Backend", "API"] },
          { tech: "Telegram Bot API", domain: "Integrations", level: "ADVANCED", tags: ["Telegram", "API"] },
          { tech: "OpenCV", domain: "Computer Vision", level: "ADVANCED", tags: ["Computer Vision", "AI"] },
          { tech: "MediaPipe", domain: "Pose Estimation", level: "ADVANCED", tags: ["Computer Vision", "AI"] },
        ],
      },
      {
        name: "Базы данных",
        items: [
          { tech: "SQLAlchemy", domain: "ORM", level: "ADVANCED", tags: ["Database", "Backend"] },
          { tech: "SQLite", domain: "Embedded DB", level: "ADVANCED", tags: ["Database"] },
          { tech: "aiosqlite", domain: "Async DB", level: "ADVANCED", tags: ["Database", "Async"] },
          { tech: "MySQL", domain: "RDBMS", level: "INTERMEDIATE", tags: ["Database"] },
        ],
      },
      {
        name: "AI и нейросети",
        items: [
          { tech: "YandexGPT / LLM", domain: "AI Integration", level: "ADVANCED", tags: ["AI", "Backend"] },
          { tech: "Промптинг и работа с нейросетями", domain: "Applied AI", level: "ADVANCED", tags: ["AI"] },
          { tech: "Machine Learning (ML)", domain: "ML", level: "INTERMEDIATE", tags: ["AI"] },
        ],
      },
      {
        name: "Парсинг данных",
        items: [
          { tech: "Requests / HTTP", domain: "Networking", level: "INTERMEDIATE", tags: ["Automation"] },
          { tech: "BeautifulSoup4", domain: "Parsing", level: "INTERMEDIATE", tags: ["Automation"] },
          { tech: "lxml", domain: "Parsing", level: "INTERMEDIATE", tags: ["Automation"] },
          { tech: "Selenium", domain: "Browser Automation", level: "INTERMEDIATE", tags: ["Automation"] },
        ],
      },
      {
        name: "Инструменты",
        items: [
          { tech: "Git", domain: "Version Control", level: "INTERMEDIATE", tags: ["Tooling"] },
          { tech: "Docker", domain: "Containerization", level: "BASIC", tags: ["Tooling", "Backend"] },
        ],
      },
      {
        name: "Игровая разработка",
        items: [
          { tech: "C# / Unity", domain: "GameDev", level: "INTERMEDIATE", tags: ["GameDev"] },
        ],
      },
    ],
  },

  projects: {
    index: "03",
    label: "Избранные проекты",
    heading: "Не просто проекты. Реальные системы.",
    items: [
      {
        id: "studymate",
        code: "PROJECT / 001",
        name: "StudyMate",
        subtitle: "образовательный Telegram-бот с ИИ",
        category: "AI / Education / Telegram",
        status: "COMPLETED",
        stackLine: "PYTHON + AI",
        description:
          "AI-бот-репетитор по школьным предметам на основе ФГОС. Система реализует замкнутый цикл обучения: тестирование → анализ ошибок → объяснение материала → индивидуальное домашнее задание с дедлайном.",
        tech: ["Aiogram", "asyncio", "YandexGPT", "SQLite", "JSON"],
        highlight: "замкнутый образовательный цикл",
        chain: ["ТЕСТ", "АНАЛИЗ ОШИБОК", "ОБЪЯСНЕНИЕ", "ИНДИВИДУАЛЬНАЯ ДОМАШКА", "ПОВТОРНОЕ ОБУЧЕНИЕ"],
        achievement: "Победитель регионального трека Международного конкурса «Большие вызовы 2025–2026»",
        direction: "Искусственный интеллект и большие данные",
        badge: "WINNER / BIG CHALLENGES 2025–26",
        visual: "ai",
      },
      {
        id: "cv-trainer",
        code: "PROJECT / 002",
        name: "Тренер по физической активности",
        subtitle: "с компьютерным зрением",
        category: "Computer Vision / AI / Social Tech",
        status: "COMPLETED",
        stackLine: "PYTHON + VISION",
        description:
          "Приложение на Python для анализа выполнения физических упражнений детьми. Использует камеру для распознавания поз и движений, после чего формирует персонализированные рекомендации и корректировки.",
        tech: ["Python", "OpenCV", "MediaPipe", "NumPy"],
        achievement: "Финалист конкурса «Большие вызовы 2023–2024»",
        direction: "Умный город",
        extraAward: "Лучший социальный проект",
        visual: "vision",
      },
      {
        id: "school-bot",
        code: "PROJECT / 003",
        name: "Бот для школы цифровых технологий",
        subtitle: "для учеников",
        category: "Telegram / Backend / Education",
        status: "COMPLETED",
        stackLine: "PYTHON + BACKEND",
        description:
          "Telegram-бот для учеников школы цифровых технологий.",
        features: [
          "личный дневник",
          "запись на занятия",
          "просмотр информации о преподавателях",
          "просмотр информации о направлениях обучения",
        ],
        tech: ["Aiogram", "SQLite", "Python"],
        visual: "telegram",
      },
    ],
    moreCta: "Больше проектов и экспериментов — в GitHub.",
    githubUrl: "https://github.com/last1r",
  },

  achievements: {
    index: "04",
    label: "Достижения",
    heading: "Результаты, которые можно измерить.",
    items: [
      {
        year: "2025–2026",
        title: "Победитель регионального трека Международного конкурса «Большие вызовы 2025–2026»",
        note: "Направление: «Искусственный интеллект и большие данные»",
        tag: "WINNER",
      },
      {
        year: "2023–2024",
        title: "Финалист регионального трека Международного конкурса «Большие вызовы 2023–2024»",
        note: "Награда: «Лучший социальный проект»",
        tag: "FINALIST",
      },
      {
        year: "CTF",
        title: "Победитель отборочного этапа соревнований VrnCTF по кибербезопасности",
        note: "Победа получена в составе команды",
        tag: "TEAM",
      },
      {
        year: "CODE",
        title: "1034 очка на CodeWars",
        note: "Участник профильного челленджа",
        tag: "KATA",
      },
      {
        year: "CERT",
        title: "Сертификат о прохождении курса Python PRO",
        note: "118 часов · академия Ruzna!",
        tag: "CERTIFIED",
      },
      {
        year: "REAL",
        title: "Опыт разработки коммерческих закрытых проектов",
        note: "Детали не раскрываются",
        tag: "PRODUCTION",
      },
    ],
  },

  workflow: {
    index: "05",
    label: "Как я работаю",
    heading: "От идеи до работающей системы.",
    steps: [
      { n: "01", en: "Understand", ru: "Анализ", text: "Разбираюсь в задаче, требованиях, ограничениях и сценарии использования." },
      { n: "02", en: "Design", ru: "Архитектура", text: "Определяю структуру системы, компоненты, API, базы данных, алгоритмы и интерфейсы." },
      { n: "03", en: "Build", ru: "Разработка", text: "Создаю рабочий прототип и проверяю ключевые гипотезы." },
      { n: "04", en: "Improve", ru: "Доработка", text: "Тестирую решение, исправляю проблемы и довожу систему до стабильного состояния." },
    ],
  },

  contact: {
    index: "06",
    label: "Контакты",
    heading: "Есть интересная задача?",
    sub: "Давайте обсудим.",
    text: "Открыт к новым технологическим проектам, совместной разработке, соревнованиям, стажировкам и профессиональному развитию.",
    email: "artembabanin14474@gmail.com",
    links: [
      { label: "GitHub", value: "github.com/last1r", url: "https://github.com/last1r", mono: "GH" },
      { label: "Telegram", value: "@last1r", url: "https://t.me/last1r", mono: "TG" },
      { label: "CodeWars", value: "codewars.com/users/last1r", url: "https://www.codewars.com/users/last1r", mono: "CW" },
      { label: "VK", value: "vk.com/id605896910", url: "https://vk.com/id605896910", mono: "VK" },
      { label: "Email", value: "artembabanin14474@gmail.com", url: "mailto:artembabanin14474@gmail.com", mono: "@@" },
    ],
  },

  footer: {
    copy: "© 2026 Артём Бабанин",
    line: "Backend · AI · Telegram · Systems",
    built: "Built with attention to detail.",
  },
};

// Публикуем данные для main.js (работает и по file:// без CORS-проблем ES-модулей)
window.PORTFOLIO = portfolio;
