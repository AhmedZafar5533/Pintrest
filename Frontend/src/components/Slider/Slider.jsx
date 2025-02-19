import { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

const CreativeSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const slides = [
        {
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s",
            title: "Adventures in Nature",
            description: "Discover the hidden wonders of the natural world",
            accent: "from-emerald-500 to-teal-500"
        },
        {
            id: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s",
            title: "Urban Exploration",
            description: "Navigate through city landscapes and architecture",
            accent: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s",
            title: "Ocean Dreams",
            description: "Dive into the mysteries of the deep blue",
            accent: "from-blue-500 to-indigo-500"
        },
        {
            id: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s",
            title: "Mountain Peaks",
            description: "Reach new heights in your journey",
            accent: "from-orange-500 to-red-500"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000);

        return () => clearInterval(timer);
    }, [currentSlide]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleNext = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsAnimating(false), 750);
        }
    };



    return (
        <div className="relative z-40">
            <div className="w-100 h-[90vh] relative overflow-hidden mt-2 z-[5] ">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                    }}
                    onMouseMove={handleMouseMove}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    {slides.map((slide, index) => {
                        const isActive = index === currentSlide;
                        const isPrev = (index === currentSlide - 1) || (currentSlide === 0 && index === slides.length - 1);
                        const isNext = (index === currentSlide + 1) || (currentSlide === slides.length - 1 && index === 0);

                        return (
                            <div
                                key={slide.id}
                                className={`absolute w-full h-full transition-all duration-1000 ease-out
                ${isActive ? 'opacity-100 scale-100 ' : 'opacity-0 scale-95 '}
                ${isPrev ? '-translate-x-full rotate-12' : ''}
                ${isNext ? 'translate-x-full -rotate-12' : ''}
              `}
                            >
                                {/* Image Container */}
                                <div className="absolute inset-0 px-4">
                                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-full h-full object-cover transform scale-110 transition-transform duration-[2000ms]"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} mix-blend-multiply opacity-40`} />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-12">
                                    <div className={`w-full max-w-4xl mx-auto text-center transition-all duration-1000 delay-300
                  ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                                        <h2 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                            {slide.title}
                                        </h2>
                                        <p className="text-xl text-white/90 mb-8">{slide.description}</p>
                                        <div className="flex items-center justify-center gap-4">
                                            <button className={`px-8 py-3 rounded-full bg-gradient-to-r ${slide.accent} text-white font-medium
                      transform hover:scale-105 transition-all hover:shadow-lg hover:shadow-white/20 cursor-pointer`}>
                                                Explore More
                                            </button>
                                            <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur text-white font-medium
                      transform hover:scale-105 transition-all border border-white/30 hover:bg-white/20 cursor-pointer">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => !isAnimating && setCurrentSlide(index)}
                            className={`group relative p-3 transition-all cursor-pointer ${isAnimating ? 'pointer-events-none' : ''}`}
                        >
                            <Circle
                                className={`w-2 h-2 transition-all duration-500
                ${currentSlide === index ? 'text-white scale-150' : 'text-white/40 scale-100'}
                group-hover:text-white group-hover:scale-125
              `}
                            />
                            <div className={`absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 
              transform scale-0 group-hover:scale-100 transition-all duration-300`}
                            />
                        </button>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default CreativeSlider;