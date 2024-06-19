const androidConfig = {
    name: "aft-store",
    slug: "aft-store",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "com.bitran.aft",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    ios: {
        supportsTablet: true
    },
    android: {
        package: "com.bitran.aft",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON || './google-services.json',
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff"
        }
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png"
    },
    extra: {
        eas: {
            projectId: "ba1ced79-1a85-47f0-81a9-d5522517e47e"
        }
    },
    plugins: [
        "expo-router",
        "expo-secure-store"
    ],
    experiments: {
        typedRoutes: true
    }
}

export default androidConfig;
