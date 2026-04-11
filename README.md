# 🛍️ Next Shopping

A modern full-stack eCommerce application built with Next.js 16, React 19, Prisma, and Tailwind CSS.

---

## 🚀 Features

- 🧑‍💻 Modern App Router (Next.js 16)
- 🎨 Beautiful UI with Tailwind CSS & shadcn
- 🧩 Component-based architecture
- 🔐 Authentication (better-auth)
- 🗃️ PostgreSQL database with Prisma ORM
- 🖼️ Image upload & optimization (Cloudinary)
- 📦 Product management system
- 🔎 Advanced filtering & search
- 🧮 Forms with validation (React Hook Form + Zod)
- 📊 Data tables (TanStack Table)
- 🎞️ Animations (Framer Motion)
- 🔔 Notifications (Sonner)

---

## 🧱 Tech Stack

### Frontend

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn/ui
- Radix UI
- Framer Motion
- React Icons

### Backend

- Prisma ORM
- PostgreSQL (pg)
- Better Auth
- Nodemailer

### State & Forms

- React Hook Form
- Zod

### Utilities

- clsx / tailwind-merge
- slugify
- dotenv

### Advanced UI & Interaction

- @dnd-kit (drag & drop)
- TanStack React Table
- Recharts (charts)
- Vaul (drawers)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/next_shopping.git

cd next_shopping

# Install dependencies
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
AUTH_SECRET=your_auth_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🧪 Development

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

## 🏗️ Build

```bash
npm run build
npm start
```

---

## 🧹 Lint

```bash
npm run lint
```

---

## 🗄️ Database (Prisma)

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

---

## 📁 Project Structure (Example)

```
/app
/components
/hooks
/lib
/prisma
/public
/styles
/types
```

---

## ✨ Key Libraries Explained

- **Prisma** → Database ORM
- **Better Auth** → Authentication system
- **React Hook Form + Zod** → Form handling & validation
- **shadcn/ui + Radix** → Accessible UI components
- **@dnd-kit** → Drag and drop functionality
- **TanStack Table** → Advanced tables
- **Framer Motion** → Animations
- **Cloudinary** → Image storage

---

## 📌 Scripts

| Script | Description              |
| ------ | ------------------------ |
| dev    | Start development server |
| build  | Build app for production |
| start  | Run production server    |
| lint   | Run ESLint               |

---

## 📬 Email Support

Uses Nodemailer for sending emails (e.g., order confirmations, password reset).

---

## 🧑‍💻 Author

**Your Name**

---

## 📄 License

This project is private and not licensed for public distribution.

---

## 💡 Future Improvements

- Payment integration (Stripe)
- Order tracking system
- Admin dashboard enhancements
- Performance optimization
- SEO improvements

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
