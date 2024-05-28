import { get, getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";

const updateAnalytics = async () => {
    const database = getDatabase(app);
    const path = window.location.pathname
    const analyticsRef = ref(database, `frame-the-vision/analytics/${path}`);
    const snapshot = await get(analyticsRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        set(analyticsRef, data + 1);
    } else {
        set(analyticsRef, 1);
    }

}

export { updateAnalytics };