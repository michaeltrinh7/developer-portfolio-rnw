module.exports = {
    // Choose from universe/native, universe/node, universe/web
    extends: ['universe/native', "universe/web"],
    settings: {
        'import/ignore': ['react-native'],
    },
    rules: {
        "no-restricted-imports": ["error", {
            "patterns": [{
                "group": ["@expo/html-elements"],
                "message": "Use `./modules/ui/core/HtmlElements` instead of '@expo/html-elements'"
            }]
        }]
    }
};