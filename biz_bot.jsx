import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronDown, Mail, Phone, MessageSquare, Play, Calendar, BarChart3, Bot, FileText, Workflow, Brain, Users, Building2, Shield, Globe, PieChart, Cpu, Timer, Sparkles, Star, MapPin, ArrowRight, X, Menu } from "lucide-react";

/**
 * birqadam.kz — Hyper‑Animated Landing Page (RU/KZ)
 * Tech: React + Tailwind + Framer Motion + Lucide icons
 */

// Small helper components
const Container = ({ className = "", children }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ eyebrow, title, subtitle, align = "center" }) => (
  <div className={align === "center" ? "text-center" : "text-left"}>
    {eyebrow && (
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/15 via-fuchsia-500/15 to-emerald-500/15 px-4 py-1.5 text-xs font-semibold text-indigo-500 ring-1 ring-indigo-500/20">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </motion.div>
    )}
    <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mt-3 max-w-3xl text-base text-slate-600">
        {subtitle}
      </motion.p>
    )}
  </div>
);

const PrimaryButton = ({ className = "", children, ...props }) => (
  <button
    {...props}
    className={`group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 px-6 py-3 text-white shadow-lg shadow-fuchsia-500/20 ring-1 ring-white/10 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[.99] ${className}`}
  >
    {children}
  </button>
);

const GhostButton = ({ className = "", children, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-6 py-3 text-slate-800 backdrop-blur transition-all hover:bg-white ${className}`}
  >
    {children}
  </button>
);

// Floating animated blob background
const AnimatedBackdrop = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/30 via-fuchsia-500/30 to-emerald-500/30 blur-3xl"
        animate={{ y: [0, 30, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-160px] right-[-80px] h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-rose-500/25 via-orange-500/25 to-yellow-500/25 blur-3xl"
        animate={{ y: [0, -20, 10, 0], x: [0, 15, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// Accordion for FAQ
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left">
        <span className="text-sm font-semibold text-slate-900 sm:text-base">{q}</span>
        <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="mt-3 text-sm text-slate-600">{a}</p>
      </motion.div>
    </div>
  );
};

// Metric chip
const Metric = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/20 px-5 py-4 text-white backdrop-blur">
    <div className="text-xl font-bold sm:text-2xl">{value}</div>
    <div className="text-xs opacity-90">{label}</div>
  </div>
);

// Service Card
const ServiceCard = ({ icon, title, desc, bullets, perfectFor }) => (
  <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group grid h-full rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm transition hover:shadow-lg">
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm text-slate-600">{desc}</p>
    <ul className="mt-4 space-y-2 text-sm text-slate-700">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" /> <span>{b}</span></li>
      ))}
    </ul>
    <div className="mt-4 text-xs text-slate-500"><span className="font-semibold">Perfect For:</span> {perfectFor}</div>
  </motion.div>
);

// Pricing Card
const PricingCard = ({ name, price, popular, features, bestFor, cta = "Get Started" }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative flex h-full flex-col rounded-3xl border ${popular ? "border-fuchsia-400 bg-gradient-to-b from-white via-fuchsia-50 to-white shadow-lg" : "border-slate-200 bg-white"} p-6`}>
    {popular && (
      <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-fuchsia-600 to-rose-600 px-3 py-1 text-xs font-semibold text-white shadow">MOST POPULAR</div>
    )}
    <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
    <div className="mt-2 flex items-end gap-2">
      <div className="text-3xl font-bold text-slate-900">{price}</div>
      <div className="text-sm text-slate-500">/ month</div>
    </div>
    <ul className="mt-4 space-y-2 text-sm text-slate-700">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" /> <span>{f}</span></li>
      ))}
    </ul>
    <div className="mt-4 text-xs text-slate-500"><span className="font-semibold">Best for:</span> {bestFor}</div>
    <PrimaryButton className="mt-6 w-full" onClick={() => (window.location.href = "https://t.me/jyldambot")}>{cta}</PrimaryButton>
  </motion.div>
);

const PrivacyPolicy = ({ t, navigate }) => (
  <div className="py-20">
    <Container>
      <button onClick={() => navigate('/')} className="mb-8 inline-flex items-center gap-2 text-indigo-600 hover:underline">
        <ArrowRight className="h-4 w-4 rotate-180" /> На главную
      </button>
      <h1 className="text-3xl font-bold mb-8">{t.privacy.title}</h1>
      <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-700">
        {t.privacy.content}
      </div>
    </Container>
  </div>
);

const TermsOfService = ({ t, navigate }) => (
  <div className="py-20">
    <Container>
      <button onClick={() => navigate('/')} className="mb-8 inline-flex items-center gap-2 text-indigo-600 hover:underline">
        <ArrowRight className="h-4 w-4 rotate-180" /> На главную
      </button>
      <h1 className="text-3xl font-bold mb-8">{t.terms.title}</h1>
      <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-700">
        {t.terms.content}
      </div>
    </Container>
  </div>
);

const Divider = () => <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"/>;

const useParallaxTitle = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  return { y, opacity };
};

