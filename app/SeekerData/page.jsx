"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SeekerProfilePage = () => {
    const [token, setToken] = useState(null);
    const [searchParams] = useSearchParams();
    const router = useRouter();
    const [seekerData, setSeekerData] = useState(null);
    const seekerId = searchParams[1];

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.back()
        }
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const fetchSeeker = async () => {
            const response = await fetch(`/api/search/seeker/${seekerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();

            setSeekerData(data);
            console.log(data);
        }

        if (token) {
            fetchSeeker();
        }
    }, [token]);


    return (<>Seeker profile description</>)
}

export default SeekerProfilePage;