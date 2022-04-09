import 'dotenv/config';

export default {
  expo: {
    name: 'Super Manager',
    slug: 'Super-Manager',
    version: '1.0.0',
    orientation: 'default',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#88b4d5',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: "com.evgeniyKrishtopa.SuperManager",
      buildNumber: "1.0.0",
      supportsTablet: true,
    },
    android: {
      package: "com.evgeniyKrishtopa.SuperManager",
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#88b4d5',
      },
    },
    web: {
      favicon: './assets/icon.png',
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
