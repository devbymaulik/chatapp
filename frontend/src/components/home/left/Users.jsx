import React, { useEffect } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPageUser } from "../../LoadingPage.jsx";
import ErrorPage from "../../ErrorPage";
import { getUser } from "../redux/dispatcher";

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { data, loading, error } = useSelector((state) => state.userReducer);

  if (loading) return <LoadingPageUser />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div
      style={{ maxHeight: "calc(81vh)" }}
      className="overflow-y-auto vertical_scrollbar_hide"
    >
      {data && data.length > 0 ? (
        data.map((user, index) => <User key={user.id || index} user={user} />)
      ) : (
        <p className="text-center text-gray-500 mt-4">No users found</p>
      )}
    </div>
  );
}
