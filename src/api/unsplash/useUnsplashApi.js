export function useUnsplashApi() {
    const baseUrl = "https://api.unsplash.com";
    const headers = {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
    };

    async function getPhotos(query) {
        try {
            const url = `${baseUrl}/search/photos?page=1&query=${query}`;
            const response = await fetch(url, { headers });
            const { results = [] } = await response.json();

            return results.map((result) => result.urls.regular);
        } catch (error) {
            console.error(error.message);
            throw new Error(error);
        }
    }

    async function getPhoto(location) {
        try {
            const url = `${baseUrl}/search/photos?page=1&per_page=1&query=${location}`;
            const response = await fetch(url, { headers });
            const { results = [] } = await response.json();
            return results.at(0).urls.thumb;
        } catch (error) {
            console.error(error.message);
            throw new Error(error);
        }
    }

    return { getPhotos, getPhoto };
}
