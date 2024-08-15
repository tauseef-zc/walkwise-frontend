"use client";
import { useAuth } from "@/services/app/AuthService";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { clearCredentials } from "@/services/redux/reducers/slices/AuthSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

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
        });
    }
  }, []);

  return <div className="text-center my-5">Logging out...</div>;
};

export default Logout;
