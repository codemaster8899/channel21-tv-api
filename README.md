# Channel 21 TV — Backend API

Node.js / Express API that powers the [Channel 21 TV web frontend](https://github.com/codemaster8899/channel21-tv-web).

**API host:** [https://21-back.vercel.app](https://21-back.vercel.app)

## About

REST backend for Channel 21 TV content: programs, shows, films, faces, schedule, homepage sliders, live stream links, contact/email, translations, and admin auth. Data is stored in MongoDB; images can be served from `public/` or uploaded (e.g. S3).

Paired frontend: **[channel21-tv-web](https://github.com/codemaster8899/channel21-tv-web)**

## Tech stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** admin authentication
- **Multer** for uploads
- **Nodemailer** for contact emails
- **Vercel** deployment (with optional seed-on-deploy)

## Project structure

```
server.js          App entry — Express, CORS, static files, routes
routes/            API route definitions
controller/        Request handlers (programs, faces, schedule, admin, …)
model/             Mongoose schemas
middleware/        Auth + upload middleware
db/                MongoDB / Mongoose connection
scripts/           Seed helpers for local and deploy
public/            Static assets and images
emailTamplate/     Email HTML templates
utils/             Helpers (CORS options, etc.)
```

### Main API areas

- **Admin** — login, password change / reset
- **Programs & types** — catalog CRUD, banners
- **Program history / episodes** — series content + search
- **Schedule** — TV schedule CRUD
- **Faces** — presenters / on-air faces
- **Homepage** — sliders, live link, social links, footer, banners
- **Contact** — contact info + send email to 21TV
- **Translations & page content**
- **Uploads** — image upload / fetch

## Getting started

Requirements: Node.js and a running MongoDB instance.

```bash
cp .env.example .env
npm install
npm run dev      # nodemon
# or
npm start        # node server.js
```

Seed sample data (optional):

```bash
npm run seed
```

See `.env.example` for `DB_URL`, `LOCAL_PORT`, `CORS_DOMAIN`, and `JWT_PRIVATE_KEY`.

## Author

**codemaster8899**
