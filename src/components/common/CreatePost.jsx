
import { useState } from "react";
import { useAuth, useProfile } from "../../hooks";
import PostEntry from "../posts/PostEntry";
const CreatePost = () => {

    const [showPostEntry, setShowEntry] = useState(false)
    const { state } = useProfile()
    const { auth } = useAuth()

    const user = state?.user || auth?.user;

    return (
        <>


            <div className="card">
                {showPostEntry ? (<PostEntry onCreate={() => setShowEntry(false)} />) : (<div className="flex-center mb-3 gap-2 lg:gap-4">
                    <div className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full overflow-hidden">
                        <img
                            className="w-full h-full rounded-full"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar
                                }`}
                            alt="avatar"
                        />
                    </div>

                    <div className="flex-1">
                        <textarea
                            onClick={() => setShowEntry(true)}
                            className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                            name="post"
                            id="post"
                            placeholder="What's on your mind?"

                        ></textarea>
                    </div>
                </div>)}

            </div>

        </>
    );
};

export default CreatePost;