function BizBotLanding() {
  const [showVideo, setShowVideo] = useState(false);
  const heroMotion = useParallaxTitle();
  const [lang, setLang] = useState('ru');
  const [route, setRoute] = useState(window.location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  };

  // i18n dictionary — full RU/KZ content
  const i18n = {
    ru: {
      nav: { services: 'Услуги', about: 'О нас', projects: 'Проекты', cases: 'Кейсы', how: 'Как работаем', pricing: 'Цены', faq: 'FAQ', contact: 'Контакт' },
      brandTag: 'Автоматизация и разработка с ИИ',
      heroH: 'Перестаньте делать рутину. Пусть ИИ делает это за вас.',
      heroS: 'Мы создаём умные системы, которые автоматизируют процессы, делают мощные сайты и обслуживают клиентов 24/7. Ваша команда растёт — ИИ берёт остальное.',
      ctaPrimary: 'Бесплатный аудит',
      ctaSecondary: 'Смотреть демо',
      metrics: ['50+ проектов автоматизации', '−70% среднее снижение затрат', 'Запуск за 2 недели'],
      tiles: [
        { title: 'AI → бизнес', text: 'Документы, чат‑боты, отчёты, интеграции.' },
        { title: 'Чат‑боты KZ/RU', text: 'Поддержка и продажи 24/7.' },
        { title: 'Дашборды', text: 'Метрики в реальном времени.' },
        { title: 'Автопотоки', text: '100+ интеграций и согласований.' },
      ],
      servicesEyebrow: 'Полные ИИ‑решения для современного бизнеса',
      servicesTitle: 'От чат‑ботов до сложных платформ — технологии, которые работают, пока вы спите',
      services: [
        {
          title: 'Навсегда избавьтесь от ручного ввода данных',
          desc: 'ИИ читает, понимает и обрабатывает тысячи документов с точностью 99%+. Работает с PDF, сканами, Excel и изображениями.',
          bullets: [
            'Автовыделение данных из счетов и проверка',
            'Анализ договоров и ключевых условий',
            'Обработка форм любого формата',
            'Интеграции с 1C, Google Sheets и БД',
            'Пользовательские поля под ваш бизнес',
          ],
          perfectFor: 'Бухгалтерии, банки, логистика, гос. подряд',
        },
        {
          title: 'Отвечайте клиентам 24/7 на казахском и русском',
          desc: 'AI‑ассистент знает ваш бизнес и закрывает обращения круглосуточно. Снижайте расходы на поддержку на 70% и ускоряйте ответы.',
          bullets: [
            'Естественные диалоги (KZ, RU, EN)',
            'WhatsApp, Telegram, Instagram, сайт',
            'Обучение на ваших документах',
            'Заказы, брони, частые вопросы',
            'Передача оператору + аналитика',
          ],
          perfectFor: 'E‑commerce, услуги, рестораны, отели, образование',
        },
        {
          title: 'Преобразуйте данные в решения автоматически',
          desc: 'Перестаньте делать отчёты вручную. Красивые дашборды и отчёты по расписанию с трендами и прогнозами.',
          bullets: [
            'Ежедневные/еженедельные/ежемесячные отчёты',
            'Панели с метриками в реальном времени',
            'Предиктивная аналитика и прогнозы',
            'Запросы на естественном языке',
            'Excel/Sheets/БД + алерты',
          ],
          perfectFor: 'Ритейл, производство, финансы, агентства',
        },
        {
          title: 'Свяжите ваши сервисы и уберите рутинные задачи',
          desc: 'Кастомные AI‑воркфлоу перемещают данные, отправляют письма и обновляют системы — без ошибок.',
          bullets: [
            'Автописьма и фоллоу‑апы',
            'Синхронизация данных между платформами',
            'Согласования и уведомления',
            'Назначение задач и трекинг',
            '100+ бизнес‑интеграций',
          ],
          perfectFor: 'Любой бизнес с повторяющимися цифровыми процессами',
        },
        {
          title: 'Лиды с приоритетом и автопродажи',
          desc: 'ИИ оценивает лиды, шлёт персональные цепочки и сигналит, когда клиент готов покупать.',
          bullets: [
            'Автосбор лидов из разных источников',
            'AI‑скоринг и приоритизация',
            'Персональные письма и сообщения',
            'Автозапись на звонки/демо',
            'Интеграции с CRM и аналитика',
          ],
          perfectFor: 'B2B, недвижимость, SaaS, консалтинг',
        },
        {
          title: 'HR и рекрутинг на автопилоте',
          desc: 'Сократите время найма на 60%: скрининг резюме, слоты интервью и онбординг.',
          bullets: [
            'Скрининг и ранжирование кандидатов',
            'Автопланирование интервью',
            'Коммуникации с кандидатами',
            'Онбординг и задачи',
            'Данные сотрудников и перформанс',
          ],
          perfectFor: 'Растущие компании, агентства, HR‑отделы',
        },
      ],
      casesEyebrow: 'Доказанные результаты',
      casesTitle: 'Кейсы и истории успеха',
      cases: [
        {
          badge: 'E-commerce — Косметика Yoko-Sun',
          h: 'Продажи выросли на 180% за первые 3 месяца',
          bullets: ['Полноценный магазин с каталогом, корзиной', 'Удобный интерфейс', 'Интеграция с Kaspi.kz и платёжными системами', 'SEO-оптимизация и высокая скорость загрузки'],
          quote: 'Создали профессиональный интернет-магазин с удобной админ-панелью. Продажи выросли на 180% за первые 3 месяца после запуска.',
          who: 'Владелец Yoko-Sun',
        },
        {
          badge: 'AI-боты — WhatsApp/Telegram автоматизация',
          h: '85% запросов обрабатывает AI без участия человека',
          bullets: ['Бронирование, заказы, FAQ на казахском и русском', 'Интеграция с CRM и Google Sheets', 'Окупаемость за 2-3 месяца', 'Экономия на сотрудниках поддержки'],
          quote: 'Бот обрабатывает до 500 сообщений в день. Мы сэкономили на двух сотрудниках поддержки и улучшили время ответа до 5 секунд.',
          who: 'Ресторан "Достархан", Алматы',
        },
        {
          badge: 'Интеграция 1С — Автоматизация учёта',
          h: 'AI обработка документов + 1С интеграция',
          bullets: [
            'Загрузка данных в 1С:Бухгалтерию за секунды',
            'Полная автоматизация документооборота',
            'Автоматическая загрузка из Excel, CSV файлов',
            'Веб и мобильные отчёты в реальном времени',
            'Интеграция с eGov для электронной подписи через QR',
            'Автоматизация скриптов вместо ручного ввода'
          ],
          quote: 'Раньше обработка 100 счетов занимала весь день. Теперь — 30 минут. Бухгалтер занимается анализом, а не вводом данных.',
          who: 'Финансовый директор, ТОО "Логистика+"',
        },
        {
          badge: 'Веб-разработка — Лендинги и сайты',
          h: 'Конверсия 12-18% (выше среднего на 2-3x)',
          bullets: ['AI-генерация текстов на казахском и русском', 'Современный дизайн и мобильная адаптация', 'Интеграция форм с WhatsApp и Telegram', 'Создание за 48 часов'],
          quote: 'За 2 дня получили готовый лендинг с интеграцией Kaspi Pay. Лиды пошли в первый же день. Окупили вложения за неделю.',
          who: 'Стартап EdTech, Астана',
        },
        {
          badge: 'HoReCa — QR-меню для ресторанов',
          h: '+35% к среднему чеку благодаря upsell',
          bullets: ['Сканируй QR → просматривай меню → заказывай онлайн', 'Мультиязычность (KZ/RU/EN) с фото блюд', 'Простое обновление через админ-панель', 'Интерактивные цифровые меню'],
          quote: 'Клиенты любят QR-меню! Они видят фото, состав, калории. Официанты работают быстрее, а заказов стало больше.',
          who: 'Кафе "Тау", сеть из 5 точек',
        },
        {
          badge: 'Аналитика — Kaspi.kz Dashboard',
          h: '+40% прибыли за счёт динамического ценообразования',
          bullets: ['Отслеживание цен конкурентов в реальном времени', 'Прогноз спроса и оптимальные цены с помощью AI', 'Автоматические отчёты по продажам и остаткам', 'Интеллектуальная аналитика'],
          quote: 'Платформа показывает, когда конкуренты меняют цены. Мы реагируем мгновенно и всегда остаёмся в топе. Прибыль выросла на 40%.',
          who: 'Селлер электроники, Kaspi Top-50',
        },
        {
          badge: 'AI Контент — Генерация текстов/изображений',
          h: 'Экономия ₸500К/месяц на контент-менеджере',
          bullets: ['100 постов для соцсетей за 10 минут', 'Описания товаров, статьи, рекламные тексты', 'AI-изображения под ваш бренд через DALL-E/Midjourney', 'Автоматическая публикация'],
          quote: 'Раньше нанимали копирайтера и дизайнера. Теперь AI создаёт контент за минуты. Качество отличное, а стоимость в 10 раз меньше.',
          who: 'Маркетинговое агентство "Brand Up"',
        },
      ],
      howEyebrow: 'От идеи до запуска за 2–4 недели',
      howTitle: 'Как мы работаем',
      how: [
        { step: 1, title: 'Бесплатный аудит (1‑я неделя)', text: 'Анализ процессов, узких мест и ROI. Детальная карта автоматизации.' },
        { step: 2, title: 'Дизайн решения (2‑я неделя)', text: 'Схемы, источники данных, интеграции. Вы утверждаете перед разработкой.' },
        { step: 3, title: 'Разработка и интеграции (3–4 недели)', text: 'Строим, подключаем и обучаем ИИ на ваших данных. Вам без тех. хлопот.' },
        { step: 4, title: 'Запуск и оптимизация (постоянно)', text: 'Внедрение, обучение команды и ежемесячные отчёты по ROI.' },
      ],
      pricingEyebrow: 'Пакеты и индивидуальные сметы',
      pricingTitle: 'Прозрачно и под рост',
      pricing: {
        cards: [
          {
            name: 'Starter', price: '₸150,000', cta: '14 дней бесплатно', bestFor: 'Рестораны, салоны, малый ритейл, услуги', features: [
              '1 решение автоматизации (любой сервис)',
              'Базовый AI‑чатбот',
              'Email‑поддержка (≤24ч)',
              'Ежемесячные отчёты',
              'До 1 000 транзакций/мес',
            ]
          },
          {
            name: 'Business', price: '₸450,000', popular: true, cta: 'Перейти на Business', bestFor: 'E‑commerce, услуги, производство, агентства', features: [
              'До 5 решений автоматизации',
              'Продвинутый чатбот (кастом‑обучение)',
              'Приоритетная поддержка (≤4ч)',
              'Кастомные интеграции',
              'Еженедельная аналитика и оптимизация',
              'До 10 000 транзакций/мес',
              'API + аккаунт‑менеджер',
            ]
          },
          {
            name: 'Enterprise', price: 'Custom', cta: 'Запросить смету', bestFor: 'Банки, телеком, госсектор, крупный ритейл', features: [
              'Безлимитные решения автоматизации',
              'Enterprise‑ИИ и on‑prem',
              'Команда 24/7',
              'SLA 99,9% аптайма',
              'Аудиты безопасности и комплаенс',
              'Безлимит транзакций',
              'White‑label',
            ]
          }
        ]
      },
      addonsTitle: 'Дополнительные решения',
      addons: [
        { h: 'Сайт за 48 часов', p: 'AI‑контент (KZ/RU), адаптивный дизайн, SEO, домен, интеграции WhatsApp/Telegram/Kaspi.', price: '₸50,000 – ₸200,000', cta: 'Заказать сайт' },
        { h: 'Миграция данных', p: 'Извлечение, очистка и перенос из Excel/PDF/бумаги/БД. Контроль качества + обучение.', price: '₸80,000 – ₸300,000', cta: 'Перенести данные' },
        { h: 'Обучение кастомной модели', p: 'Обучим модели на ваших данных для максимальной точности и релевантности.', price: 'От ₸200,000', cta: 'Обучить модель' },
      ],
      techEyebrow: 'Enterprise‑уровень ИИ',
      techTitle: 'Технологии и локальные интеграции',
      toolsTitle: 'Глобальные инструменты',
      localTitle: 'Локальные интеграции',
      tools: [
        'GPT‑4 и Claude (NLP)', 'LangChain для сложных сценариев', 'Computer Vision для документов', 'Кастомные ML‑модели', 'Защита и шифрование', 'Хостинг в ДЦ РК'
      ],
      local: [
        'Платежи Kaspi.kz', '1C бухгалтерия', 'API Halyk Bank', '2GIS', 'WhatsApp Business API', 'Telegram Bot API'
      ],
      faqTitle: 'FAQ',
      faq: [
        { q: 'Сколько длится внедрение?', a: 'Обычно 2–4 недели; простой чатбот — до недели; сложные интеграции — 4–6 недель. Даём детальный таймлайн на консультации.' },
        { q: 'Поддерживаете казахский и русский?', a: 'Да. KZ и RU (и EN) с учётом локального контекста и сленга. Можно добавить другие языки.' },
        { q: 'Интегрируетесь с нашими системами?', a: 'Да: 1C, Bitrix24, Kaspi, Google Workspace и проприетарные системы.' },
        { q: 'Что если ИИ ошибётся?', a: 'Human‑in‑the‑loop, пороги уверенности и полный аудит действий.' },
        { q: 'Данные в безопасности?', a: 'Шифрование банковского уровня, соответствие законам РК, on‑prem опция, NDA и DPA.' },
        { q: 'Обучаете персонал?', a: 'Да, обучение и документация включены во все планы.' },
        { q: 'Когда окупится?', a: 'Обычно 3–6 месяцев; документы и поддержка окупаются быстрее.' },
        { q: 'Можно начать с малого?', a: 'Конечно. Стартуйте с одного решения и расширяйтесь.' },
      ],
      finalCTA: { h: 'Готовы автоматизировать бизнес?', s: 'Запишитесь на бесплатный аудит — посчитаем, сколько времени и денег вы сэкономите.', p: 'Бесплатный аудит', g: 'Смотреть примеры', chips: ['Без карты', '14 дней бесплатно', 'Гарантия возврата'] },
      footerTag: 'Автоматизация и разработка с ИИ в Казахстане',
      footerLinks: ['Услуги', 'Проекты', 'Как работаем', 'Цены', 'Технологии', 'Доп. решения', 'FAQ'],
      misc: { close: 'Закрыть', haveQuestions: 'Есть вопросы? Напишите нам в Telegram', openChat: 'Открыть чат' },
      privacy: {
        title: 'Политика конфиденциальности',
        content: `Настоящая Политика конфиденциальности описывает, как birqadam.kz собирает, использует и защищает вашу информацию.

1. Сбор информации
Мы собираем информацию, которую вы предоставляете напрямую нам через формы на сайте, включая ваше имя и номер телефона.

2. Использование информации
Мы используем вашу информацию исключительно для:
- Связи с вами по вашему запросу.
- Предоставления информации о наших услугах.
- Улучшения работы нашего сайта.

3. Защита данных
Мы принимаем технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или удаления.

4. Передача третьим лицам
Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Республики Казахстан.

5. Ваши права
Вы имеете право запросить доступ к вашим данным или их удаление, связавшись с нами по указанным контактам.`
      },
      terms: {
        title: 'Пользовательское соглашение',
        content: `Используя сайт birqadam.kz, вы соглашаетесь с условиями настоящего Соглашения.

1. Общие положения
Сайт предоставляет информацию об услугах ИП Calipso в области автоматизации и ИИ-решений.

2. Использование сайта
Вы обязуетесь использовать сайт только в законных целях и не предпринимать действий, которые могут нарушить его работу.

3. Интеллектуальная собственность
Весь контент на сайте является собственностью birqadam.kz или используется с разрешения правообладателей.

4. Ограничение ответственности
Мы прилагаем все усилия для обеспечения точности информации, но не гарантируем отсутствие ошибок. Мы не несем ответственности за любые прямые или косвенные убытки, возникшие в результате использования сайта.

5. Изменения условий
Мы оставляем за собой право изменять условия настоящего соглашения в любое время. Изменения вступают в силу с момента их публикации на сайте.`
      }
    },
    kk: {
      nav: { services: 'Қызметтер', about: 'Біз туралы', projects: 'Жобалар', cases: 'Кейстер', how: 'Қалай жұмыс істейміз', pricing: 'Баға', faq: 'FAQ', contact: 'Байланыс' },
      brandTag: 'AI арқылы автоматтандыру және әзірлеу',
      heroH: 'Қайталанатын жұмысты тоқтатыңыз. Мұның бәрін AI істесін.',
      heroS: 'Біз ақылды жүйелер құрамыз: процестерді автоматтандырады, күшті сайттар жасайды және клиенттерді тәулік бойы қолдайды. Командаңыз өссін, қалғанын AI атқарады.',
      ctaPrimary: 'Тегін аудит',
      ctaSecondary: 'Демо көру',
      metrics: ['50+ автоматтандыру жобасы', '70% шығынды қысқарту', 'Іске қосу — 2 апта'],
      tiles: [
        { title: 'AI → бизнес', text: 'Құжаттар, чат‑боттар, есептер, интеграциялар.' },
        { title: 'Чат‑боттар KZ/RU', text: '24/7 қолдау және сату.' },
        { title: 'Дашбордтар', text: 'Нақты уақыт метрикалары.' },
        { title: 'Автобарыстар', text: '100+ интеграция мен келісім.' },
      ],
      servicesEyebrow: 'Қазіргі бизнеске арналған толық AI шешімдері',
      servicesTitle: 'Чат‑боттан күрделі платформаларға дейін — сіз ұйықтағанда да жұмыс істейді',
      services: [
        {
          title: 'Қолмен дерек енгізуді біржола ұмытамыз',
          desc: 'AI мыңдаған құжатты 99%+ дәлдікпен оқып, өңдейді. PDF, скан, Excel және суреттермен жұмыс істейді.',
          bullets: [
            'Шот-фактурадан деректерді алу және тексеру',
            'Шарттарды талдау және негізгі тармақтарды табу',
            'Кез келген форматтағы формаларды өңдеу',
            '1C, Google Sheets және БД интеграциялары',
            'Сіздің бизнесіңізге бейімделген өрістер',
          ],
          perfectFor: 'Бухгалтерия, банктер, логистика, мемлекеттік мердігерлер',
        },
        {
          title: 'Клиенттерге 24/7 KZ/RU жауап беріңіз',
          desc: 'AI‑көмекші бизнесіңізді біледі және тәулік бойы өтінімдерді жабады. Қолдау шығынын 70% қысқартып, жауап беруді жеделдетіңіз.',
          bullets: [
            'Табиғи диалогтар (KZ, RU, EN)',
            'WhatsApp, Telegram, Instagram, сайт',
            'Құжаттарыңыз бойынша оқыту',
            'Тапсырыстар, брондау, ЖҚС',
            'Операторға беру + аналитика',
          ],
          perfectFor: 'E‑commerce, қызметтер, мейрамханалар, қонақ үйлер, білім',
        },
        {
          title: 'Деректерді автоматты түрде шешімге айналдырыңыз',
          desc: 'Қолмен есеп жасауды тоқтатыңыз. Трендтер мен болжамдары бар дашбордтар және жоспарлы есептер.',
          bullets: [
            'Күнделікті/апталық/айлық есептер',
            'Нақты уақыттағы метрикалар',
            'Болжамды аналитика',
            'Табиғи тілдегі сұраныстар',
            'Excel/Sheets/БД + ескертулер',
          ],
          perfectFor: 'Ритейл, өндіріс, қаржы, агенттіктер',
        },
        {
          title: 'Құралдарыңызды байланыстырып, рутинаны алыңыз',
          desc: 'AI‑воркфлоулар деректерді жылжытады, хат жібереді және жүйелерді жаңартады — қателіксіз.',
          bullets: [
            'Авто хаттар және фоллоу‑аптар',
            'Платформалар арасында дерек синхроны',
            'Келісімдер және хабарламалар',
            'Тапсырма беру және трекинг',
            '100+ бизнес интеграция',
          ],
          perfectFor: 'Қайталанатын цифрлық процестері бар кез келген бизнес',
        },
        {
          title: 'Лидтерді бағалау және автосату',
          desc: 'AI лидтерді бағалайды, жеке тізбектерді жібереді және клиент дайын болғанда ескертеді.',
          bullets: [
            'Көп көзден лид жинау',
            'AI‑скоринг және басымдық',
            'Жекеленген хат/хабарлама тізбектері',
            'Кездесуді авто жоспарлау',
            'CRM интеграциялары және аналитика',
          ],
          perfectFor: 'B2B, жылжымайтын мүлік, SaaS, консалтинг',
        },
        {
          title: 'HR және рекрутинг автоматтандыруы',
          desc: 'Резюмелерді скринингтеу, сұхбат уақытын қою және онбординг арқылы жалдау уақытын 60% қысқартыңыз.',
          bullets: [
            'Кандидаттарды скрининг және ранжирлеу',
            'Сұхбатты авто жоспарлау',
            'Кандидатпен коммуникациялар',
            'Онбординг және тапсырмалар',
            'Қызметкер деректері және өнімділік',
          ],
          perfectFor: 'Өсіп жатқан компаниялар, агенттіктер, HR бөлімдер',
        },
      ],
      casesEyebrow: 'Нәтижелер дәлелденген',
      casesTitle: 'Кейстер және табыс тарихтары',
      cases: [
        {
          badge: 'E-commerce — Косметика Yoko-Sun',
          h: 'Алғашқы 3 айда сату 180% артты',
          bullets: ['Каталог, себеті бар толық дүкен', 'Ыңғайлы интерфейс', 'Kaspi.kz және төлем жүйелерімен интеграция', 'SEO-оптимизация және жүктеу жылдамдығы'],
          quote: 'Кәсіби интернет-дүкен ыңғайлы әкімші панельмен жасалды. Іске қосудан кейінгі алғашқы 3 айда сату 180% өсті.',
          who: 'Yoko-Sun иесі',
        },
        {
          badge: 'AI-боттар — WhatsApp/Telegram автоматтандыру',
          h: '85% сұрауларды адам қатыспай AI өңдейді',
          bullets: ['KZ/RU брондау, тапсырыс, ЖҚС', 'CRM және Google Sheets интеграциясы', '2-3 айда өтеледі', 'Қолдау қызметкерлерінен үнемдеу'],
          quote: 'Бот күніне 500 хабарламаны өңдейді. Біз екі қолдау қызметкерінен үнемдедік және жауап беру уақытын 5 секундқа дейін қысқарттық.',
          who: '«Достархан» мейрамханасы, Алматы',
        },
        {
          badge: '1C интеграциясы — Есеп айырысу автоматтандыруы',
          h: 'Құжаттарды AI өңдеу + 1C интеграциясы',
          bullets: [
            '1C:Бухгалтерияға деректерді секундтар ішінде жүктеу',
            'GPT-4 Vision 99,5% дәлдікпен танылады',
            'Құжат айналымын толығымен автоматтандыру',
            'Excel, CSV файлдарынан автоматты жүктеу',
            'Веб және мобильді нақты уақыттағы есептер',
            'QR арқылы электронды қолтаңба үшін eGov интеграциясы',
            'Қолмен енгізудің орнына скрипттерді автоматтандыру'
          ],
          quote: 'Бұрын 100 есеп-шотты өңдеу бүкіл күнді алатын. Енді 30 минут. Бухгалтер деректерді емес, талдауды орындайды.',
          who: 'Қаржы директоры, «Логистика+» ЖШС',
        },
        {
          badge: 'Веб-әзірлеу — Лендингтер мен сайттар',
          h: '12-18% түрлендіру (2-3 есе орташа көрсеткіштен жоғары)',
          bullets: ['KZ/RU қазақша AI-контент генерациясы', 'Қазіргі заманғы дизайн мен мобильді бейімдеу', 'WhatsApp пен Telegram формаларымен интеграция', '48 сағатта жасау'],
          quote: '2 күн ішінде Kaspi Pay интеграциясы бар дайын лендинг алдық. Лидтер бірінші күні ғана келді. Шығындар аптасына өтелді.',
          who: 'EdTech стартапы, Астана',
        },
        {
          badge: 'HoReCa — Mейрамхана QR-мәзірі',
          h: 'Орташа чекті 35% арттыру',
          bullets: ['QR сканерлеу → мәзірді қарау → онлайн тапсырыс', 'KZ/RU/EN тілдеріндегі фотолы тағамдар', 'Әкімші панель арқылы оңай жаңарту', 'Интерактивті цифрлық мәзірлер'],
          quote: 'Тұтынушылар QR-мәзірді ұнатады! Олар фото, құрамын, калориясын көреді. Күйішілер жылдамырақ жұмыс істейді, ал тапсырыстар көбейді.',
          who: '«Тау» дәмханасы, 5 нүктелі желі',
        },
        {
          badge: 'Аналитика — Kaspi.kz Dashboard',
          h: 'Динамикалық баға қою арқылы пайда 40% артты',
          bullets: ['Қарсылас бағаларын нақты уақытта бақылау', 'Сұранысты және оңтайлы бағаларды AI арқылы болжау', 'Сату мен қалдықтар бойынша автоматты есептер', 'Интеллектуалды аналитика'],
          quote: 'Платформа қарсылас бағаларын өзгерткенін көрсетеді. Біз бірден әрекет етеміз және әрқашан топта қаламыз. Пайда 40% өсті.',
          who: 'Электроника сатушысы, Kaspi Top-50',
        },
        {
          badge: 'AI Контент — Мәтін/кескін генерациясы',
          h: 'Контент-менеджерден айына ₸500К үнемдеу',
          bullets: ['Әлеуметтік желілерге 10 минут ішінде 100 жазба', 'Тауар сипаттамалары, мақалалар, жарнама мәтіндері', 'DALL-E/Midjourney арқылы брендіңізге сәйкес AI-кескіндер', 'Автоматты жариялау'],
          quote: 'Бұрын көшірмеші мен дизайнер жалдайтын. Енді AI контентті минуттар ішінде жасайды. Сапасы тамаша, ал құны 10 есе аз.',
          who: '«Brand Up» маркетинг агенттігі',
        },
      ],
      howEyebrow: 'Идеядан іске қосуға дейін 2–4 апта',
      howTitle: 'Қалай жұмыс істейміз',
      how: [
        { step: 1, title: 'Тегін аудит (1‑апта)', text: 'Процестерді, тар орындарды және ROI есептейміз. Автоматтандыру картасы.' },
        { step: 2, title: 'Шешім дизайны (2‑апта)', text: 'Жұмыс ағындары, дерек көздері, интеграциялар. Даму алдында мақұлдайсыз.' },
        { step: 3, title: 'Даму және интеграция (3–4 апта)', text: 'Құрастырамыз, қосамыз және AI‑ды деректеріңізде оқытамыз.' },
        { step: 4, title: 'Іске қосу және оңтайландыру', text: 'Енгіземіз, командаңызды оқытамыз, ай сайын ROI туралы есеп.' },
      ],
      pricingEyebrow: 'Пакеттер және жеке смета',
      pricingTitle: 'Мөлдір баға және өсуге сай',
      pricing: {
        cards: [
          {
            name: 'Starter', price: '₸150,000', cta: '14 күн тегін', bestFor: 'Мейрамхана, салон, шағын ритейл, қызметтер', features: [
              '1 автоматтандыру шешімі', 'Негізгі AI чатбот', 'Email қолдау (≤24сағ)', 'Ай сайынғы есептер', 'Айына 1 000 транзакцияға дейін']
          },
          {
            name: 'Business', price: '₸450,000', popular: true, cta: 'Business‑ке өту', bestFor: 'E‑commerce, қызметтер, өндіріс, агенттіктер', features: [
              '5‑ке дейін шешім', 'Дамыған чатбот (кастом оқыту)', 'Приоритет қолдау (≤4сағ)', 'Кастом интеграциялар', 'Апталық аналитика', 'Айына 10 000 транзакция', 'API + аккаунт‑менеджер']
          },
          {
            name: 'Enterprise', price: 'Custom', cta: 'Смета сұрау', bestFor: 'Банктер, телеком, мемлекеттік, ірі ритейл', features: [
              'Шексіз шешімдер', 'Enterprise AI және on‑prem', '24/7 команда', 'SLA 99,9%', 'Қауіпсіздік аудиттері', 'Шексіз транзакциялар', 'White‑label']
          }
        ]
      },
      addonsTitle: 'Қосымша шешімдер',
      addons: [
        { h: '48 сағатта сайт', p: 'AI‑контент (KZ/RU), адаптив, SEO, домен, WhatsApp/Telegram/Kaspi.', price: '₸50,000 – ₸200,000', cta: 'Сайтқа тапсырыс' },
        { h: 'Дерек көшіру', p: 'Excel/PDF/қағаз/БД деректерін шығарып, тазалап, көшіреміз. QA + оқыту.', price: '₸80,000 – ₸300,000', cta: 'Деректі көшіру' },
        { h: 'Кастом модель оқыту', p: 'Салалық деректеріңізде оқыту — дәлдік пен релеванттық.', price: '₸200,000‑ден', cta: 'Модельді оқыту' },
      ],
      techEyebrow: 'Enterprise деңгейі',
      techTitle: 'Технология және жергілікті интеграциялар',
      toolsTitle: 'Ғаламдық құралдар',
      localTitle: 'Жергілікті интеграциялар',
      tools: [
        'GPT‑4 және Claude (NLP)', 'LangChain', 'Құжаттарға CV', 'Кастом ML', 'Қорғау және шифрлау', 'ҚР деректер орталығы'
      ],
      local: [
        'Kaspi.kz төлемдері', '1C бухгалтерия', 'Halyk Bank API', '2GIS', 'WhatsApp Business API', 'Telegram Bot API'
      ],
      faqTitle: 'FAQ',
      faq: [
        { q: 'Енгізу қанша уақыт?', a: 'Әдетте 2–4 апта; қарапайым чатбот — 1 аптаға дейін; күрделі интеграциялар — 4–6 апта.' },
        { q: 'Қазақша/орысша қолдайсыз ба?', a: 'Иә, KZ және RU (және EN) — жергілікті контекстпен. Қосымша тілдер мүмкін.' },
        { q: 'Біздің жүйелермен интеграция?', a: 'Иә: 1C, Bitrix24, Kaspi, Google Workspace және проприетарлық жүйелер.' },
        { q: 'AI қателессе?', a: 'Human‑in‑the‑loop, сенімділік шектері, толық аудит.' },
        { q: 'Деректер қауіпсіз бе?', a: 'Банк деңгейіндегі шифрлау, ҚР заңдарына сай, on‑prem опциясы, NDA/DPA.' },
        { q: 'Қызметкерлерді оқытасыз ба?', a: 'Иә, барлық жоспарға оқыту және құжаттама кіреді.' },
        { q: 'ROI қашан?', a: 'Көбіне 3–6 ай; құжаттар мен қолдау тезірек өтеледі.' },
        { q: 'Кішіден бастауға бола ма?', a: 'Әрине. Бір шешімнен бастап, кеңейтіңіз.' },
      ],
      finalCTA: { h: 'Бизнесіңізді автоматтандыруға дайынсыз ба?', s: 'Тегін аудитке жазылыңыз — нақты уақыт пен шығын үнемін есептейміз.', p: 'Тегін аудит', g: 'Мысалдарды көру', chips: ['Карта қажет емес', '14 күн тегін', 'Қайтарым кепілдігі'] },
      footerTag: 'Қазақстандағы AI автоматтандыру және әзірлеу',
      footerLinks: ['Қызметтер', 'Жобалар', 'Қалай жұмыс істейміз', 'Баға', 'Технологиялар', 'Қос. шешімдер', 'FAQ'],
      misc: { close: 'Жабу', haveQuestions: 'Сұрақ бар ма? Telegram‑ға жазыңыз', openChat: 'Чатты ашу' },
      privacy: {
        title: 'Құпиялылық саясаты',
        content: `Бұл Құпиялылық саясаты birqadam.kz сіздің ақпаратыңызды қалай жинайтынын, пайдаланатынын және қорғайтынын сипаттайды.

1. Ақпаратты жинау
Біз сіз сайттағы формалар арқылы тікелей беретін ақпаратты, соның ішінде атыңыз бен телефон нөміріңізді жинаймыз.

2. Ақпаратты пайдалану
Біз сіздің ақпаратыңызды тек мына мақсаттарда пайдаланамыз:
- Сіздің сұранысыңыз бойынша сізбен байланысу.
- Біздің қызметтеріміз туралы ақпарат беру.
- Сайтымыздың жұмысын жақсарту.

3. Деректерді қорғау
Біз сіздің жеке деректеріңізді рұқсатсыз кіруден, өзгертуден немесе жоюдан қорғау үшін техникалық және ұйымдастырушылық шараларды қолданамыз.

4. Үшінші тұлғаларға беру
Біз сіздің жеке деректеріңізді үшінші тұлғаларға сатпаймыз және бермейміз, Қазақстан Республикасының заңнамасында көзделген жағдайларды қоспағанда.

5. Сіздің құқықтарыңыз
Сіз көрсетілген контактілер арқылы бізге хабарласып, деректеріңізге кіруді немесе оларды жоюды талап етуге құқылысыз.`
      },
      terms: {
        title: 'Пайдаланушы келісімі',
        content: `birqadam.kz сайтын пайдалану арқылы сіз осы Келісімнің шарттарымен келісесіз.

1. Жалпы ережелер
Сайт «ИП Calipso» автоматтандыру және AI шешімдері саласындағы қызметтері туралы ақпарат береді.

2. Сайтты пайдалану
Сіз сайтты тек заңды мақсаттарда пайдалануға және оның жұмысын бұзуы мүмкін әрекеттерді жасамауға міндеттенесіз.

3. Зияткерлік меншік
Сайттағы барлық мазмұн birqadam.kz меншігі болып табылады немесе құқық иелерінің рұқсатымен пайдаланылады.

4. Жауапкершілікті шектеу
Біз ақпараттың дәлдігін қамтамасыз ету үшін бар күшімізді саламыз, бірақ қателердің болмауына кепілдік бермейміз. Біз сайтты пайдалану нәтижесінде туындаған кез келген тікелей немесе жанама шығындар үшін жауап бермейміз.

5. Шарттарды өзгерту
Біз осы келісімнің шарттарын кез келген уақытта өзгертуге құқылымыз. Өзгерістер сайтта жарияланған сәттен бастап күшіне енеді.`
      }
    }
  };

  const t = i18n[lang];

  // --- DEV SMOKE TESTS (run in dev only) ---
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.assert(['ru', 'kk'].includes(lang), 'lang should be ru|kk');
      console.assert(Boolean(t.heroH && t.heroS), 'i18n: hero keys must exist');
      console.assert(Array.isArray(t.metrics) && t.metrics.length === 3, 'i18n: metrics has 3 items');
    }
  }, [lang, t]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <Container>
          <div className="flex items-center justify-between py-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 flex-shrink-0">
              <motion.div initial={{ rotate: -10, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 120 }} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow">
                <Bot className="h-5 w-5" />
              </motion.div>
              <span className="font-bold tracking-tight text-slate-900">birqadam.kz</span>
            </button>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-indigo-600 transition-colors">{t.nav.services}</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-indigo-600 transition-colors">{t.nav.about}</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-indigo-600 transition-colors">{t.nav.projects}</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('how')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-indigo-600 transition-colors">{t.nav.how}</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-indigo-600 transition-colors">{t.nav.pricing}</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-indigo-600 transition-colors">{t.nav.faq}</button>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={() => setLang(lang === 'ru' ? 'kk' : 'ru')} 
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                {lang === 'ru' ? 'KZ' : 'RU'}
              </button>
              
              <PrimaryButton 
                onClick={() => (window.location.href = "https://t.me/jyldambot")}
                className="hidden sm:inline-flex py-2 px-4 text-sm"
              >
                {t.ctaPrimary}
              </PrimaryButton>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-white border-t border-slate-100 shadow-xl"
        >
          <Container className="py-6 flex flex-col gap-4">
            <button onClick={() => { navigate('/'); setIsMenuOpen(false); setTimeout(() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left py-2 text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors border-b border-slate-50">{t.nav.services}</button>
            <button onClick={() => { navigate('/'); setIsMenuOpen(false); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left py-2 text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors border-b border-slate-50">{t.nav.about}</button>
            <button onClick={() => { navigate('/'); setIsMenuOpen(false); setTimeout(() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left py-2 text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors border-b border-slate-50">{t.nav.projects}</button>
            <button onClick={() => { navigate('/'); setIsMenuOpen(false); setTimeout(() => document.getElementById('how')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left py-2 text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors border-b border-slate-50">{t.nav.how}</button>
            <button onClick={() => { navigate('/'); setIsMenuOpen(false); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left py-2 text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors border-b border-slate-50">{t.nav.pricing}</button>
            <button onClick={() => { navigate('/'); setIsMenuOpen(false); setTimeout(() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left py-2 text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors border-b border-slate-50">{t.nav.faq}</button>
            
            <div className="pt-2 flex flex-col gap-3">
              <PrimaryButton onClick={() => (window.location.href = "https://t.me/jyldambot")} className="w-full">
                {t.ctaPrimary} <Calendar className="h-4 w-4 ml-2"/>
              </PrimaryButton>
              <GhostButton onClick={() => (window.location.href = "https://t.me/jyldambot")} className="w-full">
                {t.nav.contact} <ArrowRight className="h-4 w-4 ml-2"/>
              </GhostButton>
            </div>
          </Container>
        </motion.div>
      </header>

      {route === '/privacy' ? (
        <PrivacyPolicy t={t} navigate={navigate} />
      ) : route === '/terms' ? (
        <TermsOfService t={t} navigate={navigate} />
      ) : (
        <>
          {/* HERO */}
          <section id="top" className="relative overflow-hidden pb-24 pt-20 sm:pt-28">
        <AnimatedBackdrop />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.h1 style={heroMotion} className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                {t.heroH}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
                {t.heroS}
              </motion.p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PrimaryButton onClick={() => (window.location.href = "https://t.me/jyldambot")}>{t.ctaPrimary}</PrimaryButton>
                <GhostButton onClick={() => setShowVideo(true)}>
                  <Play className="h-4 w-4"/> {t.ctaSecondary}
                </GhostButton>
              </div>
              {/* Metrics chips (localized) */}
              <div className="mt-10 grid grid-cols-3 gap-3 text-center sm:max-w-md">
                {t.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/20 px-4 py-3 text-white backdrop-blur">
                    <div className="text-sm font-bold sm:text-base">{m}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.08),transparent_40%)]"/>
                <div className="grid gap-4 sm:grid-cols-2">
                  {t.tiles.map((c, i) => (
                    <div key={i} className="rounded-2xl border border-slate-200 p-4">
                      <div className="mb-2 inline-flex items-center gap-2 text-slate-700">
                        <span className="rounded-lg bg-slate-100 p-2">
                          {React.createElement([FileText, Bot, BarChart3, Workflow][i % 4], { className: 'h-5 w-5' })}
                        </span>
                        <span className="font-semibold">{c.title}</span>
                      </div>
                      <p className="text-sm text-slate-600">{c.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs text-slate-500">
                  <Shield className="h-4 w-4"/> {lang==='ru'?'Шифрование уровня банка • Хостинг в ДЦ РК':'Банк деңгейіндегі шифрлау • ҚР ДЦ‑да хостинг'}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
        {/* Floating CTA dock */}
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="pointer-events-auto fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-xl backdrop-blur">
            <MessageSquare className="h-4 w-4 text-fuchsia-600"/>
            <span className="hidden text-sm text-slate-700 sm:block">{t.misc.haveQuestions}</span>
            <PrimaryButton className="px-4 py-2" onClick={() => (window.location.href = 'https://t.me/jyldambot')}>{t.misc.openChat}</PrimaryButton>
          </div>
        </motion.div>
      </section>

      {/* Watch video modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm" onClick={() => setShowVideo(false)}><X className="h-4 w-4"/>{t.misc.close}</button>
            <div className="aspect-video w-full bg-slate-100">
              <iframe className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="How birqadam.kz Works" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}

      <Divider />

      {/* ABOUT US */}
      <section id="about">
        <Container>
          <SectionTitle title="О компании" eyebrow="birqadam.kz" />
          
          <div className="mt-10 grid gap-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Краткая юридическая информация</h3>
                <p className="text-slate-600">ИП Calipso<br/>Местонахождение: Республика Казахстан, г. Алматы</p>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-600">birqadam.kz — это технологическая компания, специализирующаяся на автоматизации бизнес-процессов и разработке интеллектуальных цифровых решений с использованием искусственного интеллекта.</p>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-600">Мы помогаем компаниям отказаться от рутинных операций, повысить эффективность и сократить издержки за счёт внедрения умных систем: от чат-ботов и обработки документов до аналитических дашбордов, интеграций и сложных AI-платформ. Пока ваша команда занимается развитием бизнеса, технологии работают 24/7.</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Чем мы занимаемся</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> автоматизация документооборота и обработки данных;</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> AI-чат-боты для поддержки и продаж (KZ / RU);</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> разработка сайтов и веб-платформ;</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> аналитика и дашборды в реальном времени;</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> кастомные AI-воркфлоу и интеграции с бизнес-системами (1C, CRM, базы данных, мессенджеры, платёжные сервисы).</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Наш подход</h3>
                <p className="text-slate-600">Мы сопровождаем клиента на всех этапах: от анализа процессов и проектирования решения до внедрения, обучения команды и дальнейшей оптимизации. Все решения разрабатываются под конкретные задачи бизнеса и масштабируются по мере роста.</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Надёжность и безопасность</h3>
                <p className="text-slate-600">Мы применяем современные методы защиты данных, шифрование уровня корпоративных стандартов и используем хостинг в дата-центрах на территории Республики Казахстан.</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Для кого мы работаем</h3>
                <p className="text-slate-600">Наши решения подходят для малого, среднего и крупного бизнеса, включая e-commerce, HoReCa, финансы, логистику, образование, B2B-сервисы и корпоративные проекты.</p>
              </div>
              
              <div className="text-center pt-6 border-t border-slate-200">
                <p className="text-lg font-semibold text-slate-800">birqadam.kz — автоматизация и разработка с ИИ в Казахстане.</p>
                <p className="mt-2 text-slate-600">От идеи до запуска — за 2–4 недели.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* PROJECTS */}
      <section id="projects">
        <Container>
          <SectionTitle title="Реализованные проекты" />
          
          <div className="mt-10 grid gap-8">
            {/* Project 1 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200 flex items-center justify-center">
                  <span className="text-lg font-bold">🛒</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">E-commerce платформа — Yoko-Sun</h3>
                  <a href="https://yoko-sun.kz" className="text-indigo-600 hover:underline mt-1 inline-block">https://yoko-sun.kz</a>
                  <p className="mt-3 text-slate-600">Полноценный интернет-магазин с каталогом, корзиной и высокой скоростью загрузки. Проект ориентирован на рост конверсии и удобство управления контентом.</p>
                  <h4 className="mt-4 font-semibold text-slate-800">Что реализовано:</h4>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> современный адаптивный интерфейс</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> SEO-оптимизация</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> интеграции с платёжными сервисами</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> удобная административная панель</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200 flex items-center justify-center">
                  <span className="text-lg font-bold">📚</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">Онлайн-журнал с приёмом статей — Kunaev University</h3>
                  <a href="https://bulletin-law.vuzkunaeva.kz/" className="text-indigo-600 hover:underline mt-1 inline-block">https://bulletin-law.vuzkunaeva.kz/</a>
                  <p className="mt-3 text-slate-600">Цифровая платформа для научного журнала, принимающая статьи онлайн и полностью автоматизирующая редакционный процесс.</p>
                  <h4 className="mt-4 font-semibold text-slate-800">Функциональность:</h4>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> онлайн-приём статей</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> модерация и рецензирование</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> управление выпусками журнала</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> публикация материалов в электронных изданиях</li>
                  </ul>
                  <p className="mt-3 text-slate-600">Клиент: Kunaev University</p>
                </div>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200 flex items-center justify-center">
                  <span className="text-lg font-bold">💬</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">WhatsApp-бот с ИИ для университета</h3>
                  <a href="https://wa.me/77012335888" target="_blank" className="text-indigo-600 hover:underline mt-1 inline-block">WhatsApp-бот →</a>
                  <p className="mt-3 text-slate-600">Интеллектуальный бот поддержки для студентов, преподавателей и гостей университета.</p>
                  <h4 className="mt-4 font-semibold text-slate-800">Возможности:</h4>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> ответы на вопросы об университете 24/7</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> AI-обработка запросов</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> разгрузка колл-центра и администрации</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> единый канал коммуникации</li>
                  </ul>
                  <p className="mt-3 text-slate-600">Клиент: Kunaev University</p>
                </div>
              </div>
            </div>
            
            {/* Project 4 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200 flex items-center justify-center">
                  <span className="text-lg font-bold">🌱</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">Платформа благотворительных пожертвований — Mukhatay Ormany</h3>
                  <a href="https://mukhatayormany.kz/" className="text-indigo-600 hover:underline mt-1 inline-block">https://mukhatayormany.kz/</a>
                  <p className="mt-3 text-slate-600">Онлайн-платформа для пожертвований на посадку деревьев с удобной административной панелью.</p>
                  <h4 className="mt-4 font-semibold text-slate-800">Реализовано:</h4>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> управление контентом сайта</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> защищённая платёжная интеграция с Ioko</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> прозрачный и удобный пользовательский путь</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> админ-панель для управления проектом</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Project 5 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200 flex items-center justify-center">
                  <span className="text-lg font-bold">📸</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">RSS / AI-бот для Instagram → сайт</h3>
                  <p className="mt-3 text-slate-600">Автоматизация новостей университета</p>
                  <p className="mt-2 text-slate-600">Система автоматически:</p>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> получает новые посты из Instagram</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> публикует их в разделе «Новости» сайта</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> улучшает текст с помощью ИИ</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> переводит контент на RU / KZ / EN</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> прикрепляет медиафайлы</li>
                  </ul>
                  <p className="mt-3 text-slate-600">Идеально для образовательных и медиа-платформ.</p>
                </div>
              </div>
            </div>
            
            {/* Project 6 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200 flex items-center justify-center">
                  <span className="text-lg font-bold">🏛</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">Цифровая платформа обращений граждан</h3>
                  <p className="mt-3 text-slate-600">Для депутатов Жетысуской области</p>
                  <p className="mt-2 text-slate-600">Инновационная платформа, соединяющая граждан и закреплённых за ними депутатов.</p>
                  <h4 className="mt-4 font-semibold text-slate-800">Ключевые возможности:</h4>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> управление обращениями граждан</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> AI-категоризация и приоритизация</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> обмен сообщениями в реальном времени</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> аналитические дашборды и отчёты</li>
                  </ul>
                  <p className="mt-3 text-slate-600">Клиент: Депутаты Жетысуского региона</p>
                </div>
              </div>
            </div>
            
            {/* Project 7 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-slate-200 flex items-center justify-center">
                  <span className="text-lg font-bold">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">AI-бот для генерации контента (Telegram)</h3>
                  <p className="mt-3 text-slate-600">Контент-ассистент с ИИ</p>
                  <p className="mt-2 text-slate-600">Telegram-бот для генерации текстов и идей с использованием:</p>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> Gemini API</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> ChatGPT API</li>
                  </ul>
                  <p className="mt-3 text-slate-600">Подходит для маркетинга, SMM и контент-команд:</p>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> посты для соцсетей</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> описания товаров</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-indigo-600" /> статьи и рекламные тексты</li>
                  </ul>
                </div>
              </div>
            </div>
            

          </div>
        </Container>
      </section>

      <Divider />

      {/* SERVICES */}
      <section id="services">
        <Container>
          <SectionTitle eyebrow={t.servicesEyebrow} title={t.servicesTitle} />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.services.map((s, idx) => (
              <ServiceCard
                key={idx}
                icon={React.createElement([FileText, Bot, BarChart3, Workflow, Brain, Users][idx % 6], { className: 'h-6 w-6 text-indigo-600' })}
                title={s.title}
                desc={s.desc}
                bullets={s.bullets}
                perfectFor={s.perfectFor}
              />
            ))}
          </div>
        </Container>
      </section>

      <Divider />

      {/* HOW IT WORKS */}
      <section id="how">
        <Container>
          <SectionTitle eyebrow={t.howEyebrow} title={t.howTitle} />
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {t.how.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl border border-slate-200 bg-white p-6">
                <div className="absolute -top-3 left-6 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">Step {s.step}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Divider />

      {/* PRICING */}
      <section id="pricing">
        <Container>
          <SectionTitle eyebrow={t.pricingEyebrow} title={t.pricingTitle} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.pricing.cards.map((p, i) => (
              <PricingCard
                key={i}
                name={p.name}
                price={p.price}
                popular={p.popular}
                features={p.features}
                bestFor={p.bestFor}
                cta={p.cta}
              />
            ))}
          </div>
        </Container>
      </section>

      <Divider />

      {/* ADDITIONAL SOLUTIONS */}
      <section id="add-ons">
        <Container>
          <SectionTitle title={t.addonsTitle} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {t.addons.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold">{a.h}</h3>
                <p className="mt-2 text-sm text-slate-600">{a.p}</p>
                <div className="mt-3 text-sm font-semibold">{a.price}</div>
                <PrimaryButton className="mt-4">{a.cta}</PrimaryButton>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Divider />

      {/* TECH STACK */}
      <section id="tech">
        <Container>
          <SectionTitle eyebrow={t.techEyebrow} title={t.techTitle} />
          <div className="mt-10">
            <h3 className="text-lg font-semibold">{t.toolsTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.tools.map((tool, i) => (
                <div key={i} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm">{tool}</div>
              ))}
            </div>
            <h3 className="mt-6 text-lg font-semibold">{t.localTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.local.map((tool, i) => (
                <div key={i} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm">{tool}</div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* FAQ */}
      <section id="faq">
        <Container>
          <SectionTitle title={t.faqTitle} />
          <div className="mt-10 grid gap-4">
            {t.faq.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Container>
      </section>

      <Divider />

      {/* FINAL CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.finalCTA.h}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-100">{t.finalCTA.s}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryButton onClick={() => (window.location.href = "https://t.me/jyldambot")}>{t.finalCTA.p}</PrimaryButton>
              <GhostButton className="bg-white/10 text-white ring-white/20 hover:bg-white/20" onClick={() => (window.location.href = "https://t.me/jyldambot")}>{t.finalCTA.g}</GhostButton>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {t.finalCTA.chips.map((chip, i) => (
                <div key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs">{chip}</div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      </>
      )}

      {/* FOOTER */}
      <footer className="py-12">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/')} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">
                  <Bot className="h-5 w-5" />
                </button>
                <span className="font-bold">birqadam.kz</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{t.footerTag}</p>
              <div className="mt-4 flex flex-col gap-2">
                <button onClick={() => navigate('/privacy')} className="text-left text-xs text-slate-500 hover:text-indigo-600">{t.privacy.title}</button>
                <button onClick={() => navigate('/terms')} className="text-left text-xs text-slate-500 hover:text-indigo-600">{t.terms.title}</button>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left text-sm text-slate-600 hover:text-slate-900">{t.footerLinks[0]}</button>
                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left text-sm text-slate-600 hover:text-slate-900">{t.footerLinks[1]}</button>
                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('how')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left text-sm text-slate-600 hover:text-slate-900">{t.footerLinks[2]}</button>
                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left text-sm text-slate-600 hover:text-slate-900">{t.footerLinks[3]}</button>
                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('tech')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left text-sm text-slate-600 hover:text-slate-900">{t.footerLinks[4]}</button>
                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('add-ons')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left text-sm text-slate-600 hover:text-slate-900">{t.footerLinks[5]}</button>
                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-left text-sm text-slate-600 hover:text-slate-900">{t.footerLinks[6]}</button>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} birqadam.kz. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default BizBotLanding;
