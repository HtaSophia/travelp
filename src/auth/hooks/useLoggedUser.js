import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext";

export function useLoggedUser() {
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();

    useEffect(() => {
        if (currentUser) {
            navigate("/travels");
        }
    });
}
