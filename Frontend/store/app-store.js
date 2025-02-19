import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
    persist(
        (set, get) => ({
            isModalOpen: false,
            isImageUploading: false,
            settingPreviewEmpty: false,
            imageArray: [],
            fullViewImageinformation: {},
            deleteModalOpen: false,
            currentPage: 1,

            setIsModalOpen: () => {
                set((state) => ({ isModalOpen: !state.isModalOpen }));
            },
            setDeleteModal: () => {
                set((state) => ({ deleteModalOpen: !state.deleteModalOpen }));
            },

            uploadImage: async (base64Image) => {
                try {
                    if (!base64Image) {
                        toast.error("No image provided.");
                        return;
                    }

                    set({ isImageUploading: true, settingPreviewEmpty: false });

                    // Create a timeout promise that rejects after 10 seconds
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(
                            () => reject(new Error("Request timed out")),
                            15000
                        )
                    );

                    // Image upload request
                    const uploadPromise = fetch(
                        "https://pixify-dtpr.onrender.com/api/images/upload/picture",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ image: base64Image }),
                            credentials: "include",
                        }
                    );

                    const response = await Promise.race([
                        uploadPromise,
                        timeoutPromise,
                    ]);

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Upload failed");
                    }

                    toast.success("Image uploaded successfully");
                    set({ settingPreviewEmpty: true });
                } catch (error) {
                    console.error("Upload failed:", error.message);
                    toast.error(error.message);
                } finally {
                    set({ isImageUploading: false });
                }
            },

            fetchOnlineImages: async () => {
                const API_KEY =
                    process.env.IMAGE_API;
                let categories = [
                    "nature",
                    "space",
                    "mountains",
                    "city",
                    "architecture",
                    "technology",
                    "animals",
                    "art",
                    "food",
                    "cars",
                    "travel",
                ];
                let imagesPerCategory = 5;

                try {
                    let page = get().currentPage;
                    let shuffledCategories = [...categories]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 6);

                    const fetchPromises = shuffledCategories.map(
                        async (category) => {
                            const url = `https://api.pexels.com/v1/search?query=${category}&per_page=${imagesPerCategory}&page=${page}`;
                            const response = await fetch(url, {
                                headers: { Authorization: API_KEY },
                            });

                            if (!response.ok)
                                throw new Error(
                                    `Failed to fetch images for ${category}`
                                );

                            const data = await response.json();
                            return data.photos.map((photo) => ({
                                url: photo.src.large,
                                photographer: photo.photographer,
                                photographerProfile: photo.photographer_url,
                                description: photo.alt,
                                id: photo.id,
                            }));
                        }
                    );

                    const newImagesArrays = await Promise.all(fetchPromises);
                    const newImages = newImagesArrays.flat();
                    console.log(newImages);

                    set((state) => ({
                        imageArray: [...state.imageArray, ...newImages],
                        currentPage: state.currentPage + 1,
                    }));

                    return newImages;
                } catch (error) {
                    toast.error("Error fetching images");
                    console.error("Error fetching images:", error);
                }
            },

            loadImageFullView: async (imageDetails) => {
                const cleanUrl = imageDetails.url.split("?")[0];
                console.log(imageDetails);
                set({
                    fullViewImageinformation: {
                        ...imageDetails,
                        imageUrl: cleanUrl,
                    },
                });
            },

            handleDownlaod: async (
                imageUrl,
                imageName = "downloaded-image"
            ) => {
                try {
                    toast.success("Download started...");
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = blobUrl;
                    link.download = `${imageName}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);

                    toast.success("Download complete!");
                } catch (error) {
                    toast.error("Download failed");
                    console.error("Error downloading image:", error);
                }
            },
        }),
        {
            name: "image-info",
            partialize: (state) => ({
                fullViewImageinformation: state.fullViewImageinformation,
            }),
            getStorage: () => localStorage,
        }
    )
);
