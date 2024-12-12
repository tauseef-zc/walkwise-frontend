"use client";
import { useAuth } from "@/services/app/AuthService";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { clearCredentials } from "@/services/redux/reducers/slices/AuthSlice";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logout } = useAuth();

  useEffect(() => {
    if (loading) {
      logout()
        .then((res) => {
          dispatch(clearCredentials());
        })
        .catch((error) => {
          setLoading(true);
        })
        .finally(() => {
          setLoading(false);
          router.replace("/login");
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="text-center my-5">Logging out...</div>;
};

export default Logout;
