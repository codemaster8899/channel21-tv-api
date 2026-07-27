/**
 * Full example DB seed for local 21TV development.
 * Uses Figma Dar-21 Programs screen images from public/images/figma/
 * Usage: node scripts/seed.js
 */
require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Admin = require("../model/admin");
const ProgramType = require("../model/prograqm_type");
const Program = require("../model/program");
const Faces = require("../model/faces");
const Schedule = require("../model/schedule");
const PageContent = require("../model/page_content");
const Translation = require("../model/translation");
const Contact = require("../model/contact_us");
const ProgramHistory = require("../model/program_history");
const Slider = require("../model/homepage/slider");
const Footer = require("../model/homepage/footer");
const Live = require("../model/homepage/live");
const Banners = require("../model/homepage/program-show_banners");
const Media = require("../model/homepage/social_media");

const BASE = process.env.SEED_IMAGE_BASE || "https://21-back.vercel.app";
const figma = (n) =>
  `${BASE}/images/figma/figma-${String(n).padStart(2, "0")}.jpg`;
const VIDEO = "https://www.youtube.com/watch?v=jNQXAC9IVRw";

const TYPE_PROGRAMS = new mongoose.Types.ObjectId("624d89fd69c3c4a1efa91efa");
const TYPE_SHOWS = new mongoose.Types.ObjectId("624d89f369c3c4a1efa91ef7");
const TYPE_FILMS = new mongoose.Types.ObjectId("627b742b3e200e8118224e1e");

function t(am, ru, en) {
  return { am, ru, en };
}

function todayDateStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}

