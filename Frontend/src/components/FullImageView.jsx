import { useEffect, useState } from 'react';
import {
    Heart,
    Download,
    Bookmark,
    Film,
    Calendar,
    MessageSquare,
    Share2,
    SendIcon
} from 'lucide-react';
import MasonryLayout from './Mansory';
import { useAppStore } from '../../store/app-store';

const ImageViewPage = () => {
    const [liked, setLiked] = useState(false);
    const { fullViewImageinformation, handleDownlaod } = useAppStore()
    const [imageLoaded, setImageLoaded] = useState(false);
    const downloadImage = () => {
        handleDownlaod(fullViewImageinformation?.url, fullViewImageinformation?.description)

    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    })
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Mobile Layout */}
                <div className="block lg:hidden space-y-8">
                    {/* Image with Spinner */}
                    <div className="relative w-full max-w-full group overflow-hidden shadow-2xl">
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            </div>
                        )}
                        <img
                            src={fullViewImageinformation?.imageUrl}
                            alt={fullViewImageinformation?.description}
                            className={`w-full h-[80vh] object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0 blur-md'
                                }`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    <InfoPanel liked={liked} setLiked={setLiked} downloadImage={downloadImage} fullViewImageinformation={fullViewImageinformation} />
                    <CommentsSection />
                    <MasonryLayout />
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-[1fr,400px] gap-8">
                    <div className="space-y-8">
                        <div className="relative group rounded-3xl overflow-hidden shadow-2xl flex justify-center">
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                                    <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                src={fullViewImageinformation?.imageUrl}
                                alt={fullViewImageinformation?.description}
                                className={`w-auto h-auto max-h-svh object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0 blur-md'
                                    }`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                        <CommentsSection />
                        <MasonryLayout />
                    </div>

                    {/* Right Column - Sticky Info Panel */}
                    <div className="sticky top-8 h-fit">
                        <InfoPanel liked={liked} setLiked={setLiked} downloadImage={downloadImage} fullViewImageinformation={fullViewImageinformation} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Info Panel Component
const InfoPanel = ({ liked, setLiked, downloadImage, fullViewImageinformation }) => {

    return (
        < div className="space-y-6" >
            {/* Stats Row */}
            < div className="bg-white rounded-2xl p-6 shadow-sm space-y-4 " >
                {/* Action Buttons */}
                < div className="flex items-center md:justify-between md:gap-4 justify-center gap-8" >
                    <button
                        onClick={() => setLiked(!liked)}
                        className="flex items-center gap-2 px-6 py-2 rounded-full border hover:bg-gray-50"
                    >
                        <Heart
                            className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                        <span>59</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 rounded-full border hover:bg-gray-50">
                        <Bookmark className="h-5 w-5 fill-red-950" />
                        <span>Save</span>
                    </button>
                    <button className="flex items-center gap-2 p-2 rounded-full border hover:bg-gray-50">
                        <MessageSquare className="h-5 w-5" />
                    </button>
                    <button className="flex items-center gap-2 p-2 rounded-full border hover:bg-gray-50">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div >

                {/* Stats */}
                < div className="space-y-2" >
                    <div className="flex justify-between text-gray-600">
                        <span>Views</span>
                        <span className="font-medium">3,969</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Downloads</span>
                        <span className="font-medium">2,390</span>
                    </div>
                </div >

                <button className="w-full py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex justify-center gap-2"
                    onClick={() => {
                        console.log("downlaod button clicked")
                        downloadImage()
                    }}>
                    <Download></Download>
                    Download
                </button>
            </div >

            {/* Creator Info */}
            < div className="bg-white rounded-2xl p-6 shadow-sm space-y-4" >
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div>
                        <h3 className="font-bold text-gray-800">{fullViewImageinformation?.photographer}</h3>
                        <p className="text-sm text-gray-500">434 followers</p>
                    </div>
                    <button className="ml-auto px-4 py-2 rounded-full border font-medium hover:bg-gray-50">
                        Follow
                    </button>
                </div>
                <p className="text-gray-600">{fullViewImageinformation?.description}</p>

            </div >

            {/* Technical Details */}
            < div className="bg-white rounded-2xl p-6 shadow-sm" >
                <div className="grid grid-cols-2 gap-4">

                    <DetailItem icon={Film} title="Media Type" value="JPG" />

                    <DetailItem icon={Calendar} title="Published" value="October 22, 2019" />
                </div>
            </div >
        </div >
    )
};

// Comments Section Component
const CommentsSection = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-gray-800">Comments</h3>

        <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-grow flex gap-2">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className='w-10  flex justify-center items-center rounded-3xl p-2 bg-red-600'><SendIcon className='text-white'></SendIcon></button>
            </div>
        </div>

        {/* Sample Comments */}
        {[1, 2, 3].map((comment) => (
            <div key={comment} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div>
                    <p className="font-medium text-gray-800">User {comment}</p>
                    <p className="text-gray-600">Beautiful capture! Love the composition.</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <button>Like</button>
                        <button>Reply</button>
                        <span>2d ago</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// Reusable detail component
const DetailItem = ({ icon: Icon, title, value }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
            <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

export default ImageViewPage;