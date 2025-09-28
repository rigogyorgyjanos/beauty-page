// src/components/AboutTeam.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';

import { Navigation, Scrollbar } from 'swiper/modules';

import person from '../assets/images/8ed14048-3d29-49cb-b7b6-8692a4f3dc5b.png';

const teamMembers = [
  {
    name: 'Anna Kovács',
    role: 'Manikűr szakértő',
    photo: person,
    shortDescription: 'Anna több mint 10 éve foglalkozik manikűrrel, precíz és kreatív munkájával elégedett vendégek százait tudhatja maga mögött.',
    longDescription: `Anna a Szépségipari Akadémián szerzett manikűrös képesítést, majd folyamatosan képezte magát körömápolás és díszítés terén. Több nemzetközi tanfolyamon vett részt, ahol a legújabb trendeket és technikákat sajátította el. Szenvedélye a természetes és műköröm stílusok kombinálása, mindig az ügyfél egyedi igényeit tartja szem előtt. Ezen felül részt vett egészségügyi alapismeretek képzésen, hogy a körömápolás során a bőrápolás és higiénia is maximálisan biztosított legyen.`,
  },
  {
    name: 'Eszter Nagy',
    role: 'Pedikűr specialista',
    photo: person,
    shortDescription: 'Eszter szakértelme a pedikűr területén páratlan, mindig figyelmes a vendégek igényeire és a legjobb élményt nyújtja.',
    longDescription: `Eszter a Szépségipari és Egészségügyi Központban végzett pedikűrös képzésen, majd tovább fejlesztette tudását speciális lábápolási technikákban és ortopédiai pedikűrben. Rendszeresen részt vesz szakmai továbbképzéseken, hogy naprakész legyen a legújabb kezelésekkel és eszközökkel kapcsolatban. Különösen fontosnak tartja a prevenciót, így sokat foglalkozik a láb egészségének megőrzésével és a kényelmes, egészséges járás elősegítésével. Vendégei dícsérik türelmét és alapos munkáját.`,
  },
  {
    name: 'Judit Tóth',
    role: 'Masszázs terapeuta',
    photo: person,
    shortDescription: 'Judit finom, de hatékony masszázstechnikáival segít a testi-lelki felfrissülésben minden vendégünknek.',
    longDescription: `Judit a Testmasszázs Iskolában végzett, ahol különféle masszázstechnikákat sajátított el, többek között svéd, relaxációs és gyógyászati masszázst. Képzése során megismerte az anatómia és fiziológia alapjait, hogy munkájával hatékonyan támogassa a test regenerációját és stresszoldását. Több év tapasztalatával egyedileg igazított kezeléseket nyújt, figyelembe véve a vendégek egészségi állapotát és igényeit. Célja, hogy minden masszázs ne csak fizikai, hanem lelki felüdülést is hozzon.`,
  },
];


const AboutTeam: React.FC = () => {
    return (
        <section className="max-w-7xl  mx-auto px-5 py-16">
            <h2 className="text-3xl font-semibold mb-10 text-center text-pink-400">
                Rólunk / Csapat
            </h2>

            <Swiper
                modules={[Navigation, Scrollbar]}
                spaceBetween={30}
                slidesPerView={1}
                className="w-full"
                scrollbar={{ draggable: true }}
                loop

            >
                {teamMembers.map((member, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col md:flex-row items-start gap-8 bg-white rounded-lg shadow-md p-6">
                            {/* Fotó */}
                            <div className="w-full md:w-1/3">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-full h-78 object-cover object-top rounded-md"
                                />
                            </div>

                            {/* Szöveg */}
                            <div className="w-full md:w-2/3">
                                <h3 className="text-2xl font-bold">{member.name}</h3>
                                <p className="text-pink-600 font-semibold">{member.role}</p>
                                <p className="mt-2 text-gray-700">{member.shortDescription}</p>
                                <p className="mt-4 text-sm text-gray-600 text-justify">{member.longDescription}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default AboutTeam;
