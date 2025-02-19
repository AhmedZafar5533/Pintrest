import { useEffect, useState } from "react";
import Navbar from "@/components/Sidebar/Navbar";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../../store/app-store";
import ImageUploadModal from "@/components/ImageUpload";

import { ArrowUp } from "lucide-react";

export const ProtectedLayout = () => {
    const { isModalOpen } = useAppStore();
    const [showTopButton, setShowTopButton] = useState(false);

    // Show button when user scrolls down
    useEffect(() => {
        const handleScroll = () => {
            setShowTopButton(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="relative min-h-screen">
            <Navbar />
            {isModalOpen && <ImageUploadModal />}
            <div className="main-content">
                <Outlet />
            </div>


            {showTopButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 active:scale-95"
                >
                    <ArrowUp className="text-xl" />
                </button>
            )}
        </div>
    );
};
