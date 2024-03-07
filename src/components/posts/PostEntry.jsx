import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { actions } from "../../actions/actions";
import AddIcon from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hooks";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";

const PostEntry = ({ post }) => {
    const { state } = useProfile();
    const { dispatch } = usePost();
    const { api } = useAxios();
    const uploaderRef = useRef();
    const { auth } = useAuth();
    const navigate = useNavigate()


    const user = state?.user || auth?.user;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (post) {
            setValue("content", post.content);
        }
    }, [post, setValue]);

    const handleFileUpload = () => {
        const fileInput = uploaderRef.current;
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            console.log("File selected:", file);
            return file;
        }
        return null;
    };

    const handlePostSubmit = async (data) => {
        const formData = new FormData();
        formData.append("content", data.content);
        const file = handleFileUpload();
        if (file) {
            formData.append("image", file);
        }
        console.log("FormData:", formData);
        dispatch({ type: actions.post.DATA_FETCHING });

        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
                formData
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.post.DATA_CREATED,
                    data: response.data,
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    const handleEditSubmit = async (data) => {


        dispatch({ type: actions.post.DATA_FETCHING });
        try {
            const response = await api.patch(`/posts/${post.id}`, data);
            if (response.status === 200) {
                dispatch({ type: actions.post.DATA_EDITED, data: response.data });
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="relative card">
            <h6 className="mb-3 text-lg font-bold text-center lg:text-xl">
                {post ? "Edit Post" : "Create Post"}
            </h6>

            <form onSubmit={handleSubmit(post ? handleEditSubmit : handlePostSubmit)}>
                <div className="flex items-center justify-between gap-2 mb-3 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
                            alt="avatar"
                        />
                        <div>
                            <h6 className="text-lg lg:text-xl">
                                {user?.firstName} {user?.lastName}
                            </h6>
                            <span className="text-sm text-gray-400 lg:text-base">
                                Public
                            </span>
                        </div>
                    </div>

                    <label className="btn-primary cursor-pointer !text-gray-100" htmlFor="photo">
                        <img src={AddIcon} alt="Add Photo" />
                        Add Photo
                        <input type="file" id="photo" ref={uploaderRef} className="hidden" accept="image/*" />
                    </label>
                </div>

                <Field label="" error={errors.content}>
                    <textarea
                        {...register("content", {
                            required: "Adding some text is mandatory!",
                        })}
                        name="content"
                        id="content"
                        placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
                    ></textarea>
                </Field>

                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button
                        type="submit"
                        className="font-bold transition-all auth-input bg-lwsGreen text-deepDark hover:opacity-90"
                    >
                        {post ? "Save" : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEntry;
