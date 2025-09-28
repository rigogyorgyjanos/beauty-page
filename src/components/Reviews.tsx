// src/components/Reviews.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const reviews = [
    {
        name: 'Kovács Andrea',
        rating: 5,
        date: '2025. augusztus',
        comment: 'Anna munkája tökéletes, a körmeim még 3 hét után is hibátlanok! A szalon nagyon tiszta és barátságos. Csak ajánlani tudom!',
    },
    {
        name: 'Tóth Gábor',
        rating: 5,
        date: '2025. július',
        comment: 'Kiváló masszázsélmény! Judit figyelmes, nyugodt, és pontosan tudja, mit csinál. Egy órával később új emberként léptem ki az ajtón.',
    },
    {
        name: 'Szalai Petra',
        rating: 5,
        date: '2025. június',
        comment: 'Nagyon professzionális pedikűr szolgáltatás! Eszter türelmes és alapos, és végre fájdalom nélkül tudok járni.',
    },
    {
        name: 'Németh Bence',
        rating: 5,
        date: '2025. július',
        comment: 'Tiszta, igényes környezet, kedves személyzet, profi kiszolgálás. Minden részletre odafigyelnek!',
    },
];

const Reviews: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50 px-5" id="reviews">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10 text-pink-500">Vendégeink véleménye</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="bg-white shadow-lg rounded-lg p-6 text-left hover:shadow-xl transition duration-300 ease-in-out"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
                                <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-3 text-pink-500">
                                {Array(review.rating)
                                    .fill(0)
                                    .map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