function atToday(hours, minutes = 0) {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

async function clearAll() {
  const collections = [
    Admin,
    ProgramType,
    Program,
    Faces,
    Schedule,
    PageContent,
    Translation,
    Contact,
    ProgramHistory,
    Slider,
    Footer,
    Live,
    Banners,
    Media,
  ];
  for (const Model of collections) {
    await Model.deleteMany({});
  }
  console.log("cleared collections");
}

async function seedAdmin() {
  await Admin.create({
    name: t("Ա. Սիմոնյան", "А. Симонян", "A. Simonyan"),
    email: "asimonyan",
    password: "123456",
    isAdmin: true,
  });
  console.log("admin: asimonyan / 123456");
}

async function seedTypes() {
  await ProgramType.create([
    { _id: TYPE_PROGRAMS, name: "programs" },
    { _id: TYPE_SHOWS, name: "shows" },
    { _id: TYPE_FILMS, name: "films" },
  ]);
  console.log("program types");
}

async function seedPrograms() {
  // Matches Figma Programs screen rows / hero assets
  const programs = await Program.insertMany([
    {
      name: t("Երևանյան Երեկո", "Ереванский вечер", "Yerevan Evening"),
      description: t(
        "Երեկոյան շոու Գոռ Բարսեղյանի հետ",
        "Вечернее шоу с Гором Барсегяном",
        "Evening show with Gor Barseghyan",
      ),
      image: figma(1),
      banners_order: 1,
      program_type_id: TYPE_PROGRAMS,
      link: VIDEO,
    },
    {
      name: t("Օրը Բարի", "Добрый день", "Good Day"),
      description: t(
        "Առավոտյան հաղորդում հյուրերով",
        "Утренняя программа с гостями",
        "Morning show with guests",
      ),
      image: figma(4),
      banners_order: 2,
      program_type_id: TYPE_PROGRAMS,
      link: VIDEO,
    },
    {
      name: t("Առանց Փողկապի", "Без галстука", "Without a Tie"),
      description: t(
        "Անկաշկանդ զրույցներ",
        "Откровенные интервью",
        "Candid interviews",
      ),
      image: figma(5),
      banners_order: 3,
      program_type_id: TYPE_PROGRAMS,
      link: VIDEO,
    },
    {
      name: t(
        "The Boing Orchestra",
        "The Boing Orchestra",
        "The Boing Orchestra",
      ),
      description: t(
        "Հովիկ Արշակյան և The Boing Orchestra",
        "Овик Аршакян и The Boing Orchestra",
        "Hovik Arshakyan and The Boing Orchestra",
      ),
      image: figma(13),
      banners_order: 1,
      program_type_id: TYPE_SHOWS,
      link: VIDEO,
    },
    {
      name: t("Երաժշտական երեկո", "Музыкальный вечер", "Music Night"),
      description: t(
        "Երաժշտություն և հյուրեր",
        "Музыка и гости",
        "Music and guests",
      ),
      image: figma(10),
      banners_order: 2,
      program_type_id: TYPE_SHOWS,
      link: VIDEO,
    },
    {
      name: t("Շոու պատմություններ", "Истории шоу", "Show Stories"),
      description: t(
        "Հատուկ թողարկումներ",
        "Специальные выпуски",
        "Special episodes",
      ),
      image: figma(3),
      banners_order: 1,
      program_type_id: TYPE_FILMS,
      link: VIDEO,
    },
    {
      name: t("21TV Հատուկ", "21TV Спецвыпуск", "21TV Special"),
      description: t(
        "Հատուկ թողարկում",
        "Специальный выпуск",
        "Special broadcast",
      ),
      image: figma(11),
      banners_order: 2,
      program_type_id: TYPE_FILMS,
      link: VIDEO,
    },
  ]);
  console.log(`programs: ${programs.length}`);
  return programs;
}

async function seedHistories(programs) {
  // Episode thumbs from Figma screen (as-is)
  const episodeSets = [
    // Երևանյան Երեկո
    [
      { img: 1, title: t("Գոռ Բարսեղյան", "Гор Барсегян", "Gor Barseghyan") },
      {
        img: 3,
        title: t("Գևորգ և Արման", "Геворг и Арман", "Gevorg & Arman"),
      },
      {
        img: 13,
        title: t(
          "The Boing Orchestra",
          "The Boing Orchestra",
          "The Boing Orchestra",
        ),
      },
      { img: 11, title: t("Հատուկ հյուր", "Особый гость", "Special guest") },
    ],
    // Օրը Բարի
    [
      { img: 4, title: t("Հաղորդավարներ", "Ведущие", "Hosts") },
      {
        img: 7,
        title: t("Ռաֆո Խաչատրյան", "Рафо Хачатрян", "Rafo Khachatryan"),
      },
      { img: 9, title: t("Հյուրեր", "Гости", "Guests") },
      {
        img: 12,
        title: t("Առավոտյան թողարկում", "Утренний выпуск", "Morning episode"),
      },
    ],
    // Առանց Փողկապի
    [
      {
        img: 5,
        title: t(
          "Կարեն Համբարձումյան",
          "Карен Амбарцумян",
          "Karen Hambardzumyan",
        ),
      },
      {
        img: 14,
        title: t("Հակոբ Ղազանչյան", "Акоп Газанчян", "Hakob Ghazanchyan"),
      },
      {
        img: 2,
        title: t("Գագիկ Շահբազյան", "Гагик Шахбазян", "Gagik Shahbazyan"),
      },
      { img: 6, title: t("Նոր հյուր", "Новый гость", "New guest") },
    ],
    // The Boing Orchestra
    [
      {
        img: 13,
        title: t("Հովիկ Արշակյան", "Овик Аршакян", "Hovik Arshakyan"),
      },
      { img: 10, title: t("Բեմում", "На сцене", "On stage") },
      { img: 8, title: t("Հյուրեր", "Гости", "Guests") },
      { img: 11, title: t("Թողարկում 4", "Выпуск 4", "Episode 4") },
    ],
    // Music Night
    [
      { img: 10, title: t("Դրվագ 1", "Серия 1", "Episode 1") },
      { img: 8, title: t("Դրվագ 2", "Серия 2", "Episode 2") },
      { img: 3, title: t("Դրվագ 3", "Серия 3", "Episode 3") },
      { img: 1, title: t("Դրվագ 4", "Серия 4", "Episode 4") },
    ],
    // Show Stories
    [
      { img: 3, title: t("Դրվագ 1", "Серия 1", "Episode 1") },
      { img: 11, title: t("Դրվագ 2", "Серия 2", "Episode 2") },
      { img: 8, title: t("Դրվագ 3", "Серия 3", "Episode 3") },
      { img: 13, title: t("Դրվագ 4", "Серия 4", "Episode 4") },
    ],
    // 21TV Special
    [
      { img: 11, title: t("Դրվագ 1", "Серия 1", "Episode 1") },
      { img: 8, title: t("Դրվագ 2", "Серия 2", "Episode 2") },
      { img: 10, title: t("Դրվագ 3", "Серия 3", "Episode 3") },
      { img: 4, title: t("Դրվագ 4", "Серия 4", "Episode 4") },
    ],
  ];

  const docs = [];
  programs.forEach((p, pi) => {
    const set = episodeSets[pi] || episodeSets[0];
    set.forEach((ep, ei) => {
      docs.push({
        programId: p._id,
        episode: ei + 1,
        link: VIDEO,
        title: ep.title,
        duration: `0${ei + 1}:${20 + ei * 5}`,
        date: new Date(Date.now() - (ei + 1) * 86400000 * 3),
        image: figma(ep.img),
      });
    });
  });
  await ProgramHistory.insertMany(docs);
  console.log(`episodes: ${docs.length}`);
}

async function seedSliders() {
  await Slider.insertMany([
    {
      image: figma(13),
      title: t(
        "The Boing Orchestra",
        "The Boing Orchestra",
        "The Boing Orchestra",
      ),
      description: t("Հովիկ Արշակյան", "Овик Аршакян", "Hovik Arshakyan"),
      link: VIDEO,
      slider_order: 1,
    },
    {
      image: figma(4),
      title: t("Օրը Բարի", "Добрый день", "Good Day"),
      description: t("Նոր թողարկում", "Новый выпуск", "New episode"),
      link: VIDEO,
      slider_order: 2,
    },
    {
      image: figma(1),
      title: t("Երևանյան Երեկո", "Ереванский вечер", "Yerevan Evening"),
      description: t(
        "Գոռ Բարսեղյանի հետ",
        "С Гором Барсегяном",
        "With Gor Barseghyan",
      ),
      link: VIDEO,
      slider_order: 3,
    },
  ]);
  console.log("sliders");
}

async function seedFaces() {
  await Faces.insertMany([
    {
      image: figma(11),
      firstName: t("Հաղորդավար", "Ведущий", "Host"),
      lastName: t("21TV", "21TV", "21TV"),
      role: t("Հաղորդավար", "Ведущий", "Host"),
      description: t("21TV թիմ", "Команда 21TV", "21TV team"),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
    {
      image: figma(5),
      firstName: t("Կարեն", "Карен", "Karen"),
      lastName: t("Համբարձումյան", "Амбарцумян", "Hambardzumyan"),
      role: t("Հյուր", "Гость", "Guest"),
      description: t("Առանց Փողկապի", "Без галстука", "Without a Tie"),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
    {
      image: figma(2),
      firstName: t("Գագիկ", "Гагик", "Gagik"),
      lastName: t("Շահբազյան", "Шахбазян", "Shahbazyan"),
      role: t("Հյուր", "Гость", "Guest"),
      description: t("Առանց Փողկապի", "Без галстука", "Without a Tie"),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
    {
      image: figma(13),
      firstName: t("Հովիկ", "Овик", "Hovik"),
      lastName: t("Արշակյան", "Аршакян", "Arshakyan"),
      role: t("Երաժիշտ", "Музыкант", "Musician"),
      description: t(
        "The Boing Orchestra",
        "The Boing Orchestra",
        "The Boing Orchestra",
      ),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
  ]);
  console.log("faces");
}

async function seedSchedule(programs) {
  const today = todayDateStr(0);
  const tomorrow = todayDateStr(1);
  const slots = [
    { h: 9, m: 0, name: t("Օրը Բարի", "Добрый день", "Good Day"), p: 1 },
    {
      h: 12,
      m: 0,
      name: t("Առանց Փողկապի", "Без галстука", "Without a Tie"),
      p: 2,
    },
    {
      h: 15,
      m: 30,
      name: t("Երաժշտական երեկո", "Музыкальный вечер", "Music Night"),
      p: 4,
    },
    {
      h: 18,
      m: 0,
      name: t("Երևանյան Երեկո", "Ереванский вечер", "Yerevan Evening"),
      p: 0,
    },
    {
      h: 20,
      m: 0,
      name: t(
        "The Boing Orchestra",
        "The Boing Orchestra",
        "The Boing Orchestra",
      ),
      p: 3,
    },
    {
      h: 22,
      m: 0,
      name: t("21TV Հատուկ", "21TV Спецвыпуск", "21TV Special"),
      p: 6,
    },
  ];

  const docs = slots.map((s, i) => {
    const start = atToday(s.h, s.m);
    const end = atToday(s.h + 1, s.m);
    const program = programs[s.p];
    return {
      programId: program._id,
      name: s.name,
      id: `sched-${i + 1}`,
      startDate: start,
      endDate: end,
      startTime: s.h * 60 + s.m,
      endTime: (s.h + 1) * 60 + s.m,
      appointmentId: i + 1,
      image: program.image,
      dates: [today, tomorrow],
      freqType: 1,
    };
  });
  await Schedule.insertMany(docs);
  console.log(`schedules: ${docs.length} (today ${today})`);
}

async function seedBanners(programs) {
  await Banners.insertMany(
    programs.slice(0, 5).map((p, i) => ({
      image: p.image,
      order: i + 1,
      programId: p._id,
    })),
  );
  console.log("banners");
}

async function seedMisc() {
  await Contact.create({
    title: t("Կապ մեզ հետ", "Свяжитесь с нами", "Contact us"),
    description: t(
      "21TV — հայկական հեռուստաալիք։ Կապվեք մեզ հետ ցանկացած հարցով։",
      "21TV — армянский телеканал. Свяжитесь с нами по любым вопросам.",
      "21TV is an Armenian TV channel. Contact us with any questions.",
    ),
    email: "info@21tv.am",
    phone: "+374 10 21 21 21",
    address: t("Երևան, Հայաստան", "Ереван, Армения", "Yerevan, Armenia"),
  });

  await Media.create({
    title: t("Սոցիալական ցանցեր", "Социальные сети", "Social media"),
    description: t("Հետևեք մեզ", "Следите за нами", "Follow us"),
    facebookLink: "https://facebook.com/21tv",
    twitterLink: "https://twitter.com/21tv",
    youtubeLink: "https://youtube.com/@21tv",
    instagramLink: "https://instagram.com/21tv",
  });

  await Live.create({ link: VIDEO });

  await Footer.create({
    title: t("21TV Հայաստան", "21TV Армения", "21TV Armenia"),
  });

  await PageContent.create({
    image: figma(8),
    title: t("դեմքեր", "лица", "faces"),
  });

  await Translation.insertMany([
    {
      key: "home.welcome",
      values: t("Բարի գալուստ", "Добро пожаловать", "Welcome"),
    },
    { key: "home.watch", values: t("Դիտել", "Смотреть", "Watch") },
    { key: "home.more", values: t("Ավելին", "Ещё", "More") },
  ]);

  console.log("contact, social, live, footer, page content, translations");
}

async function main() {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL missing in .env");
  }
  const figmaDir = path.join(__dirname, "..", "public", "images", "figma");
  if (!fs.existsSync(figmaDir) || fs.readdirSync(figmaDir).length < 10) {
    throw new Error(
      "Figma images missing in public/images/figma/. Copy assets there first.",
    );
  }

  await mongoose.connect(process.env.DB_URL);
  console.log("connected");

  await clearAll();
  await seedAdmin();
  await seedTypes();
  const programs = await seedPrograms();
  await seedHistories(programs);
  await seedSliders();
  await seedFaces();
  await seedSchedule(programs);
  await seedBanners(programs);
  await seedMisc();

  console.log("\nSeed complete with Figma images.");
  console.log("Login: asimonyan / 123456");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
