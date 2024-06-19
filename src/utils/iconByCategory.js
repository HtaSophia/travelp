const iconByCategory = {
    favorite: {
        icon: "heart",
        color: "#FACECE",
        text: "Favorite",
    },
    wantToGo: {
        icon: "flag",
        color: "#69CA83",
        text: "I want to go",
    },
    booked: {
        icon: "suitcase2",
        color: "#6FA5FF",
        text: "Booked",
    },
};

export function getIconByCategory(category) {
    return iconByCategory[category];
}
