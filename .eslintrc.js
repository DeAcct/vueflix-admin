module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
  ],
  rules: {
    "vue/no-unused-vars": "error",
  },
};
