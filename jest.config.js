const jestPreset = require('@testing-library/react-native/jest-preset');

const settings = {
    setupFiles: [/* files not including testing-library ones*/],
    // testMatch: ["**/**/*.(!android|ios|native).test.[jt]s?(x)"],
    // testPathIgnorePatterns: ["/node_modules/"]
}

const nativeSetupFiles = [...jestPreset.setupFiles, ...settings.setupFiles]

const nativeSettings = {
    ...settings,
    setupFiles: nativeSetupFiles,
}

const androidNativeSettings = {
    ...settings,
    setupFiles: nativeSetupFiles,
    // testMatch: ["**/**/*.android.test.[jt]s?(x)", "**/**/*.native.test.[jt]s?(x)"],
    // testPathIgnorePatterns: ["/node_modules/"]
}

module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    haste: {
        "defaultPlatform": "web",
        "platforms": ["android", "ios", "native", "web"]
    },
    projects: [
        { preset: 'jest-expo/web', ...settings },
        { preset: 'jest-expo/ios', ...nativeSettings },
        { preset: 'jest-expo/android', ...androidNativeSettings }
    ]
}