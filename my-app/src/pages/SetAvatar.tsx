import loader from "../assets/loading.svg";
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { toastFeatures } from "../component/Register/registerType";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import { getCurrentUser } from "../Redux/Chat/chat.action";

const SetAvatar: FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((store) => store.chat);
  const [avatar, setAvatar] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const loggedUser = localStorage.getItem("logged_user");
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(
    undefined
  );

  // If user is not logged in will redirect to login page else will get the currentUser information

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      dispatch(getCurrentUser(loggedUser));
    }
  }, [loggedUser, dispatch, navigate]);

  // If users avatar image is not set it will redirect to avatar page
  useEffect(() => {
    if (userInfo?.isAvatarImageSet) {
      console.log(userInfo);
      navigate("/");
    }
  }, [userInfo, navigate]);

  const setProfilePic = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastFeatures);
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("logged_user") as string);
        console.log(user);
        const { data } = await axios.post(
          `https://chat-app-backend-builded-3ni5.vercel.app/user/setAvatar/${user}`,
          {
            image: avatar[selectedAvatar],
          }
        );
        console.log(data);
        if (data.isSet) {
          navigate("/");
        } else {
          toast.error("Error setting the avatar", toastFeatures);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  //   console.log(avatar[]);
  async function getAvatar() {
    const data: string[] = [];
    for (let i = 0; i < 5; i++) {
      const image = await axios.get(
        `https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`
      );
      //   console.log(img);
      const buffer = new Buffer(image.data);
      //   console.log(buffer);
      data.push(buffer.toString("base64"));
    }
    setAvatar(data);
    setLoading(false);
  }

  useEffect(() => {
    getAvatar();
  }, [avatar]);

  if (loading) {
    return (
      <div>
        <img className="loader w-100 m-auto" src={loader} alt="loadingImg" />
      </div>
    );
  }
  return (
    <>
      <div className="mt-16 text-xl">
        <h1>Pick an avatar for your profile picture</h1>
      </div>
      <div className="bg-formBg  mt-6 m-auto w-1/2 p-4 rounded-xl">
        <div className="flex  justify-center gap-8">
          {avatar?.map((el, i) => {
            return (
              <div
                className={
                  selectedAvatar === i
                    ? "  border-solid border-4 border-white  rounded-full transition-all duration-100  ease-in-out "
                    : ""
                }
                key={i}
              >
                <img
                  className="h-24"
                  onClick={() => setSelectedAvatar(i)}
                  src={`data:image/svg+xml;base64,${el}`}
                  alt="avatar"
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={setProfilePic}
          type="submit"
          className="mt-4 hover:bg-primary bg-tertiary rounded-lg p-2"
        >
          Set as Avatar
        </button>
      </div>
      <ToastContainer />
    </>
  );
};
export default SetAvatar;
