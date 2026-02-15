import { useState, useEffect, useRef, useCallback } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: 1, category: 'haircuts', name: 'Женская стрижка', price: 4500, duration: 60, description: 'Консультация, мытьё, стрижка, укладка', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop' },
  { id: 2, category: 'haircuts', name: 'Мужская стрижка', price: 2500, duration: 45, description: 'Стрижка, оформление контура, укладка', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop' },
  { id: 3, category: 'haircuts', name: 'Детская стрижка', price: 1800, duration: 30, description: 'Стрижка для детей до 12 лет', image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400&h=300&fit=crop' },
  { id: 4, category: 'coloring', name: 'Окрашивание в один тон', price: 6500, duration: 120, description: 'Профессиональное окрашивание premium-красителями', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop' },
  { id: 5, category: 'coloring', name: 'Балаяж / Airtouch', price: 12000, duration: 180, description: 'Современные техники окрашивания с плавным переходом', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop' },
  { id: 6, category: 'coloring', name: 'Мелирование', price: 8000, duration: 150, description: 'Классическое или калифорнийское мелирование', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop' },
  { id: 7, category: 'nails', name: 'Маникюр с покрытием', price: 3200, duration: 90, description: 'Аппаратный маникюр + гель-лак', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop' },
  { id: 8, category: 'nails', name: 'Педикюр с покрытием', price: 3800, duration: 90, description: 'Аппаратный педикюр + гель-лак', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop' },
  { id: 9, category: 'nails', name: 'Наращивание ногтей', price: 5500, duration: 150, description: 'Наращивание гелем с дизайном', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop' },
  { id: 10, category: 'care', name: 'Уход за волосами Olaplex', price: 5000, duration: 60, description: 'Восстановление структуры волос системой Olaplex', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop' },
  { id: 11, category: 'care', name: 'Кератиновое выпрямление', price: 9000, duration: 180, description: 'Выпрямление и восстановление волос кератином', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop' },
  { id: 12, category: 'care', name: 'Ботокс для волос', price: 6000, duration: 90, description: 'Глубокое восстановление и питание', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop' },
  { id: 13, category: 'makeup', name: 'Дневной макияж', price: 3500, duration: 60, description: 'Лёгкий натуральный макияж на каждый день', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=300&fit=crop' },
  { id: 14, category: 'makeup', name: 'Вечерний макияж', price: 5000, duration: 90, description: 'Яркий макияж для особого случая', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop' },
  { id: 15, category: 'makeup', name: 'Свадебный макияж', price: 8000, duration: 120, description: 'Стойкий макияж + репетиция', image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=300&fit=crop' },
  { id: 16, category: 'brows', name: 'Коррекция бровей', price: 1500, duration: 30, description: 'Архитектура и коррекция формы бровей', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop' },
  { id: 17, category: 'brows', name: 'Ламинирование бровей', price: 2800, duration: 45, description: 'Укладка и ламинирование с окрашиванием', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop' },
  { id: 18, category: 'brows', name: 'Наращивание ресниц', price: 4000, duration: 120, description: 'Классическое или объёмное наращивание', image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&h=300&fit=crop' },
];

const CATEGORIES = [
  { id: 'all', name: 'Все услуги', icon: '✦' },
  { id: 'haircuts', name: 'Стрижки', icon: '✂' },
  { id: 'coloring', name: 'Окрашивание', icon: '🎨' },
  { id: 'nails', name: 'Маникюр/Педикюр', icon: '💅' },
  { id: 'care', name: 'Уходовые процедуры', icon: '🧴' },
  { id: 'makeup', name: 'Макияж', icon: '💄' },
  { id: 'brows', name: 'Брови и ресницы', icon: '👁' },
];

const MASTERS = [
  { id: 1, name: 'Анна Морозова', role: 'Топ-стилист', experience: 12, rating: 4.9, reviews: 234, specialization: ['haircuts', 'coloring'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', bio: 'Призёр международных конкурсов. Специализируется на сложных техниках окрашивания.' },
  { id: 2, name: 'Мария Белова', role: 'Стилист-колорист', experience: 8, rating: 4.8, reviews: 189, specialization: ['coloring', 'care'], image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', bio: 'Эксперт по балаяжу и airtouch. Постоянный участник обучающих семинаров.' },
  { id: 3, name: 'Елена Козлова', role: 'Мастер маникюра', experience: 6, rating: 4.9, reviews: 312, specialization: ['nails'], image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face', bio: 'Создаёт уникальные дизайны. Работает с ведущими брендами покрытий.' },
  { id: 4, name: 'Дарья Волкова', role: 'Визажист', experience: 10, rating: 4.7, reviews: 156, specialization: ['makeup', 'brows'], image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face', bio: 'Работала на Fashion Week. Мастер свадебного и вечернего макияжа.' },
  { id: 5, name: 'Ксения Павлова', role: 'Бровист-лэшмейкер', experience: 5, rating: 4.8, reviews: 198, specialization: ['brows'], image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face', bio: 'Сертифицированный мастер по ламинированию и наращиванию.' },
  { id: 6, name: 'Алексей Соколов', role: 'Барбер', experience: 7, rating: 4.9, reviews: 267, specialization: ['haircuts'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', bio: 'Мастер мужских стрижек и оформления бороды. Работает в стиле old school и modern.' },
];

const REVIEWS = [
  { id: 1, name: 'Ольга К.', rating: 5, text: 'Невероятный салон! Анна сделала мне идеальный балаяж. Атмосфера просто волшебная, буду приходить только сюда.', date: '2 дня назад', masterId: 1 },
  { id: 2, name: 'Марина С.', rating: 5, text: 'Лучший маникюр в городе! Елена — настоящий художник. Дизайн держится 3 недели без сколов.', date: '5 дней назад', masterId: 3 },
  { id: 3, name: 'Ирина В.', rating: 5, text: 'Делала свадебный макияж у Дарьи — все гости были в восторге! Макияж продержался весь день.', date: '1 неделю назад', masterId: 4 },
  { id: 4, name: 'Татьяна Л.', rating: 4, text: 'Отличный сервис, приятная обстановка. Стрижка получилась именно такой, как я хотела.', date: '2 недели назад', masterId: 1 },
  { id: 5, name: 'Наталья П.', rating: 5, text: 'Кератиновое выпрямление — это просто магия! Волосы как шёлк уже третий месяц.', date: '3 недели назад', masterId: 2 },
  { id: 6, name: 'Александр М.', rating: 5, text: 'Алексей — лучший барбер! Стрижка и оформление бороды на высшем уровне.', date: '1 неделю назад', masterId: 6 },
];

const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop', category: 'haircuts', alt: 'Стрижка' },
  { id: 2, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop', category: 'coloring', alt: 'Окрашивание' },
  { id: 3, src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop', category: 'nails', alt: 'Маникюр' },
  { id: 4, src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=700&fit=crop', category: 'makeup', alt: 'Макияж' },
  { id: 5, src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=500&fit=crop', category: 'coloring', alt: 'Балаяж' },
  { id: 6, src: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=800&fit=crop', category: 'nails', alt: 'Нейл-арт' },
  { id: 7, src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop', category: 'makeup', alt: 'Вечерний макияж' },
  { id: 8, src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=500&fit=crop', category: 'coloring', alt: 'Airtouch' },
  { id: 9, src: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=700&fit=crop', category: 'care', alt: 'Уход за волосами' },
  { id: 10, src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop', category: 'brows', alt: 'Брови' },
  { id: 11, src: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=600&fit=crop', category: 'brows', alt: 'Ресницы' },
  { id: 12, src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=800&fit=crop', category: 'haircuts', alt: 'Мужская стрижка' },
];

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

// ─── ICONS (inline SVGs) ────────────────────────────────────────────────────

function IconSun() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}

function IconMoon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
}

function IconMenu() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}

function IconX() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}

function IconStar({ filled }) {
  return filled
    ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#c9a96e" stroke="#c9a96e" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}

function IconClock() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}

function IconCheck() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}

function IconChevronLeft() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}

function IconChevronRight() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
}

function IconMapPin() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}

function IconPhone() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}

function IconMail() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}

function IconInstagram() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
}

function IconTelegram() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
}

function IconWhatsApp() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}

// ─── SCROLL ANIMATION HOOK ───────────────────────────────────────────────────

function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return [ref, isVisible];
}

function AnimatedSection({ children, className = '', animation = 'animate-fade-in-up', delay = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} ${isVisible ? `${animation} ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

// ─── RATING STARS ────────────────────────────────────────────────────────────

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= Math.round(rating)} />)}
    </div>
  );
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function Navbar({ dark, setDark, currentSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Главная' },
    { id: 'services', label: 'Услуги' },
    { id: 'team', label: 'Мастера' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'booking', label: 'Запись' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? (dark ? 'bg-dark-bg/90 backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-lg shadow-lg') : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button onClick={() => handleNav('home')} className="flex items-center gap-2 group">
            <span className={`font-serif text-xl sm:text-2xl font-bold tracking-wide transition-colors ${dark ? 'text-cream' : (scrolled ? 'text-charcoal' : 'text-white')}`}>
              Belle <span className="text-gold">Beauté</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <button key={l.id} onClick={() => handleNav(l.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-gold relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${currentSection === l.id ? 'text-gold after:w-full' : `after:w-0 hover:after:w-full ${dark ? 'text-cream/80' : (scrolled ? 'text-charcoal/80' : 'text-white/90')}`}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => setDark(!dark)}
              className={`p-2 rounded-full transition-all duration-300 ${dark ? 'text-gold hover:bg-gold/10' : (scrolled ? 'text-charcoal hover:bg-charcoal/5' : 'text-white hover:bg-white/10')}`}>
              {dark ? <IconSun /> : <IconMoon />}
            </button>
            <button onClick={() => handleNav('booking')}
              className="bg-gold hover:bg-gold-dark text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
              Записаться
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => setDark(!dark)}
              className={`p-2 rounded-full ${dark ? 'text-gold' : (scrolled ? 'text-charcoal' : 'text-white')}`}>
              {dark ? <IconSun /> : <IconMoon />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 ${dark ? 'text-cream' : (scrolled ? 'text-charcoal' : 'text-white')}`}>
              {mobileOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`px-4 pb-4 space-y-1 ${dark ? 'bg-dark-bg/95 backdrop-blur-lg' : 'bg-white/95 backdrop-blur-lg'}`}>
          {links.map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentSection === l.id ? 'bg-gold/10 text-gold' : (dark ? 'text-cream/80 hover:bg-white/5' : 'text-charcoal/80 hover:bg-charcoal/5')}`}>
              {l.label}
            </button>
          ))}
          <button onClick={() => handleNav('booking')}
            className="w-full bg-gold hover:bg-gold-dark text-white px-5 py-3 rounded-lg text-sm font-medium mt-2 transition-all">
            Записаться онлайн
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

function Hero({ onNavigate }) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop" alt="Салон красоты" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <p className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4">Premium Beauty Experience</p>
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in-up animate-delay-200">
          Belle <span className="text-gold italic">Beauté</span>
        </h1>
        <div className="animate-fade-in-up animate-delay-300">
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Пространство, где искусство встречается с красотой. Доверьте свой образ профессионалам премиум-класса.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
          <button onClick={() => onNavigate('booking')}
            className="bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 animate-pulse-gold">
            Записаться онлайн
          </button>
          <button onClick={() => onNavigate('services')}
            className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-white/10">
            Наши услуги
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────

function About({ dark }) {
  return (
    <section className={`py-20 sm:py-28 ${dark ? 'bg-dark-bg' : 'bg-cream'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection animation="animate-slide-left">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">О нас</p>
            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${dark ? 'text-cream' : 'text-charcoal'}`}>
              Философия <span className="text-gold italic">красоты</span>
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className={`text-base sm:text-lg leading-relaxed mb-4 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>
              Belle Beauté — это не просто салон красоты. Это пространство, где каждая деталь продумана для вашего комфорта и преображения. Мы верим, что красота — это искусство, а каждый клиент — наш шедевр.
            </p>
            <p className={`text-base sm:text-lg leading-relaxed mb-8 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>
              Наши мастера — признанные эксперты с международным опытом. Мы используем только премиальную косметику и следим за мировыми трендами.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[{ num: '12+', label: 'Лет опыта' }, { num: '15K+', label: 'Довольных клиентов' }, { num: '6', label: 'Топ-мастеров' }].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-gold">{stat.num}</div>
                  <div className={`text-sm mt-1 ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection animation="animate-slide-right" className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop" alt="Салон" className="w-full h-[400px] sm:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className={`absolute -bottom-6 -left-6 ${dark ? 'bg-dark-card' : 'bg-white'} p-6 rounded-xl shadow-xl hidden sm:block`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-gold text-xl">★</span>
                </div>
                <div>
                  <div className={`font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>4.9 из 5</div>
                  <div className={`text-sm ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>1200+ отзывов</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ────────────────────────────────────────────────────────

function ServicesSection({ dark, selectedServices, toggleService, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? SERVICES : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className={`py-20 sm:py-28 ${dark ? 'bg-dark-card' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Каталог</p>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>
            Наши <span className="text-gold italic">услуги</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id ? 'bg-gold text-white shadow-lg shadow-gold/20' : (dark ? 'bg-dark-bg text-cream/70 hover:bg-dark-border' : 'bg-cream text-charcoal/70 hover:bg-cream-dark')}`}>
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, i) => {
            const isSelected = selectedServices.some(s => s.id === service.id);
            return (
              <AnimatedSection key={service.id} delay={`animate-delay-${(i % 3 + 1) * 100}`}>
                <div className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${dark ? 'bg-dark-bg border border-dark-border' : 'bg-white border border-gray-100 shadow-sm'} ${isSelected ? 'ring-2 ring-gold' : ''}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${dark ? 'bg-dark-bg/80 text-cream' : 'bg-white/90 text-charcoal'}`}>
                        {CATEGORIES.find(c => c.id === service.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className={`font-serif text-lg font-semibold mb-2 ${dark ? 'text-cream' : 'text-charcoal'}`}>{service.name}</h3>
                    <p className={`text-sm mb-4 ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gold font-bold text-lg">{service.price.toLocaleString()} ₽</span>
                        <span className={`flex items-center gap-1 text-xs mt-1 ${dark ? 'text-cream/50' : 'text-charcoal/50'}`}>
                          <IconClock /> {service.duration} мин
                        </span>
                      </div>
                      <button onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isSelected ? 'bg-gold text-white' : 'border border-gold text-gold hover:bg-gold hover:text-white'}`}>
                        {isSelected ? '✓ Выбрано' : 'Выбрать'}
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {selectedServices.length > 0 && (
          <AnimatedSection className="mt-10 text-center">
            <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl ${dark ? 'bg-dark-bg border border-dark-border' : 'bg-cream'}`}>
              <span className={dark ? 'text-cream/80' : 'text-charcoal/80'}>
                Выбрано услуг: <strong className="text-gold">{selectedServices.length}</strong> | Итого: <strong className="text-gold">{selectedServices.reduce((s, sv) => s + sv.price, 0).toLocaleString()} ₽</strong>
              </span>
              <button onClick={() => onNavigate('booking')}
                className="bg-gold hover:bg-gold-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg">
                Записаться
              </button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// ─── TEAM SECTION ────────────────────────────────────────────────────────────

function TeamSection({ dark, onBookMaster }) {
  const [selectedMaster, setSelectedMaster] = useState(null);

  return (
    <section id="team" className={`py-20 sm:py-28 ${dark ? 'bg-dark-bg' : 'bg-cream'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Команда</p>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>
            Наши <span className="text-gold italic">мастера</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MASTERS.map((master, i) => (
            <AnimatedSection key={master.id} delay={`animate-delay-${(i % 3 + 1) * 100}`}>
              <div className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'}`}>
                <div className="relative h-64 overflow-hidden">
                  <img src={master.image} alt={master.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-serif text-xl font-semibold">{master.name}</h3>
                    <p className="text-white/80 text-sm">{master.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Stars rating={master.rating} />
                      <span className={`text-sm ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>{master.rating} ({master.reviews})</span>
                    </div>
                    <span className={`text-sm ${dark ? 'text-cream/50' : 'text-charcoal/50'}`}>Опыт {master.experience} лет</span>
                  </div>
                  <p className={`text-sm mb-4 ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>{master.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {master.specialization.map(spec => (
                      <span key={spec} className={`px-2.5 py-1 rounded-full text-xs ${dark ? 'bg-dark-bg text-cream/70' : 'bg-cream text-charcoal/70'}`}>
                        {CATEGORIES.find(c => c.id === spec)?.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedMaster(selectedMaster?.id === master.id ? null : master)}
                      className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${dark ? 'border border-dark-border text-cream/80 hover:bg-dark-border' : 'border border-gray-200 text-charcoal/80 hover:bg-gray-50'}`}>
                      Портфолио
                    </button>
                    <button onClick={() => onBookMaster(master)}
                      className="flex-1 bg-gold hover:bg-gold-dark text-white py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg">
                      Записаться
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {selectedMaster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedMaster(null)}>
            <div className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6 animate-scale-in ${dark ? 'bg-dark-card' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-serif text-2xl font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>{selectedMaster.name}</h3>
                <button onClick={() => setSelectedMaster(null)} className={`p-2 rounded-full ${dark ? 'hover:bg-dark-border text-cream' : 'hover:bg-gray-100 text-charcoal'}`}><IconX /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GALLERY_IMAGES.filter(img => selectedMaster.specialization.includes(img.category)).slice(0, 6).map(img => (
                  <div key={img.id} className="rounded-lg overflow-hidden">
                    <img src={img.src} alt={img.alt} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <h4 className={`font-serif text-lg font-semibold ${dark ? 'text-cream' : 'text-charcoal'}`}>Отзывы</h4>
                {REVIEWS.filter(r => r.masterId === selectedMaster.id).map(review => (
                  <div key={review.id} className={`p-4 rounded-xl ${dark ? 'bg-dark-bg' : 'bg-cream'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Stars rating={review.rating} />
                      <span className={`text-sm font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{review.name}</span>
                      <span className={`text-xs ${dark ? 'text-cream/40' : 'text-charcoal/40'}`}>{review.date}</span>
                    </div>
                    <p className={`text-sm ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── REVIEWS CAROUSEL ────────────────────────────────────────────────────────

function ReviewsSection({ dark }) {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % REVIEWS.length), 5000);
    return () => clearInterval(timer);
  }, [auto]);

  return (
    <section className={`py-20 sm:py-28 ${dark ? 'bg-dark-card' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Отзывы</p>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>
            Что говорят <span className="text-gold italic">клиенты</span>
          </h2>
        </AnimatedSection>

        <div className="relative" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
          <div className={`p-8 sm:p-12 rounded-2xl text-center transition-all duration-500 ${dark ? 'bg-dark-bg border border-dark-border' : 'bg-cream'}`}>
            <div className="flex justify-center"><Stars rating={REVIEWS[current].rating} /></div>
            <p className={`font-serif text-lg sm:text-xl italic my-6 leading-relaxed ${dark ? 'text-cream/90' : 'text-charcoal/90'}`}>
              &laquo;{REVIEWS[current].text}&raquo;
            </p>
            <div>
              <p className={`font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{REVIEWS[current].name}</p>
              <p className={`text-sm ${dark ? 'text-cream/50' : 'text-charcoal/50'}`}>{REVIEWS[current].date}</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <button onClick={() => { setCurrent(c => (c - 1 + REVIEWS.length) % REVIEWS.length); setAuto(false); }}
              className={`p-2 rounded-full transition-all ${dark ? 'hover:bg-dark-border text-cream/60' : 'hover:bg-cream text-charcoal/60'}`}>
              <IconChevronLeft />
            </button>
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); setAuto(false); }}
                className={`h-2.5 rounded-full transition-all ${i === current ? 'bg-gold w-8' : `w-2.5 ${dark ? 'bg-dark-border' : 'bg-gray-300'}`}`} />
            ))}
            <button onClick={() => { setCurrent(c => (c + 1) % REVIEWS.length); setAuto(false); }}
              className={`p-2 rounded-full transition-all ${dark ? 'hover:bg-dark-border text-cream/60' : 'hover:bg-cream text-charcoal/60'}`}>
              <IconChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY SECTION ─────────────────────────────────────────────────────────

function GallerySection({ dark }) {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [beforeAfter, setBeforeAfter] = useState(50);
  const sliderRef = useRef(null);

  const filtered = filter === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === filter);

  const handleSliderMove = useCallback((e) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setBeforeAfter((x / rect.width) * 100);
  }, []);

  return (
    <section id="gallery" className={`py-20 sm:py-28 ${dark ? 'bg-dark-bg' : 'bg-cream'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Портфолио</p>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>
            Галерея <span className="text-gold italic">работ</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="max-w-2xl mx-auto mb-12">
          <h3 className={`font-serif text-xl font-semibold text-center mb-4 ${dark ? 'text-cream' : 'text-charcoal'}`}>До / После</h3>
          <div ref={sliderRef} className="ba-slider relative rounded-2xl overflow-hidden h-80 select-none"
            onMouseMove={(e) => { if (e.buttons === 1) handleSliderMove(e); }}
            onTouchMove={handleSliderMove}
            onMouseDown={handleSliderMove}>
            <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=700&h=400&fit=crop" alt="До" className="w-full h-full object-cover" />
            <div className="ba-after" style={{ width: `${beforeAfter}%` }}>
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&h=400&fit=crop" alt="После" className="h-full object-cover" style={{ width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '700px' }} />
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${beforeAfter}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-charcoal text-sm font-bold">&#x27F7;</span>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">До</div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">После</div>
          </div>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[{ id: 'all', name: 'Все' }, ...CATEGORIES.filter(c => c.id !== 'all')].map(cat => (
            <button key={cat.id} onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat.id ? 'bg-gold text-white' : (dark ? 'bg-dark-card text-cream/70 hover:bg-dark-border' : 'bg-white text-charcoal/70 hover:bg-cream-dark')}`}>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="masonry">
          {filtered.map((img, i) => (
            <AnimatedSection key={img.id} className="masonry-item" delay={`animate-delay-${(i % 3 + 1) * 100}`}>
              <div className="group relative rounded-xl overflow-hidden cursor-pointer" onClick={() => setLightbox(img)}>
                <img src={img.src} alt={img.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Открыть</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 text-white/80 hover:text-white p-2" onClick={() => setLightbox(null)}><IconX /></button>
            <img src={lightbox.src} alt={lightbox.alt} className="max-w-full max-h-[85vh] object-contain rounded-lg animate-scale-in" onClick={e => e.stopPropagation()} />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── BOOKING SECTION ─────────────────────────────────────────────────────────

function BookingSection({ dark, selectedServices, toggleService, preselectedMaster }) {
  const [step, setStep] = useState(1);
  const [selectedMaster, setSelectedMaster] = useState(preselectedMaster);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', comment: '' });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (preselectedMaster) {
      setSelectedMaster(preselectedMaster);
      if (selectedServices.length > 0) setStep(3);
      else setStep(1);
    }
  }, [preselectedMaster, selectedServices.length]);

  const today = new Date();
  const calendarDays = [];
  for (let i = 0; i < 21; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    calendarDays.push(d);
  }

  const availableSlots = TIME_SLOTS.filter((_, i) => {
    if (!selectedDate) return false;
    const seed = selectedDate.getDate() * 7 + i;
    return seed % 3 !== 0;
  });

  const totalPrice = selectedServices.reduce((s, sv) => s + sv.price, 0);
  const totalDuration = selectedServices.reduce((s, sv) => s + sv.duration, 0);

  const filteredMasters = MASTERS.filter(m =>
    selectedServices.length === 0 || selectedServices.some(s => m.specialization.includes(s.category))
  );

  if (confirmed) {
    return (
      <section id="booking" className={`py-20 sm:py-28 ${dark ? 'bg-dark-card' : 'bg-white'}`}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="animate-scale-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className={`font-serif text-3xl font-bold mb-4 ${dark ? 'text-cream' : 'text-charcoal'}`}>Вы записаны!</h2>
            <p className={`text-lg mb-6 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>
              Ждём вас <strong className="text-gold">{selectedDate?.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</strong> в <strong className="text-gold">{selectedTime}</strong>
            </p>
            <div className={`p-6 rounded-2xl text-left space-y-3 ${dark ? 'bg-dark-bg border border-dark-border' : 'bg-cream'}`}>
              <div className="flex justify-between"><span className={dark ? 'text-cream/60' : 'text-charcoal/60'}>Услуги:</span><span className={`font-medium text-right ${dark ? 'text-cream' : 'text-charcoal'}`}>{selectedServices.map(s => s.name).join(', ')}</span></div>
              <div className="flex justify-between"><span className={dark ? 'text-cream/60' : 'text-charcoal/60'}>Мастер:</span><span className={`font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{selectedMaster?.name}</span></div>
              <div className="flex justify-between"><span className={dark ? 'text-cream/60' : 'text-charcoal/60'}>Длительность:</span><span className={`font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{totalDuration} мин</span></div>
              <div className={`h-px ${dark ? 'bg-dark-border' : 'bg-cream-dark'} my-2`} />
              <div className="flex justify-between"><span className={`font-semibold ${dark ? 'text-cream' : 'text-charcoal'}`}>Итого:</span><span className="font-bold text-gold text-lg">{totalPrice.toLocaleString()} ₽</span></div>
            </div>
            <button onClick={() => { setConfirmed(false); setStep(1); }} className="mt-6 text-gold hover:text-gold-dark font-medium transition-colors">Новая запись</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className={`py-20 sm:py-28 ${dark ? 'bg-dark-card' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Запись</p>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>
            Онлайн-<span className="text-gold italic">запись</span>
          </h2>
        </AnimatedSection>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 sm:gap-2 mb-10">
          {['Услуги', 'Мастер', 'Дата', 'Данные'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-gold text-white shadow-lg shadow-gold/30' : (dark ? 'bg-dark-border text-cream/50' : 'bg-gray-200 text-charcoal/50')}`}>
                  {step > i + 1 ? <IconCheck /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 hidden sm:block ${step === i + 1 ? 'text-gold font-medium' : (dark ? 'text-cream/50' : 'text-charcoal/50')}`}>{label}</span>
              </div>
              {i < 3 && <div className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 ${step > i + 1 ? 'bg-green-500' : (dark ? 'bg-dark-border' : 'bg-gray-200')}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <AnimatedSection>
            <h3 className={`font-serif text-xl font-semibold mb-6 ${dark ? 'text-cream' : 'text-charcoal'}`}>Выберите услуги</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map(service => {
                const isSelected = selectedServices.some(s => s.id === service.id);
                return (
                  <button key={service.id} onClick={() => toggleService(service)}
                    className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${isSelected ? 'ring-2 ring-gold bg-gold/5' : ''} ${dark ? 'bg-dark-bg hover:bg-dark-border border border-dark-border' : 'bg-cream hover:bg-cream-dark border border-transparent'}`}>
                    <img src={service.image} alt={service.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${dark ? 'text-cream' : 'text-charcoal'}`}>{service.name}</div>
                      <div className={`text-xs flex items-center gap-2 ${dark ? 'text-cream/50' : 'text-charcoal/50'}`}>
                        <span>{service.price.toLocaleString()} ₽</span><span>•</span><span>{service.duration} мин</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-gold bg-gold text-white' : (dark ? 'border-dark-border' : 'border-gray-300')}`}>
                      {isSelected && <IconCheck />}
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedServices.length > 0 && (
              <div className="mt-6 flex justify-between items-center">
                <span className={`text-sm ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>Выбрано: {selectedServices.length} | {totalPrice.toLocaleString()} ₽ | {totalDuration} мин</span>
                <button onClick={() => setStep(2)} className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:shadow-lg">Далее</button>
              </div>
            )}
          </AnimatedSection>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <AnimatedSection>
            <h3 className={`font-serif text-xl font-semibold mb-6 ${dark ? 'text-cream' : 'text-charcoal'}`}>Выберите мастера</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredMasters.map(master => (
                <button key={master.id} onClick={() => setSelectedMaster(master)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${selectedMaster?.id === master.id ? 'ring-2 ring-gold bg-gold/5' : ''} ${dark ? 'bg-dark-bg hover:bg-dark-border border border-dark-border' : 'bg-cream hover:bg-cream-dark border border-transparent'}`}>
                  <img src={master.image} alt={master.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className={`font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{master.name}</div>
                    <div className={`text-sm ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>{master.role}</div>
                    <div className="flex items-center gap-1 mt-1"><Stars rating={master.rating} /><span className={`text-xs ${dark ? 'text-cream/50' : 'text-charcoal/50'}`}>{master.rating}</span></div>
                  </div>
                  {selectedMaster?.id === master.id && <div className="w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center flex-shrink-0"><IconCheck /></div>}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(1)} className={`px-6 py-3 rounded-full text-sm font-medium ${dark ? 'text-cream/70 hover:bg-dark-border' : 'text-charcoal/70 hover:bg-cream'}`}>Назад</button>
              {selectedMaster && <button onClick={() => setStep(3)} className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:shadow-lg">Далее</button>}
            </div>
          </AnimatedSection>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <AnimatedSection>
            <h3 className={`font-serif text-xl font-semibold mb-6 ${dark ? 'text-cream' : 'text-charcoal'}`}>Выберите дату и время</h3>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
              {calendarDays.map(day => {
                const isToday = day.toDateString() === today.toDateString();
                const isSunday = day.getDay() === 0;
                const isSelected = selectedDate?.toDateString() === day.toDateString();
                return (
                  <button key={day.toISOString()} onClick={() => { if (!isSunday) { setSelectedDate(day); setSelectedTime(null); } }} disabled={isSunday}
                    className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all ${isSunday ? 'opacity-30 cursor-not-allowed' : ''} ${isSelected ? 'bg-gold text-white shadow-lg shadow-gold/30' : (dark ? 'bg-dark-bg border border-dark-border hover:border-gold' : 'bg-cream hover:bg-cream-dark')}`}>
                    <div className={`text-xs mb-1 ${isSelected ? 'text-white/80' : (dark ? 'text-cream/50' : 'text-charcoal/50')}`}>{day.toLocaleDateString('ru-RU', { weekday: 'short' })}</div>
                    <div className={`text-lg font-semibold ${isSelected ? 'text-white' : (dark ? 'text-cream' : 'text-charcoal')}`}>{day.getDate()}</div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : (dark ? 'text-cream/50' : 'text-charcoal/50')}`}>{day.toLocaleDateString('ru-RU', { month: 'short' })}</div>
                    {isToday && <div className="w-1.5 h-1.5 bg-gold rounded-full mx-auto mt-1" />}
                  </button>
                );
              })}
            </div>
            {selectedDate && (
              <div>
                <h4 className={`text-sm font-medium mb-3 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>Доступное время:</h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {availableSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-lg text-sm font-medium transition-all ${selectedTime === time ? 'bg-gold text-white shadow-lg' : (dark ? 'bg-dark-bg border border-dark-border hover:border-gold text-cream' : 'bg-cream hover:bg-cream-dark text-charcoal')}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(2)} className={`px-6 py-3 rounded-full text-sm font-medium ${dark ? 'text-cream/70 hover:bg-dark-border' : 'text-charcoal/70 hover:bg-cream'}`}>Назад</button>
              {selectedDate && selectedTime && <button onClick={() => setStep(4)} className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:shadow-lg">Далее</button>}
            </div>
          </AnimatedSection>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className={`font-serif text-xl font-semibold mb-6 ${dark ? 'text-cream' : 'text-charcoal'}`}>Ваши данные</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Имя *', key: 'name', type: 'text', placeholder: 'Ваше имя' },
                    { label: 'Телефон *', key: 'phone', type: 'tel', placeholder: '+7 (999) 123-45-67' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>{field.label}</label>
                      <input type={field.type} value={formData[field.key]} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 ${dark ? 'bg-dark-bg border-dark-border text-cream placeholder-cream/30' : 'bg-cream border-transparent text-charcoal placeholder-charcoal/30'}`}
                        placeholder={field.placeholder} />
                    </div>
                  ))}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>Комментарий</label>
                    <textarea value={formData.comment} onChange={e => setFormData({ ...formData, comment: e.target.value })} rows={3}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none ${dark ? 'bg-dark-bg border-dark-border text-cream placeholder-cream/30' : 'bg-cream border-transparent text-charcoal placeholder-charcoal/30'}`}
                      placeholder="Пожелания к записи..." />
                  </div>
                </div>
              </div>
              <div>
                <h3 className={`font-serif text-xl font-semibold mb-6 ${dark ? 'text-cream' : 'text-charcoal'}`}>Ваша запись</h3>
                <div className={`p-6 rounded-2xl space-y-4 ${dark ? 'bg-dark-bg border border-dark-border' : 'bg-cream'}`}>
                  <div>
                    <div className={`text-xs uppercase tracking-wide mb-1 ${dark ? 'text-cream/40' : 'text-charcoal/40'}`}>Услуги</div>
                    {selectedServices.map(s => (
                      <div key={s.id} className="flex justify-between items-center py-1">
                        <span className={`text-sm ${dark ? 'text-cream/80' : 'text-charcoal/80'}`}>{s.name}</span>
                        <span className="text-sm text-gold font-medium">{s.price.toLocaleString()} ₽</span>
                      </div>
                    ))}
                  </div>
                  <div className={`h-px ${dark ? 'bg-dark-border' : 'bg-cream-dark'}`} />
                  <div className="flex items-center gap-3">
                    {selectedMaster && <img src={selectedMaster.image} alt={selectedMaster.name} className="w-10 h-10 rounded-full object-cover" />}
                    <div>
                      <div className={`text-xs uppercase tracking-wide ${dark ? 'text-cream/40' : 'text-charcoal/40'}`}>Мастер</div>
                      <div className={`text-sm font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{selectedMaster?.name}</div>
                    </div>
                  </div>
                  <div className={`h-px ${dark ? 'bg-dark-border' : 'bg-cream-dark'}`} />
                  <div className="flex justify-between">
                    <div>
                      <div className={`text-xs uppercase tracking-wide ${dark ? 'text-cream/40' : 'text-charcoal/40'}`}>Дата и время</div>
                      <div className={`text-sm font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{selectedDate?.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })} в {selectedTime}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs uppercase tracking-wide ${dark ? 'text-cream/40' : 'text-charcoal/40'}`}>Длительность</div>
                      <div className={`text-sm font-medium ${dark ? 'text-cream' : 'text-charcoal'}`}>{totalDuration} мин</div>
                    </div>
                  </div>
                  <div className={`h-px ${dark ? 'bg-dark-border' : 'bg-cream-dark'}`} />
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${dark ? 'text-cream' : 'text-charcoal'}`}>Итого:</span>
                    <span className="text-2xl font-bold text-gold">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(3)} className={`px-6 py-3 rounded-full text-sm font-medium ${dark ? 'text-cream/70 hover:bg-dark-border' : 'text-charcoal/70 hover:bg-cream'}`}>Назад</button>
              <button onClick={() => setConfirmed(true)} disabled={!formData.name || !formData.phone}
                className="bg-gold hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-gold/30">
                Подтвердить запись
              </button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// ─── CONTACTS SECTION ────────────────────────────────────────────────────────

function ContactsSection({ dark }) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <section id="contacts" className={`py-20 sm:py-28 ${dark ? 'bg-dark-bg' : 'bg-cream'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Контакты</p>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold ${dark ? 'text-cream' : 'text-charcoal'}`}>
            Свяжитесь <span className="text-gold italic">с нами</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10">
          <AnimatedSection animation="animate-slide-left">
            <div className="space-y-6">
              {[
                { icon: <IconMapPin />, title: 'Адрес', text: 'г. Москва, ул. Большая Дмитровка, 7/5, стр. 1' },
                { icon: <IconPhone />, title: 'Телефон', text: '+7 (495) 123-45-67' },
                { icon: <IconClock />, title: 'Часы работы', text: 'Пн-Сб: 09:00 — 21:00', text2: 'Вс: выходной' },
              ].map(item => (
                <div key={item.title} className={`flex items-start gap-4 p-5 rounded-xl ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'}`}>
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-gold">{item.icon}</div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${dark ? 'text-cream' : 'text-charcoal'}`}>{item.title}</h4>
                    <p className={`text-sm ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>{item.text}</p>
                    {item.text2 && <p className={`text-sm ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>{item.text2}</p>}
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                {[{ icon: <IconInstagram />, label: 'Instagram' }, { icon: <IconTelegram />, label: 'Telegram' }, { icon: <IconWhatsApp />, label: 'WhatsApp' }].map(social => (
                  <button key={social.label}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${dark ? 'bg-dark-card border border-dark-border text-cream/70 hover:text-gold hover:border-gold' : 'bg-white shadow-sm text-charcoal/70 hover:text-gold hover:shadow-md'}`}>
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
            <div className={`mt-6 rounded-xl overflow-hidden h-56 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'}`}>
              <div className="w-full h-full bg-gradient-to-br from-rose-light/30 to-gold/10 flex items-center justify-center">
                <div className="text-center">
                  <div className={`${dark ? 'text-cream/60' : 'text-charcoal/60'}`}><IconMapPin /></div>
                  <p className={`text-sm mt-2 ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>ул. Большая Дмитровка, 7/5</p>
                  <p className={`text-xs ${dark ? 'text-cream/40' : 'text-charcoal/40'}`}>Москва, Россия</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="animate-slide-right">
            <div className={`p-6 sm:p-8 rounded-2xl ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'}`}>
              <h3 className={`font-serif text-xl font-semibold mb-6 ${dark ? 'text-cream' : 'text-charcoal'}`}>Напишите нам</h3>
              {sent ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p className={`font-serif text-lg font-semibold ${dark ? 'text-cream' : 'text-charcoal'}`}>Сообщение отправлено!</p>
                  <p className={`text-sm mt-2 ${dark ? 'text-cream/60' : 'text-charcoal/60'}`}>Мы ответим в ближайшее время</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { label: 'Имя', key: 'name', type: 'text', placeholder: 'Ваше имя' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>{field.label}</label>
                      <input type={field.type} value={contactForm[field.key]} onChange={e => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 ${dark ? 'bg-dark-bg border-dark-border text-cream placeholder-cream/30' : 'bg-cream border-transparent text-charcoal placeholder-charcoal/30'}`}
                        placeholder={field.placeholder} />
                    </div>
                  ))}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>Сообщение</label>
                    <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} rows={4}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none ${dark ? 'bg-dark-bg border-dark-border text-cream placeholder-cream/30' : 'bg-cream border-transparent text-charcoal placeholder-charcoal/30'}`}
                      placeholder="Ваше сообщение..." />
                  </div>
                  <button onClick={() => setSent(true)}
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-gold/20">
                    Отправить
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ dark, onNavigate }) {
  const navLabels = { home: 'Главная', services: 'Услуги', team: 'Мастера', gallery: 'Галерея', booking: 'Запись', contacts: 'Контакты' };
  return (
    <footer className={`py-12 ${dark ? 'bg-dark-card border-t border-dark-border' : 'bg-charcoal'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">Belle <span className="text-gold">Beauté</span></h3>
            <p className="text-white/50 text-sm leading-relaxed">Пространство, где искусство встречается с красотой.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Навигация</h4>
            <div className="space-y-2">
              {Object.entries(navLabels).map(([id, label]) => (
                <button key={id} onClick={() => onNavigate(id)} className="block text-white/50 hover:text-gold text-sm transition-colors">{label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Услуги</h4>
            <div className="space-y-2">
              {['Стрижки', 'Окрашивание', 'Маникюр', 'Макияж', 'Уход', 'Брови'].map(s => (
                <p key={s} className="text-white/50 text-sm">{s}</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Контакты</h4>
            <div className="space-y-2 text-white/50 text-sm">
              <p>+7 (495) 123-45-67</p>
              <p>info@bellebeaute.ru</p>
              <p>ул. Б. Дмитровка, 7/5</p>
              <p>Пн-Сб: 09:00 — 21:00</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-sm">&copy; 2025 Belle Beauté. Все права защищены.</p>
          <div className="flex gap-3">
            {[<IconInstagram key="ig" />, <IconTelegram key="tg" />, <IconWhatsApp key="wa" />].map((icon, i) => (
              <span key={i} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all cursor-pointer">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedServices, setSelectedServices] = useState([]);
  const [preselectedMaster, setPreselectedMaster] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const sections = ['home', 'services', 'team', 'gallery', 'booking', 'contacts'];
    const onScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setCurrentSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleService = useCallback((service) => {
    setSelectedServices(prev =>
      prev.some(s => s.id === service.id) ? prev.filter(s => s.id !== service.id) : [...prev, service]
    );
  }, []);

  const handleBookMaster = useCallback((master) => {
    setPreselectedMaster(master);
    navigateTo('booking');
  }, [navigateTo]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-dark-bg text-cream' : 'bg-white text-charcoal'}`}>
      <Navbar dark={dark} setDark={setDark} currentSection={currentSection} onNavigate={navigateTo} />
      <Hero onNavigate={navigateTo} />
      <About dark={dark} />
      <ServicesSection dark={dark} selectedServices={selectedServices} toggleService={toggleService} onNavigate={navigateTo} />
      <TeamSection dark={dark} onBookMaster={handleBookMaster} />
      <ReviewsSection dark={dark} />
      <GallerySection dark={dark} />
      <BookingSection dark={dark} selectedServices={selectedServices} toggleService={toggleService} preselectedMaster={preselectedMaster} />
      <ContactsSection dark={dark} />
      <Footer dark={dark} onNavigate={navigateTo} />
    </div>
  );
}
