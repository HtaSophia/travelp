import "./Card.css";
import React from "react";
import Badge from "../shared/Badge/Badge";
import { getIconByCategory } from "../../utils/categoryIcons";
import { useUnsplashApi } from "../../api/unsplash/useUnsplashApi";

const Card = ({ title, destination, description, onClick, category }) => {
    const badge = getIconByCategory(category);
    const { getPhoto } = useUnsplashApi();
    const [imgUrl, setImgUrl] = React.useState("https://placehold.co/260x174");

    React.useEffect(() => {
        const fetchPhoto = async () => {
            const photo = await getPhoto(destination);
            setImgUrl(photo);
        };
        fetchPhoto();
    }, []);

    return (
        <div className="card" onClick={onClick}>
            <img src={imgUrl} className="rounded" alt="city image" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <Badge
                    tooltipText={badge.text}
                    backgroundColor={badge.color}
                    icon={badge.icon}
                />
            </div>
        </div>
    );
};

export default Card;
