import React, { useEffect, useState } from 'react';
import person from '../assets/images/8ed14048-3d29-49cb-b7b6-8692a4f3dc5b.png';
interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Booking {
    member: string;
    slot: string; // ISO string, pl. '2025-09-30T09:00'
    customerName: string;
    customerPhone: string;
    customerEmail: string;
}

const teamMembers = [
    { name: 'Anna Kovács', role: 'Manikűr', photo: person },
    { name: 'Eszter Nagy', role: 'Pedikűr', photo: person },
    { name: 'Judit Tóth', role: 'Masszázs', photo: person },
];
const initialBookings: Booking[] = [
    {
        member: 'Anna Kovács',
        slot: '2025-09-28T09:00',
        customerName: 'Régi Vendég',
        customerPhone: '06301234567',
        customerEmail: 'vendeg1@example.com',
    },
    {
        member: 'Judit Tóth',
        slot: '2025-09-29T13:00',
        customerName: 'Régi Vendég 2',
        customerPhone: '06307654321',
        customerEmail: 'vendeg2@example.com',
    },
    {
        member: 'Eszter Nagy',
        slot: '2025-09-30T10:00',
        customerName: 'Régi Vendég 3',
        customerPhone: '06309876543',
        customerEmail: 'vendeg3@example.com',
    },
];


// Időpontok (óra-perc része egységes, dátumra filterezünk majd)
const timeSlots = ['09:00', '10:00', '11:30', '13:00', '14:00', '15:30', '16:30', '17:00'];

