# Clean House - Интернет-магазин товаров для дома

Современный интернет-магазин товаров для дома и уборки с административной панелью.

## 🚀 Технологии

### Frontend
- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - типизация для надежности
- **Tailwind CSS** - современная стилизация
- **Framer Motion** - плавные анимации
- **Zustand** - управление состоянием
- **React Hook Form** - работа с формами
- **React Query** - работа с API

### Backend
- **Node.js** - серверная платформа
- **Express.js** - веб-фреймворк
- **TypeScript** - типизация
- **Prisma** - ORM для работы с БД
- **PostgreSQL** - основная база данных
- **JWT** - аутентификация
- **Stripe** - платежи

## 📁 Структура проекта

```
clean-house/
├── frontend/          # Next.js приложение
│   ├── src/
│   │   ├── app/       # App Router страницы
│   │   ├── components/ # React компоненты
│   │   ├── store/     # Zustand stores
│   │   └── lib/       # Утилиты
├── backend/           # Node.js API
│   ├── src/
│   │   ├── controllers/ # Контроллеры
│   │   ├── middleware/  # Middleware
│   │   ├── routes/      # API роуты
│   │   └── services/    # Бизнес-логика
│   └── prisma/         # Схема БД
└── docs/              # Документация
```

## 🛠 Установка и запуск

### Предварительные требования
- Node.js 18+
- PostgreSQL 13+
- npm или yarn

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd clean-house
```

### 2. Установка зависимостей
```bash
# Установка всех зависимостей
npm run install:all

# Или по отдельности
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 3. Настройка базы данных
```bash
# Создание базы данных PostgreSQL
createdb clean_house_db

# Настройка переменных окружения
cp backend/env.example backend/.env
# Отредактируйте .env файл с вашими настройками

# Применение миграций
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Запуск в режиме разработки
```bash
# Запуск frontend и backend одновременно
npm run dev

# Или по отдельности
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:3001
```

## 🎨 Дизайн

Проект использует современную цветовую схему:
- **Оранжевый** (#FF6B35) - основной цвет
- **Синий** (#1976D2) - вторичный цвет
- **Золотой** (#FFD700) - акцентный цвет
- **Зеленый** (#4CAF50) - успех/логотип

## 📱 Функциональность

### Для пользователей
- ✅ Регистрация и авторизация
- ✅ Каталог товаров с поиском и фильтрами
- ✅ Корзина покупок
- ✅ Список желаний
- ✅ Оформление заказов
- ✅ Личный кабинет
- ✅ Отзывы и рейтинги

### Для администраторов
- ✅ Управление товарами
- ✅ Управление категориями
- ✅ Управление заказами
- ✅ Управление пользователями
- ✅ Аналитика и отчеты
- ✅ Настройки магазина

## 🔧 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/logout` - Выход
- `GET /api/auth/profile` - Профиль пользователя

### Товары
- `GET /api/products` - Список товаров
- `GET /api/products/:id` - Детали товара
- `GET /api/products/search` - Поиск товаров
- `GET /api/products/featured` - Популярные товары

### Корзина
- `GET /api/cart` - Получить корзину
- `POST /api/cart/add` - Добавить в корзину
- `PUT /api/cart/:itemId` - Обновить количество
- `DELETE /api/cart/:itemId` - Удалить из корзины

### Заказы
- `GET /api/orders` - Список заказов
- `POST /api/orders` - Создать заказ
- `GET /api/orders/:id` - Детали заказа

## 🗄 База данных

Схема базы данных включает:
- **Users** - пользователи
- **Products** - товары
- **Categories** - категории
- **Orders** - заказы
- **Cart** - корзина
- **Reviews** - отзывы
- **Wishlist** - список желаний

## 🚀 Деплой

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Деплой на Vercel
```

### Backend (Railway/DigitalOcean)
```bash
cd backend
npm run build
# Деплой на выбранной платформе
```

## 📝 Скрипты

```bash
# Разработка
npm run dev              # Запуск frontend + backend
npm run dev:frontend     # Только frontend
npm run dev:backend      # Только backend

# Сборка
npm run build           # Сборка frontend

# Установка
npm run install:all     # Установка всех зависимостей
```

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 📞 Поддержка

Если у вас есть вопросы или проблемы, создайте issue в репозитории.

---

**Clean House** - создано с ❤️ для чистоты вашего дома
