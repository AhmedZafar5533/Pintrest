import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAppStore } from "../../store/app-store";

const DeleteModal = () => {
    const { setDeleteModal } = useAppStore()
    return (
        <AnimatePresence>

            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-96 text-center relative"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                >

                    <button
                        onClick={setDeleteModal}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    >
                        <X size={20} />
                    </button>


                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Delete Photo Permanently?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        This action cannot be undone.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <Button
                            variant="outline"
                            className="w-1/2 mr-2"
                            onClick={setDeleteModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-1/2 ml-2"

                        >
                            Delete
                        </Button>
                    </div>
                </motion.div>
            </motion.div>

        </AnimatePresence>
    );
};

export default DeleteModal;
