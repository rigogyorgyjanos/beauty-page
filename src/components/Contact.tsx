import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Itt jöhet pl. email küldés vagy API hívás
        console.log('Küldött adatok:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="max-w-4xl mx-auto px-5 py-16">
            <h2 className="text-3xl font-semibold mb-10 text-pink-500 text-center">Kapcsolat</h2>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Űrlap */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 bg-white rounded-lg shadow-md p-6"
                    noValidate
                >
                    {submitted && (
                        <p className="mb-4 text-green-600 font-semibold">
                            Köszönjük, üzenetedet elküldtük!
                        </p>
                    )}

                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                        Név
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Teljes név"
                    />

                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                        Email cím
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="email@pelda.hu"
                    />

                    <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                        Üzenet
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full mb-4 px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Írd ide az üzeneted..."
                    />

                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded transition"
                    >
                        Küldés
                    </button>
                </form>

                {/* Elérhetőségek */}
                <div className="flex-1 bg-pink-50 rounded-lg shadow-md p-6 text-gray-700">
                    <h3 className="text-xl font-semibold mb-4 text-pink-600">Elérhetőségeink</h3>
                    <p className="mb-2">
                        <strong>Cím:</strong> 1234 Budapest, Szépség utca 5.
                    </p>
                    <p className="mb-2">
                        <strong>Telefon:</strong> <a href="tel:+36123456789" className="text-pink-500 hover:underline">+36 1 234 5678</a>
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> <a href="mailto:info@beautysaloon.hu" className="text-pink-500 hover:underline">info@beautysaloon.hu</a>
                    </p>
                    <p className="mb-6">
                        <strong>Nyitvatartás:</strong><br />
                        Hétfő - Péntek: 9:00 - 19:00<br />
                        Szombat: 9:00 - 14:00<br />
                        Vasárnap: Zárva
                    </p>

                    {/* Opció: Google Maps beágyazás */}
                    <iframe
                        title="Szalon helye"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.4328602388914!2d19.0399968160805!3d47.49791207918516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc548784faed%3A0x4c8c0e7c99a9a8b!2sSz%C3%A9ps%C3%A9g%20utca%205%2C%20Budapest!5e0!3m2!1shu!2shu!4v1617912950103!5m2!1shu!2shu"
                        width="100%"
                        height="200"
                        className="rounded"
                        loading="lazy"
                        style={{ border: 0 }}
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
