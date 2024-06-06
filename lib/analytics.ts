import { get, getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";

const updateAnalytics = async () => {
    try {
        const database = getDatabase(app);
        const path = window.location.pathname;
        const isPathVisited = sessionStorage.getItem(path);

        if (isPathVisited) {
            return;
        } 

        sessionStorage.setItem(path, 'true');
        const analyticsRef = ref(database, `frame-the-vision/analytics${path}`);
        const snapshot = await get(analyticsRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            await set(analyticsRef, data + 1);
        } else {
            await set(analyticsRef, 1);
        }
    } catch (error) {
        console.error("Failed to update analytics:", error);
    }
};

export { updateAnalytics };
