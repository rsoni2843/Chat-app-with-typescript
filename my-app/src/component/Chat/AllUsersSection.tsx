import React, { FC, useState, useEffect } from "react";
import { getAllUsers } from "./../../Redux/Chat/chat.action";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
const AllUsersSection: FC = () => {
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((store) => store.chat);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user") as string);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers(loggedUser));
  }, [dispatch, loggedUser]);
  return (
    <>
      <div className="w-2/5 overflow-scroll m-auto border-2 h-full border-white border-solid">
        {allUsers?.map((el, i) => {
          return (
            <div>
              <p>{el?.username}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllUsersSection;
