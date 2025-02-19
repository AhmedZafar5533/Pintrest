import { useState, useEffect } from 'react';
import { ImageIcon, Upload, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '../../store/app-store';
import { toast } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import Loader from './Loader';
import { useAuthStore } from '../../store/auth-store';


const ImageUploadModal = () => {
    const { setIsModalOpen, uploadImage, isImageUploading, settingPreviewEmpty } = useAppStore();
    const { authenticationStatus } = useAuthStore()
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [base64String, setBase64String] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    useEffect(() => {
        console.log("settingPreviewEmpty", settingPreviewEmpty);
        if (settingPreviewEmpty) {
            setPreview(null);
            setBase64String(null);
        }
    }, [settingPreviewEmpty]);

    const toBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.onload = () => callback(reader.result);
        reader.onerror = () => toast.error("Error reading file.");
        reader.readAsDataURL(file);
    };

    const processImage = async (file) => {
        if (!file.type.startsWith('image/'))
            return toast.error("Invalid file type. Please select an image.");
        if (file.size > 5 * 1024 * 1024)
            return toast.error("Image size exceeds the limit of 5MB.");

        try {
            setPreview(URL.createObjectURL(file));
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            const compressedFile = await imageCompression(file, options);

            toBase64(compressedFile, setBase64String);
        } catch (error) {
            console.error("Error processing image:", error);
            toast.error("Error uploading image.");
        }
    };

    const handleFileSelect = (e) => processImage(e.target.files[0]);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processImage(e.dataTransfer.files[0]);
    };


    const handleUpload = async () => {
        if (!authenticationStatus) {
            toast.error("Please login to upload images.");
            return
        }
        if (!base64String) return toast.error("No image selected for upload.");
        await uploadImage(base64String);
    };

    return (
        <>
            {isImageUploading ? <Loader /> :
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 z-50 overflow-hidden">
                    <Card className="w-full max-w-4xl mx-auto shadow-2xl bg-white/95 backdrop-blur-md relative border border-white/20 md:mx-10 rounded-2xl overflow-hidden">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-red-50 border border-white/20 rounded-full text-gray-600 hover:text-red-600 transition-all shadow-sm hover:shadow-md">
                            <X size={20} />
                        </button>

                        <CardHeader className="space-y-1 px-8 pt-10">
                            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Share Your Creativity
                            </CardTitle>
                            <p className="text-center text-gray-500 text-m mt-2">Upload and showcase your visual masterpiece</p>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-6">
                                <div className="relative group">
                                    {preview ? (
                                        <>
                                            <img src={preview} alt="Preview" className="w-full h-96 object-cover rounded-xl shadow-xl border border-gray-200" />
                                            <button onClick={() => setPreview(null)} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-all shadow-md">
                                                <X size={18} />
                                            </button>
                                            <button className="mt-4 bg-purple-500 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg flex md:ml-2" onClick={handleUpload}>
                                                <ImageIcon size={20} />
                                                <span className="ml-2">Upload</span>
                                            </button>
                                        </>
                                    ) : (
                                        <label
                                            onDragOver={(e) => (e.preventDefault(), setIsDragging(true))}
                                            onDragLeave={() => setIsDragging(false)}
                                            onDrop={handleDrop}
                                            className={`flex flex-col items-center justify-center w-full h-96 border-4 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50 scale-105 shadow-inner' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'}`}
                                        >
                                            <Upload className="w-14 h-14 text-gray-400 transition-all group-hover:text-blue-500" />
                                            <p className="text-lg font-semibold text-gray-700 mt-2">{isDragging ? 'Drop to upload' : 'Drag & drop image'}</p>
                                            <p className="text-sm text-gray-500">or click to select</p>
                                            <p className="text-xs text-gray-400 mt-2">JPEG, PNG, WEBP supported</p>
                                            <input type="file" className="hidden" onChange={handleFileSelect} accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            }
        </>
    );
};

export default ImageUploadModal;
