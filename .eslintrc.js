module.exports = {
    parser: 'vue-eslint-parser',
    env: {
        browser: true,
        node: true,
        jest: true
    },
    extends: [
        // vue
        //'plugin:vue/vue3-essential', // Lv1
        'plugin:vue/vue3-strongly-recommended', // Lv2
        //'plugin:vue/vue3-recommended', // Lv3

        // js
        'eslint:recommended'
    ],
    parserOptions: {
        
    },
    rules: {
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always",
                "normal": "never",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/script-indent": ["error", 2, { 
            "baseIndent": 0 
        }],
        'vue/multi-word-component-names': 'off'
    },
    "overrides": [
        {
          "files": ["*.vue"],
          "rules": {
            "indent": "off"
          }
        }
      ]   
}