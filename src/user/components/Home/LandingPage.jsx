import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {IdolContext} from "../ContextApi/IdolContext";
import IdolCard from "../Container/IdolCard";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";

function Home() {
    const {idolList} = useContext(IdolContext);

    const slides = [
        {
            image: "Hero.jpeg",
            title: "Welcome to the Ganesh Museum",
            description: "Discover the Rich Culture and Heritage of Lord Ganesh",
        },
        {
            image: "idol1.webp",
            title: "Explore the Artistic Heritage",
            description: "Marvel at centuries of intricate idol craftsmanship",
        },
        {
            image: "idol2.jpg",
            title: "Celebrate Ganesh Chaturthi",
            description: "Join the grand festival of devotion and art",
        },
    ];

    return (
        <div>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{clickable: true}}
                autoplay={{delay: 4000, disableOnInteraction: false}}
                loop={true}
                className="h-screen">
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <section
                            className="relative bg-cover bg-center h-screen flex items-center justify-center"
                            style={{backgroundImage: `url(${slide.image})`}}>
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="relative text-center text-white px-6">
                                <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="mt-4 text-lg md:text-xl drop-shadow-md">
                                    {slide.description}
                                </p>
                                <Link
                                    to="/explore"
                                    className="mt-6 inline-block px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg transition duration-300 hover:bg-orange-600">
                                    Explore Now
                                </Link>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>

            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-8">Our Idols</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {idolList?.slice(0, 3).map((idol) => (
                            <div
                                key={idol.id}
                                className="card bg-white shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={idol.thumbnail?.image_url}
                                    alt={idol.title}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold">{idol.title}</h3>
                                    <p className="mt-2 text-gray-600">
                                        {idol.description.split(" ").slice(0, 20).join(" ")}...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* See More Button */}
                    <div className="text-center mt-8">
                        <Link
                            to="/explore"
                            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg">
                            See More
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-100" id="exhibits">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold">Featured Exhibits</h2>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">The Origins of Ganesh</h3>
                            <p className="mt-2 text-gray-600">
                                Ganesh, created by Goddess Parvati and later given an elephant head by
                                Lord Shiva, symbolizes wisdom and strength. Revered as the ‘Remover of
                                Obstacles,’ he is worshipped before new beginnings. His influence extends
                                beyond India, with cultural adaptations in Thailand, Nepal, and more.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">
                                Artistic Representations of Ganesh
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Ganesh is depicted in various forms, from traditional Indian statues to
                                contemporary art. Each piece reflects unique symbolism, such as his
                                elephant head for wisdom and his multiple arms for power. His imagery
                                varies globally, with styles influenced by local cultures in Nepal,
                                Thailand, and beyond.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">Festivals Celebrating Ganesh</h3>
                            <p className="mt-2 text-gray-600">
                                The grand festival of Ganesh Chaturthi celebrates Ganesh’s birth with
                                vibrant processions, music, and dancing. Devotees create elaborate clay
                                idols of Ganesh, which are immersed in water to symbolize renewal.
                                Celebrations span India and other regions, showcasing diverse cultural
                                traditions and reverence for Ganesh.
                            </p>
                        </div>
                    </div>
                    <Link
                        href="#all-exhibits"
                        className="mt-6 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg">
                        View All Exhibits
                    </Link>
                </div>
            </section>

            <section className="py-20 bg-gray-100" id="events">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold">Upcoming Events</h2>
                    <div className="mt-10">
                        <h3 className="text-xl font-semibold">Ganesh Chaturthi Celebration</h3>
                        <p>Date and Details</p>
                        <h3 className="text-xl font-semibold mt-4">
                            Art Workshop: Crafting Ganesh Statues
                        </h3>
                        <p>Date and Details</p>
                        <Link
                            href="#all-events"
                            className="mt-6 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg">
                            See All Events
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white" id="testimonials">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold">Testimonials</h2>
                    <div className="mt-10">
                        <p className="italic">
                            “A beautiful tribute to Lord Ganesh! The exhibits are enlightening.”
                        </p>
                        <p className="italic mt-4">
                            “A must-visit for anyone interested in culture and art!”
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-100" id="newsletter">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold">Stay Updated!</h2>
                    <p className="mt-4">
                        Subscribe to our newsletter for the latest news and events.
                    </p>
                    <div className="mt-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-l-lg border border-gray-300"
                        />
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-r-lg">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