const STORAGE_KEY = 'bookingData';

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const [visible, setVisible] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
    });
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        console.log('LocalStorageból olvas:', saved);

        if (!saved || saved === '[]') {
            console.log('Nincs adat a storage-ban, feltöltöm initialBookings-szel');
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBookings));
        }

        const afterSet = localStorage.getItem(STORAGE_KEY);
        console.log('LocalStorage tartalom az írás után:', afterSet);

        setBookings(JSON.parse(afterSet || '[]'));
    }, []);


    // Betöltjük a LocalStorage-ből a foglalásokat
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setBookings(JSON.parse(saved));
        }
    }, []);



    // Modal megnyitás animáció
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setVisible(true), 10);
            // reset state
            setSelectedMembers([]);
            setSelectedSlot(null);
            setFormData({ customerName: '', customerPhone: '', customerEmail: '' });
            setFormError(null);
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    // Frissítjük a LocalStorage-t, ha változik a foglalás lista
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    }, [bookings]);

    // Kiválasztott team member toggle
    const toggleMember = (member: string) => {
        setSelectedMembers((prev) =>
            prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]
        );
        setSelectedSlot(null);
        setFormError(null);
    };

    // Egy adott időpont és dátum foglalt-e bármelyik kiválasztott team membernél?
    const isSlotAvailableForAll = (date: string, time: string) => {
        if (selectedMembers.length === 0) return false;

        // Készítsük össze a datetime ISO stringet pl: '2025-09-30T09:00'
        const dateTimeISO = `${date}T${time}`;

        // Ellenőrizzük, hogy van-e foglalás az adott dátum-idő + member kombóra
        return selectedMembers.every((member) => {
            return !bookings.some(
                (b) => b.member === member && b.slot === dateTimeISO
            );
        });
    };

    // Form mezők kezelése
    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError(null);
    };

    // Foglalás elküldése
    const handleBooking = () => {
        if (!selectedSlot) {
            setFormError('Kérlek válassz időpontot!');
            return;
        }
        if (selectedMembers.length === 0) {
            setFormError('Kérlek válassz legalább egy szakembert!');
            return;
        }
        const { customerName, customerPhone, customerEmail } = formData;
        if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
            setFormError('Kérlek töltsd ki az összes adatot!');
            return;
        }
        // Egyszerű email validáció (lehet tovább fejleszteni)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            setFormError('Érvényes email címet adj meg!');
            return;
        }

        // Ellenőrizze még egyszer, hogy az időpont tényleg szabad-e
        const conflict = selectedMembers.some((member) =>
            bookings.some((b) => b.member === member && b.slot === selectedSlot)
        );
        if (conflict) {
            setFormError('Az egyik szakembernél már foglalt időpont!');
            return;
        }

        // Új foglalások felvétele (minden kiválasztott szakemberhez)
        const newBookings: Booking[] = selectedMembers.map((member) => ({
            member,
            slot: selectedSlot,
            customerName,
            customerPhone,
            customerEmail,
        }));

        setBookings((prev) => [...prev, ...newBookings]);

        alert(
            `Sikeres foglalás:\n${newBookings
                .map(
                    (b) =>
                        `• ${b.member} - ${new Date(b.slot).toLocaleDateString('hu-HU')} ${new Date(
                            b.slot
                        ).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}`
                )
                .join('\n')}`
        );

        onClose();
    };

    // Napválasztó - alapból az elkövetkező 7 nap
    const daysToShow = 7;
    const days: string[] = [];
    for (let i = 0; i < daysToShow; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        days.push(d.toISOString().slice(0, 10));
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black transition-all duration-300 ${visible ? 'bg-opacity-40 backdrop-blur-sm' : 'bg-opacity-0 backdrop-blur-0'
                    }`}
            />
            <div
                className={`relative z-50 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-pink-500">Időpontfoglalás</h2>

                {/* 1. TeamMember kiválasztás */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Válassz szakember(eke)t:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                        {teamMembers.map((member) => (
                            <label
                                key={member.name}
                                className={`border rounded p-2 flex items-center gap-2 cursor-pointer transition ${selectedMembers.includes(member.name)
                                    ? 'border-pink-500 bg-pink-50'
                                    : 'hover:border-pink-300'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="accent-pink-500"
                                    checked={selectedMembers.includes(member.name)}
                                    onChange={() => toggleMember(member.name)}
                                />
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-gray-600">{member.role}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 2. Nap kiválasztása */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Válassz napot:</label>
                    <div className="flex gap-2 overflow-x-auto">
                        {days.map((day) => {
                            const isSelected = day === selectedDate;
                            const dayObj = new Date(day);
                            const weekday = dayObj.toLocaleDateString('hu-HU', { weekday: 'short' });
                            const dayNum = dayObj.getDate();

                            return (
                                <button
                                    key={day}
                                    className={`px-3 py-1 rounded border transition ${isSelected
                                        ? 'bg-pink-500 text-white'
                                        : 'hover:bg-pink-100 border-pink-300 text-gray-800'
                                        }`}
                                    onClick={() => {
                                        setSelectedDate(day);
                                        setSelectedSlot(null);
                                        setFormError(null);
                                    }}
                                >
                                    <div className="text-sm font-semibold">{weekday}</div>
                                    <div className="text-lg">{dayNum}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Időpont választás */}
                {selectedMembers.length > 0 && (
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Válassz időpontot:</label>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => {
                                const available = isSlotAvailableForAll(selectedDate, time);
                                const dateTimeISO = `${selectedDate}T${time}`;
                                const selected = selectedSlot === dateTimeISO;

                                return (
                                    <button
                                        key={time}
                                        disabled={!available}
                                        onClick={() => {
                                            setSelectedSlot(dateTimeISO);
                                            setFormError(null);
                                        }}
                                        className={`p-2 rounded border text-sm text-center transition
                                            ${!available ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
                                            ${selected ? 'bg-pink-500 text-white border-pink-500' : 'hover:bg-pink-100 border-pink-300 text-gray-800'}
                                        `}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 4. Ügyfél adatok bekérése */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Add meg az adataidat:</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={onChangeForm}
                        placeholder="Teljes név"
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={onChangeForm}
                        placeholder="Telefonszám"
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={onChangeForm}
                        placeholder="Email cím"
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Hibaüzenet */}
                {formError && (
                    <p className="text-red-600 mb-4 font-semibold">{formError}</p>
                )}

                <button
                    onClick={handleBooking}
                    disabled={!selectedSlot || selectedMembers.length === 0}
                    className={`w-full py-2 rounded text-white font-semibold transition ${!selectedSlot || selectedMembers.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-pink-500 hover:bg-pink-600'
                        }`}
                >
                    Foglalás
                </button>
            </div>
        </div>
    );
};

export default BookingModal;
