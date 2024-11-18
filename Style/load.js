// loadFonts.js
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const fetchFonts = async () => {
    await Font.loadAsync({
        "Anton-Regular": require("../assets/fonts/Anton-Regular.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    });
};

export const loadFonts = async () => {
    await fetchFonts();
    await SplashScreen.hideAsync();
};

export default loadFonts;