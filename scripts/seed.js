/**
 * Full example DB seed for local 21TV development.
 * Uses 21TV content images from public/images/assets/
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

function getImageBase() {
  if (process.env.SEED_IMAGE_BASE) {
    return process.env.SEED_IMAGE_BASE.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://21-back.vercel.app";
}

const ASSET_IMAGES = {
  1: "0c0c8400767016937458e93a383c65bd92e6873d.jpg", // Yerevan Evening poster
  2: "2de7e7b433a215af0c2a27e1713e07c085bac467.jpg", // Gagik Shahbazyan
  3: "4c173ff5ac7152bd90363f0dff898eca25afe0eb-1.jpg", // Gevorg & Arman
  4: "5e47277f8637ce4420f262e73dd392fdc6cfc7be.jpg", // Or Bari multi-panel
  5: "712b83ee3495dc05ca7bea62babebb7140bafa8d.jpg", // Karen Hambardzumyan
  6: "7a20e3b872c27e95fffaf80615f4dd3d207319c1.jpg", // Without a Tie guest
  7: "7caac6a45af507c7960d5c3ad1a3e38f7cf99e8c.jpg", // Or Bari Rafo
  8: "8ce04c4742a07d46839828e74e1ff79048967ba6.jpg", // Studio / guests
  9: "93586e95273fd7bbbcb1c47eb08b8f8fc3841220.jpg", // Or Bari guests
  10: "97592eb91a036d1d080a144284b831bed2a4225a.jpg", // Music guests
  11: "b0d73efa44b742cc1b02c70ac29dd52f155a1710.jpg", // 21TV host
  12: "b143dec7b7e664699d77b2d211760db4182abeec.jpg", // Or Bari honey
  13: "d537955e82d74d46e6cc8f5de073fb0ad0fb5ad4.jpg", // Boing Orchestra
  14: "c8cdf9b3885ce98cf0e37311dd270453f2b0e4ad.jpg", // Hakob Ghazanchyan
  15: "dc7f90f2281b7b34bbce0ffe89d44362e50059f3.jpg", // Erk Ergots Metere
  17: "c490f4f78c7720d18e7762d9bc0a17f45e682c44.jpg", // Argishti Aroyan
  18: "4c173ff5ac7152bd90363f0dff898eca25afe0eb-episode.jpg", // Yerevan Evening ep
};
const asset = (n) => `${getImageBase()}/images/assets/${ASSET_IMAGES[n]}`;
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
  // Matches Programs screen rows / hero assets
  const programs = await Program.insertMany([
    {
      name: t("Երևանյան Երեկո", "Ереванский вечер", "Yerevan Evening"),
      description: t(
        "Երեկոյան շոու Գոռ Բարսեղյանի հետ",
        "Вечернее шоу с Гором Барсегяном",
        "Evening show with Gor Barseghyan",
      ),
      image: asset(1),
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
      image: asset(4),
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
      image: asset(5),
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
      image: asset(13),
      banners_order: 1,
      program_type_id: TYPE_SHOWS,
      link: VIDEO,
    },
    {
      name: t("ԵՐԳ ԵՐԳՈՑ ՄԵԾԵՐԸ", "Великие песни", "The Greats of Songs"),
      description: t(
        "Երաժշտական հաղորդում",
        "Музыкальная программа",
        "Music program",
      ),
      image: asset(15),
      banners_order: 2,
      program_type_id: TYPE_SHOWS,
      link: VIDEO,
    },
    {
      name: t("Dar 21", "Dar 21", "Dar 21"),
      description: t(
        "Տոնական հատուկ թողարկում",
        "Праздничный спецвыпуск",
        "Holiday special",
      ),
      image: asset(11),
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
      image: asset(11),
      banners_order: 2,
      program_type_id: TYPE_FILMS,
      link: VIDEO,
    },
  ]);
  console.log(`programs: ${programs.length}`);
  return programs;
}

async function seedHistories(programs) {
  // Episode thumbs from the content image set.
  const episodeSets = [
    // Երևանյան Երեկո
    [
      {
        img: 18,
        title: t(
          "Երևանյան Երեկո 03",
          "Ереванский вечер 03",
          "Yerevan Evening 03",
        ),
        duration: "32:13",
        dateOffset: 1200,
      },
      { img: 1, title: t("Գոռ Բարսեղյան", "Гор Барсегян", "Gor Barseghyan") },
      {
        img: 3,
        title: t("Գևորգ Մկրտչյան", "Геворг Мкртчян", "Gevorg Mkrtchyan"),
      },
      {
        img: 3,
        title: t("Արման Անտոնյան", "Арман Антонян", "Arman Antonyan"),
      },
    ],
    // Օրը Բարի
    [
      { img: 4, title: t("Հաղորդավարներ", "Ведущие", "Hosts") },
      {
        img: 7,
        title: t("Ռաֆո Խաչատրյան", "Рафо Хачатрян", "Rafo Khachatryan"),
      },
      {
        img: 9,
        title: t(
          "ԱՐԱԲՈ ԻՍՊԻՐՅԱՆ և ՎԱՀԵ ՀԱՐՈՒԹՅՈՒՆՅԱՆ",
          "Арабо Испирян и Ваге Арутюнян",
          "Arabo Ispiryan & Vahe Harutyunyan",
        ),
      },
      {
        img: 12,
        title: t("ԷՎԵԼԻՆԱ և ՄԱՆԵ", "Эвелина и Манe", "Evik & Man_go"),
      },
    ],
    // Առանց Փողկապի
    [
      {
        img: 17,
        title: t("ԱՐԳԻՇՏԻ ԱՐՈՅԱՆ", "Аргишти Ароян", "Argishti Aroyan"),
      },
      {
        img: 5,
        title: t(
          "ԿԱՐԵՆ ՀԱՄԲԱՐՁՈՒՄՅԱՆ",
          "Карен Амбарцумян",
          "Karen Hambardzumyan",
        ),
      },
      {
        img: 2,
        title: t("ԳԱԳԻԿ ՇԱՀԲԱԶՅԱՆ", "Гагик Шахбазян", "Gagik Shahbazyan"),
      },
      {
        img: 14,
        title: t("ՀԱԿՈԲ ՂԱԶԱՆՉՅԱՆ", "Акоп Газанчян", "Hakob Ghazanchyan"),
      },
    ],
    // The Boing Orchestra
    [
      {
        img: 13,
        title: t("ՀՈՎԻԿ ԱՐՇԱԿՅԱՆ", "Овик Аршакян", "Hovik Arshakyan"),
      },
      { img: 13, title: t("ԲԵՄՈՒՄ", "На сцене", "On stage") },
      { img: 8, title: t("ՀՅՈՒՐԵՐ", "Гости", "Guests") },
      { img: 11, title: t("ԹՈՂԱՐԿՈՒՄ 4", "Выпуск 4", "Episode 4") },
    ],
    // Erk Ergots Metere
    [
      { img: 15, title: t("ԴՐՎԱԳ 1", "Серия 1", "Episode 1") },
      { img: 15, title: t("ԴՐՎԱԳ 2", "Серия 2", "Episode 2") },
      { img: 10, title: t("ԴՐՎԱԳ 3", "Серия 3", "Episode 3") },
      { img: 8, title: t("ԴՐՎԱԳ 4", "Серия 4", "Episode 4") },
    ],
    // Dar 21
    [
      { img: 11, title: t("Dar 21", "Dar 21", "Dar 21") },
      { img: 11, title: t("ՀՅՈՒՐ 1", "Гость 1", "Guest 1") },
      { img: 8, title: t("ՀՅՈՒՐ 2", "Гость 2", "Guest 2") },
      { img: 10, title: t("ՀՅՈՒՐ 3", "Гость 3", "Guest 3") },
    ],
    // 21TV Special
    [
      { img: 11, title: t("ԴՐՎԱԳ 1", "Серия 1", "Episode 1") },
      { img: 8, title: t("ԴՐՎԱԳ 2", "Серия 2", "Episode 2") },
      { img: 10, title: t("ԴՐՎԱԳ 3", "Серия 3", "Episode 3") },
      { img: 4, title: t("ԴՐՎԱԳ 4", "Серия 4", "Episode 4") },
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
        duration:
          ep.duration || `0${ei + 1}:${String(20 + ei * 5).padStart(2, "0")}`,
        date: ep.dateOffset
          ? new Date(Date.now() - ep.dateOffset * 86400000)
          : new Date(Date.now() - (ei + 1) * 86400000 * 3),
        image: asset(ep.img),
      });
    });
  });
  await ProgramHistory.insertMany(docs);
  console.log(`episodes: ${docs.length}`);
}

async function seedSliders() {
  await Slider.insertMany([
    {
      image: asset(15),
      title: t("ԵՐԳ ԵՐԳՈՑ ՄԵԾԵՐԸ", "Великие песни", "The Greats of Songs"),
      description: t(
        "Երաժշտական հաղորդում",
        "Музыкальная программа",
        "Music program",
      ),
      link: VIDEO,
      slider_order: 1,
    },
    {
      image: asset(13),
      title: t(
        "The Boing Orchestra",
        "The Boing Orchestra",
        "The Boing Orchestra",
      ),
      description: t("Հովիկ Արշակյան", "Овик Аршакян", "Hovik Arshakyan"),
      link: VIDEO,
      slider_order: 2,
    },
    {
      image: asset(4),
      title: t("Օրը Բարի", "Добрый день", "Good Day"),
      description: t("Նոր թողարկում", "Новый выпуск", "New episode"),
      link: VIDEO,
      slider_order: 3,
    },
    {
      image: asset(1),
      title: t("Երևանյան Երեկո", "Ереванский вечер", "Yerevan Evening"),
      description: t(
        "Գոռ Բարսեղյանի հետ",
        "С Гором Барсегяном",
        "With Gor Barseghyan",
      ),
      link: VIDEO,
      slider_order: 4,
    },
  ]);
  console.log("sliders");
}

async function seedFaces() {
  await Faces.insertMany([
    {
      image: asset(11),
      firstName: t("Հաղորդավար", "Ведущий", "Host"),
      lastName: t("21TV", "21TV", "21TV"),
      role: t("Հաղորդավար", "Ведущий", "Host"),
      description: t("21TV թիմ", "Команда 21TV", "21TV team"),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
    {
      image: asset(5),
      firstName: t("Կարեն", "Карен", "Karen"),
      lastName: t("Համբարձումյան", "Амбарцумян", "Hambardzumyan"),
      role: t("Հյուր", "Гость", "Guest"),
      description: t("Առանց Փողկապի", "Без галстука", "Without a Tie"),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
    {
      image: asset(2),
      firstName: t("Գագիկ", "Гагик", "Gagik"),
      lastName: t("Շահբազյան", "Шахбазян", "Shahbazyan"),
      role: t("Հյուր", "Гость", "Guest"),
      description: t("Առանց Փողկապի", "Без галстука", "Without a Tie"),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
    {
      image: asset(13),
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
    {
      image: asset(17),
      firstName: t("ԱՐԳԻՇՏԻ", "Аргишти", "Argishti"),
      lastName: t("ԱՐՈՅԱՆ", "Ароян", "Aroyan"),
      role: t("Հյուր", "Гость", "Guest"),
      description: t("Առանց Փողկապի", "Без галстука", "Without a Tie"),
      facebookLink: "https://facebook.com",
      instagramLink: "https://instagram.com",
    },
    {
      image: asset(1),
      firstName: t("Գոռ", "Гор", "Gor"),
      lastName: t("ԲԱՐՍԵՂՅԱՆ", "Барсегян", "Barseghyan"),
      role: t("Հաղորդավար", "Ведущий", "Host"),
      description: t("Երևանյան Երեկո", "Ереванский вечер", "Yerevan Evening"),
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
      name: t("ԵՐԳ ԵՐԳՈՑ ՄԵԾԵՐԸ", "Великие песни", "The Greats of Songs"),
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
    image: asset(8),
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

async function runSeed() {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL missing in .env");
  }
  const assetDir = path.join(__dirname, "..", "public", "images", "assets");
  if (!fs.existsSync(assetDir) || fs.readdirSync(assetDir).length < 10) {
    throw new Error(
      "Content images missing in public/images/assets/. Copy assets there first.",
    );
  }

  console.log(`Image base URL: ${getImageBase()}`);

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

  console.log("\nSeed complete with content images.");
  console.log("Login: asimonyan / 123456");
  await mongoose.disconnect();
}

if (require.main === module) {
  runSeed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runSeed, getImageBase, asset, ASSET_IMAGES };
