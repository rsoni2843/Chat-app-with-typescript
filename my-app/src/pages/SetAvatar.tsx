import loader from "../assets/loading.svg";
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { toastFeatures } from "../component/Register/registerType";
import { ToastContainer, toast } from "react-toastify";

const SetAvatar: FC = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (!localStorage.getItem("logged_user")) {
      navigate("/login");
    }
  }, []);

  const setProfilePic = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastFeatures);
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("logged_user") as string);
        console.log(user);
        const { data } = await axios.post(
          `http://localhost:5000/user/setAvatar/${user}`,
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
    const data = [];
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
