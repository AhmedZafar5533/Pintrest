import { useState } from "react";
import { Upload, Check, X, Trash2, Camera, Eye } from "lucide-react";
import { useAppStore } from "../../store/app-store";
import { useAuthStore } from "../../store/auth-store";


const UserProfile = () => {
    const defaultAvatar = "https://api.dicebear.com/7.x/thumbs/svg?seed=SarahParker";
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [tempAvatar, setTempAvatar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { userData, userPictures, } = useAuthStore()
    const { setIsModalOpen, setDeleteModal} = useAppStore()
    console.log(userData)



    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTempAvatar(imageUrl);
            setIsEditing(true);
        }
    };

    const handleSaveAvatar = () => {
        setAvatar(tempAvatar);
        setIsEditing(false);
    };

    const handleDeleteAvatar = () => {
        setAvatar(defaultAvatar);
        setTempAvatar(null);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6 flex justify-center">
            <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 md:mt-5 mt-5">
                <div className="w-full md:w-1/3 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center transition-all hover:shadow-2xl">
                    <div className="relative w-48 h-48">
                        <div className="w-full h-full rounded-2xl border-4 border-purple-100 overflow-hidden">
                            <img
                                src={isEditing ? tempAvatar : avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {!isEditing ? (
                            <label className="absolute -right-2 bottom-2 bg-purple-500 hover:bg-purple-600 p-3 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-105">
                                <Camera size={24} className="text-white" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                            </label>
                        ) : (
                            <div className="absolute -right-2 bottom-2 flex gap-2">
                                <button
                                    onClick={handleSaveAvatar}
                                    className="p-3 bg-green-500 rounded-xl hover:bg-green-600 transition shadow-lg hover:scale-105"
                                >
                                    <Check size={24} className="text-white" />
                                </button>
                                <button
                                    onClick={handleDeleteAvatar}
                                    className="p-3 bg-red-500 rounded-xl hover:bg-red-600 transition shadow-lg hover:scale-105"
                                >
                                    <X size={24} className="text-white" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
                        <p className="text-purple-500 font-medium mt-1">{userData.username}</p>
                        <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full mt-3">
                            <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                            </svg>
                            <span className="text-purple-700">{userData.city + ", " + userData.country}</span>
                        </div>
                    </div>

                    <p className="text-center text-gray-600 mt-6 px-4 leading-relaxed">{userData.bio}</p>

                    <div className="w-full grid grid-cols-3 gap-4 mt-8 md:grid-cols-2">
                        {[
                            { value: userData.followers, label: 'Followers', color: 'from-purple-500 to-purple-400' },
                            { value: userData.likes, label: 'Likes', color: 'from-pink-500 to-pink-400' },
                            { value: userData.following, label: 'Following', color: 'from-blue-500 to-blue-400' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                                <div className={`text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 font-medium mt-1 sm:font-small">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl hover:shadow-lg transition-transform transform hover:scale-[1.02] font-medium text-lg">
                        Follow
                    </button>
                </div>

                <div className="w-full md:w-2/3">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            My Gallery ({userPictures.length})
                        </h2>
                        <button className="flex items-center bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition shadow-md"
                            onClick={setIsModalOpen}>
                            <Upload size={20} className="mr-2" />
                            Upload New
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {userPictures.map((image) => (
                            <div key={image._id} className="relative group rounded-2xl overflow-hidden shadow-lg transition-all hover:-translate-y-1">
                                <img
                                    src={image.imageUrl}
                                    alt="Upload"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition">
                                    <div className="flex items-center space-x-3">
                                        <button className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all hover:scale-105" onClick={setDeleteModal}>
                                            <Trash2 size={20} className="text-white" />
                                        </button>
                                        <button className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all hover:scale-105">
                                            <Eye size={20} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;
