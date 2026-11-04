const ICONS = [{"kebab": "menu", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Navigation-Menu--Streamline-Ultimate\">\n  <desc>\n    Navigation Menu Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m2.25 18.003 19.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m2.25 12.003 19.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m2.25 6.003 19.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M1.5 2.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 10.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 18.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/></g></svg>"}, {"kebab": "search", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Search--Streamline-Ultimate\">\n  <desc>\n    Search Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M1.4720451262 13.356970375A9.063 9.063 0 1 0 18.154024235 6.267298379a9.063 9.063 0 1 0 -16.6819791088 7.089671996Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m16.221 16.22 7.029 7.03\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"m23.42 20.6-5.06-5.12a10 10 0 1 0-2.81 2.84l5 5.09a2 2 0 0 0 2.83 0 2 2 0 0 0 .04-2.81ZM10 1.76A8.25 8.25 0 1 1 1.75 10 8.26 8.26 0 0 1 10 1.76Z\" fill=\"#000000\"/><path d=\"M3.25 10.01a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 1 0-13.5 0\" fill=\"#000000\"/></g></svg>"}, {"kebab": "arrow-left", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Arrow-Left--Streamline-Ultimate\">\n  <desc>\n    Arrow Left Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.25 12 0.75 12\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M11.25 1.5 0.75 12l10.5 10.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.548 10.561H5.437a.251.251 0 0 1-.165-.438l8.637-7.6a1.44 1.44 0 0 0-1.9-2.162L.828 10.2a2.4 2.4 0 0 0 0 3.6l11.179 9.837a1.44 1.44 0 0 0 1.9-2.161l-8.637-7.6a.251.251 0 0 1 .165-.438h17.113a1.44 1.44 0 0 0 0-2.879Z\" fill=\"#000000\"/></svg>"}, {"kebab": "arrow-right", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Arrow-Right--Streamline-Ultimate\">\n  <desc>\n    Arrow Right Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m0.75 12 22.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M12.75 22.5 23.25 12 12.75 1.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.987 12a2.411 2.411 0 0 0-.814-1.8L11.994.361a1.44 1.44 0 0 0-1.9 2.162l8.637 7.6a.25.25 0 0 1-.165.437H1.452a1.44 1.44 0 0 0 0 2.88h17.111a.251.251 0 0 1 .165.438l-8.637 7.6a1.44 1.44 0 1 0 1.9 2.161L23.172 13.8a2.409 2.409 0 0 0 .815-1.8Z\" fill=\"#000000\"/></svg>"}, {"kebab": "chevron-down", "category": "Navigation", "regularSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Arrow-Down-1--Streamline-Ultimate\">\n  <desc>\n    Arrow Down 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.25 7.311 12.53 18.03c-0.0696 0.0697 -0.1522 0.1249 -0.2431 0.1626 -0.091 0.0378 -0.1885 0.0572 -0.2869 0.0572 -0.0984 0 -0.1959 -0.0194 -0.2869 -0.0572 -0.0909 -0.0377 -0.1735 -0.0929 -0.2431 -0.1626L0.75 7.311\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 19.5c-.7 0-1.3-.3-1.7-.8L.4 7.6c-.6-.8-.5-2 .3-2.6.8-.6 1.9-.6 2.5.2l8.6 9.8c.1.1.2.1.4 0l8.6-9.8c.7-.8 1.8-.9 2.6-.2s.9 1.8.2 2.6l-.1.1-9.8 11.1c-.4.4-1.1.7-1.7.7z\" fill=\"#000000\"/></svg>"}, {"kebab": "close", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Remove--Streamline-Ultimate\">\n  <desc>\n    Remove Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m4.5 19.5 15 -15\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m4.5 4.5 15 15\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M.44 21.44a1.49 1.49 0 0 0 0 2.12 1.5 1.5 0 0 0 2.12 0l9.26-9.26a.25.25 0 0 1 .36 0l9.26 9.26a1.5 1.5 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12l-9.26-9.26a.25.25 0 0 1 0-.36l9.26-9.26A1.5 1.5 0 0 0 21.44.44L12.18 9.7a.25.25 0 0 1-.36 0L2.56.44A1.5 1.5 0 0 0 .44 2.56l9.26 9.26a.25.25 0 0 1 0 .36Z\" fill=\"#000000\"/></svg>"}, {"kebab": "filter", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Filter--Streamline-Ultimate\">\n  <desc>\n    Filter Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M2.25 5.25a9.75 4.5 0 1 0 19.5 0 9.75 4.5 0 1 0 -19.5 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M2.25 5.25a9.747 9.747 0 0 0 7.5 9.479V21a2.25 2.25 0 0 0 4.5 0v-6.271a9.747 9.747 0 0 0 7.5 -9.479\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M20.59 9.33a6.07 6.07 0 0 0 .91-2.92V4.16c0-1.25-2.5-4.07-10-4.07s-10 2.82-10 4.07v2.25a6.07 6.07 0 0 0 1.56 3.77l6.44 6.44v5.79a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-2.52a6.48 6.48 0 0 0 7.09-10.56ZM11.5 2.09c5 0 8 1.56 8 2.41s-3 2.41-8 2.41-8-1.56-8-2.41 3.04-2.41 8-2.41ZM16 18.41a4.49 4.49 0 0 1-2.37-.68.25.25 0 0 1-.13-.22v-.79a.29.29 0 0 1 .07-.18l5.5-5.5a.26.26 0 0 1 .19-.07.21.21 0 0 1 .18.09 4.44 4.44 0 0 1 1.06 2.85 4.51 4.51 0 0 1-4.5 4.5Z\" fill=\"#000000\"/></svg>"}, {"kebab": "settings", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Cog--Streamline-Ultimate\">\n  <desc>\n    Cog Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M10.546 2.438a1.957 1.957 0 0 0 2.908 0L14.4 1.4a1.959 1.959 0 0 1 3.41 1.413l-0.071 1.4a1.958 1.958 0 0 0 2.051 2.054l1.4 -0.071a1.959 1.959 0 0 1 1.41 3.41l-1.042 0.94a1.96 1.96 0 0 0 0 2.909l1.042 0.94a1.959 1.959 0 0 1 -1.413 3.41l-1.4 -0.071a1.958 1.958 0 0 0 -2.056 2.056l0.071 1.4A1.959 1.959 0 0 1 14.4 22.6l-0.941 -1.041a1.959 1.959 0 0 0 -2.908 0L9.606 22.6A1.959 1.959 0 0 1 6.2 21.192l0.072 -1.4a1.958 1.958 0 0 0 -2.056 -2.056l-1.4 0.071A1.958 1.958 0 0 1 1.4 14.4l1.041 -0.94a1.96 1.96 0 0 0 0 -2.909L1.4 9.606A1.958 1.958 0 0 1 2.809 6.2l1.4 0.071a1.958 1.958 0 0 0 2.058 -2.06L6.2 2.81A1.959 1.959 0 0 1 9.606 1.4Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M7.5 12.001a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0 -9 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.5 9.5h-1.86a9.51 9.51 0 0 0-.76-1.84l1.31-1.32a1.46 1.46 0 0 0 .44-1.06 1.47 1.47 0 0 0-.44-1.06l-1.41-1.41a1.49 1.49 0 0 0-2.12 0l-1.32 1.32a9 9 0 0 0-1.84-.77V1.5A1.5 1.5 0 0 0 13 0h-2a1.5 1.5 0 0 0-1.5 1.5v1.86a9 9 0 0 0-1.84.77L6.34 2.81a1.49 1.49 0 0 0-2.12 0L2.81 4.22a1.47 1.47 0 0 0-.44 1.06 1.44 1.44 0 0 0 .44 1.06l1.31 1.32a9.51 9.51 0 0 0-.76 1.84H1.5A1.5 1.5 0 0 0 0 11v2a1.5 1.5 0 0 0 1.5 1.5h1.86a9.26 9.26 0 0 0 .76 1.84l-1.31 1.32a1.5 1.5 0 0 0 0 2.12l1.41 1.41a1.53 1.53 0 0 0 2.12 0l1.32-1.31a9.26 9.26 0 0 0 1.84.76v1.86A1.5 1.5 0 0 0 11 24h2a1.5 1.5 0 0 0 1.5-1.5v-1.86a9.26 9.26 0 0 0 1.84-.76l1.32 1.31a1.49 1.49 0 0 0 2.12 0l1.41-1.41a1.5 1.5 0 0 0 0-2.12l-1.31-1.32a9.26 9.26 0 0 0 .76-1.84h1.86A1.5 1.5 0 0 0 24 13v-2a1.5 1.5 0 0 0-1.5-1.5ZM12 17a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z\" fill=\"#000000\"/></svg>"}, {"kebab": "add", "category": "Actions", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Add--Streamline-Ultimate\">\n  <desc>\n    Add Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m0.75 12 22.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 0.75 0 22.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 12a1.5 1.5 0 0 0 1.5 1.5h8.75a.25.25 0 0 1 .25.25v8.75a1.5 1.5 0 0 0 3 0v-8.75a.25.25 0 0 1 .25-.25h8.75a1.5 1.5 0 0 0 0-3h-8.75a.25.25 0 0 1-.25-.25V1.5a1.5 1.5 0 0 0-3 0v8.75a.25.25 0 0 1-.25.25H1.5A1.5 1.5 0 0 0 0 12Z\" fill=\"#000000\"/></svg>"}, {"kebab": "edit", "category": "Actions", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Pencil--Streamline-Ultimate\">\n  <desc>\n    Pencil Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22.19 1.81a3.639 3.639 0 0 0 -5.17 0.035l-14.5 14.5L0.75 23.25l6.905 -1.771 14.5 -14.5a3.637 3.637 0 0 0 0.035 -5.169Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m16.606 2.26 5.134 5.134\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m2.521 16.344 5.139 5.13\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M16.19 3.51a.51.51 0 0 0-.71 0L4.07 14.92a.5.5 0 0 0 0 .71l4.28 4.28a.48.48 0 0 0 .7 0L20.47 8.5a.51.51 0 0 0 0-.71Z\" fill=\"#000000\"/><path d=\"M3 16.71a.51.51 0 0 0-.47-.13.48.48 0 0 0-.36.33L0 23.33a.49.49 0 0 0 .12.51.5.5 0 0 0 .54.16l6.42-2.14a.52.52 0 0 0 .33-.36.49.49 0 0 0-.14-.5Z\" fill=\"#000000\"/><path d=\"M23 1a3.6 3.6 0 0 0-5 0l-.71.71a.5.5 0 0 0 0 .71l4.28 4.28a.51.51 0 0 0 .7 0L23 6a3.53 3.53 0 0 0 0-5Z\" fill=\"#000000\"/></g></svg>"}, {"kebab": "delete", "category": "Actions", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Delete--Streamline-Ultimate\">\n  <desc>\n    Delete Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M0.75 12a11.25 11.25 0 1 0 22.5 0 11.25 11.25 0 1 0 -22.5 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m4.045 19.955 15.91 -15.91\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0ZM5.29 5.29a9.63 9.63 0 0 1 12.23-1 .26.26 0 0 1 0 .4L4.67 17.56a.27.27 0 0 1-.4 0 9.49 9.49 0 0 1 1-12.24Zm13.46 13.47a9.53 9.53 0 0 1-12.23 1 .26.26 0 0 1 0-.4L19.37 6.49a.26.26 0 0 1 .4 0 9.49 9.49 0 0 1-1 12.24Z\" fill=\"#000000\"/></svg>"}, {"kebab": "check", "category": "Actions", "regularSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-2--Streamline-Ultimate\">\n  <desc>\n    Check 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <defs></defs>\n  <title>check-2</title>\n  <path d=\"M6 13.223 8.45 16.7a1.049 1.049 0 0 0 1.707 0.051L18 6.828\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M2.25 0.749h19.5s1.5 0 1.5 1.5v19.5s0 1.5 -1.5 1.5H2.25s-1.5 0 -1.5 -1.5v-19.5s0 -1.5 1.5 -1.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.45 0H1.55A1.54 1.54 0 0 0 0 1.54v20.91A1.54 1.54 0 0 0 1.55 24h20.9A1.54 1.54 0 0 0 24 22.45V1.54A1.54 1.54 0 0 0 22.45 0Zm-3.64 7.84-7 9.5a1 1 0 0 1-1.43.19l-5-4A1 1 0 1 1 6.62 12l4.19 3.35 6.38-8.66a1 1 0 1 1 1.62 1.18Z\" fill=\"#000000\"/></svg>"}, {"kebab": "download", "category": "Actions", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Download-Arrow--Streamline-Ultimate\">\n  <desc>\n    Download Arrow Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m0.751 22 22.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m3.751 1.75 7.72 14.47a0.749 0.749 0 0 0 1.06 0l7.72 -14.47\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M11.33 14.08a.94.94 0 0 0 1.34 0l9-9A.95.95 0 0 0 21 3.5h-1.44a.93.93 0 0 0-.67.28l-6.54 6.53a.48.48 0 0 1-.7 0L5.11 3.78a1 1 0 0 0-.67-.28H3a.95.95 0 0 0-.67 1.61Z\" fill=\"#000000\"/><path d=\"M22.39 17.67H1.61a1.42 1.42 0 1 0 0 2.83h20.78a1.42 1.42 0 1 0 0-2.83Z\" fill=\"#000000\"/></g></svg>"}, {"kebab": "copy", "category": "Actions", "regularSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Copy-1--Streamline-Ultimate\">\n  <desc>\n    Copy 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m0.993027 3.64642 0 -1.71492c0 -0.55228 0.447713 -0.999997 1.000003 -0.999997l1.71491 0M0.993027 8.2144l0 3.3396M8.27593 0.931503l3.33957 0m4.5147 0 1.5964 0c0.5522 0 1 0.447717 1 0.999997l0 1.71492M0.993027 16.0687l0 1.5963c0 0.5523 0.447713 1 1.000003 1l1.71491 0\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.0078 22.0684c0 0.5522 -0.4477 1 -1 1l-14.73046 0c-0.55228 0 -1 -0.4478 -1 -1l0 -14.73051c0 -0.55228 0.44772 -1 1 -1l14.73046 0c0.5523 0 1 0.44772 1 1l0 14.73051Z\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.8039 18.7899c0 .5523-.44772 1-1 1H2.11816c-1.10456 0-1.999996-.8954-1.999996-2v-1.6857c0-.5523.447716-1 .999996-1 .55229 0 1 .4477 1 1v1.6857H3.8039c.55228 0 1 .4477 1 1Zm-3.68574-6.181c-.55228 0-.999996-.4477-.999996-1V8.23743c0-.55229.447716-1 .999996-1 .55229 0 1 .44771 1 1v3.37147c0 .5523-.44771 1-1 1Zm0-7.86677c-.55228 0-.999996-.44771-.999996-1V2.0564c0-1.10457.895426-2.0000035 1.999996-2.0000035H3.8039c.55229 0 1 .4477155 1 1.0000035 0 .55228-.44771 1-1 1l-1.68574 0v1.68573c0 .55229-.44771 1-1 1Zm17.73354 0c-.5523 0-1-.44771-1-1V2.0564H16.166c-.5523 0-1-.44772-1-1 0-.552288.4477-1.0000035 1-1.0000035h1.6857c1.1046 0 2 .8954295 2 2.0000035v1.68573c0 .55229-.4477 1-1 1Zm-6.181-3.68573c0 .55228-.4477 1-1 1H8.2992c-.55229 0-1-.44772-1-1 0-.552288.44771-1.0000035 1-1.0000035h3.3715c.5523 0 1 .4477155 1 1.0000035Zm9.4622 22.8869c.9665 0 1.75-.7835 1.75-1.75V7.46278c0-.9665-.7835-1.75-1.75-1.75H7.40248c-.9665 0-1.75.7835-1.75 1.75V22.1933c0 .9664.7835 1.75 1.75 1.75H22.1329Z\" clip-rule=\"evenodd\"/></svg>"}, {"kebab": "refresh", "category": "Actions", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Synchronize-Arrows--Streamline-Ultimate\">\n  <desc>\n    Synchronize Arrows Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M18.362 7A8.25 8.25 0 0 0 3.75 12.247V14.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M6 17.908a8.25 8.25 0 0 0 14.25 -5.661v-1.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M9.75 12.247a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m0.75 11.497 3 3 3 -3\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m23.25 13.747 -3 -3 -3 3\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M9.74 2.5a10.25 10.25 0 0 0-7.36 7.11.26.26 0 0 1-.27.18l-1-.13a.47.47 0 0 0-.47.22.47.47 0 0 0 0 .52l2.47 4.35a.51.51 0 0 0 .44.25.52.52 0 0 0 .36-.16l3.47-3.59a.48.48 0 0 0 .12-.51.5.5 0 0 0-.5-.33l-1.88-.24a.23.23 0 0 1-.12-.12.22.22 0 0 1 0-.21 7.67 7.67 0 0 1 5.37-4.9 7.23 7.23 0 0 1 7.1 2.25 1.25 1.25 0 1 0 1.87-1.66 9.72 9.72 0 0 0-9.6-3.03Z\" fill=\"#000000\"/><path d=\"M4.79 16.7a1.24 1.24 0 0 0-.11 1.76 9.72 9.72 0 0 0 9.55 3 10.24 10.24 0 0 0 7.37-7.12.24.24 0 0 1 .27-.17l1.06.12H23a.52.52 0 0 0 .42-.23.49.49 0 0 0 0-.52l-2.5-4.33a.51.51 0 0 0-.37-.21.52.52 0 0 0-.43.15l-3.45 3.62a.5.5 0 0 0-.11.51.49.49 0 0 0 .41.33l1.85.22A.25.25 0 0 1 19 14a.22.22 0 0 1 0 .21 7.67 7.67 0 0 1-5.36 4.9 7.26 7.26 0 0 1-7.11-2.25 1.24 1.24 0 0 0-1.74-.16Z\" fill=\"#000000\"/><path d=\"M9.49 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0\" fill=\"#000000\"/></g></svg>"}];

const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const varByName = {};
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    varByName[v.name] = v;
  }
}
const iconDefault = varByName['icon/default'];
if (!iconDefault) throw new Error('icon/default missing');

const styles = await figma.getLocalTextStylesAsync();
const styleByName = Object.fromEntries(styles.map(s => [s.name, s]));
for (const n of ['h3','h5','body1','body2','caption']) {
  await figma.loadFontAsync(styleByName[n].fontName);
}

function bindColor(node, field) {
  const paint = figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
  if (field === 'fills') node.fills = [paint];
  else node.strokes = [paint];
}

function bindIconColor(root, styleName) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('children' in n) for (const c of n.children) stack.push(c);
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'LINE') {
      const hasStroke = Array.isArray(n.strokes) && n.strokes.length > 0;
      const fills = Array.isArray(n.fills) ? n.fills : [];
      const hasFill = fills.some(f => f.type === 'SOLID' && f.visible !== false);
      if (styleName === 'Regular') {
        if (hasStroke) {
          bindColor(n, 'strokes');
          n.strokeWeight = 1.5;
        }
        // clear accidental fills on stroke icons
        if (hasFill && hasStroke) n.fills = [];
      } else {
        if (hasFill) bindColor(n, 'fills');
        if (hasStroke && !hasFill) {
          bindColor(n, 'strokes');
        }
      }
    }
  }
}

function bindText(t, colorName) {
  t.fills = [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', varByName[colorName])];
}

async function addText(parent, chars, style, color) {
  const t = figma.createText();
  t.textStyleId = styleByName[style].id;
  t.characters = chars;
  bindText(t, color);
  parent.appendChild(t);
  t.layoutSizingHorizontal = 'FILL';
  return t;
}

function makeVariant(styleName, svg) {
  const wrap = figma.createFrame();
  wrap.name = 'Style=' + styleName;
  wrap.resize(24, 24);
  wrap.fills = [];
  wrap.clipsContent = false;
  wrap.cornerRadius = 0;
  const node = figma.createNodeFromSvg(svg);
  node.name = 'glyph';
  wrap.appendChild(node);
  node.x = (24 - node.width) / 2;
  node.y = (24 - node.height) / 2;
  bindIconColor(wrap, styleName);
  return figma.createComponentFromNode(wrap);
}

const old = page.findOne(n => n.name === 'Icons — Dual-style pilot');
if (old) old.remove();

const pilot = figma.createAutoLayout('VERTICAL');
pilot.name = 'Icons — Dual-style pilot';
pilot.itemSpacing = 32;
pilot.paddingTop = 40; pilot.paddingBottom = 40; pilot.paddingLeft = 40; pilot.paddingRight = 40;
pilot.primaryAxisSizingMode = 'AUTO';
pilot.counterAxisSizingMode = 'FIXED';
page.appendChild(pilot);
pilot.resize(720, 100);
pilot.x = 2600; pilot.y = 0;
pilot.primaryAxisSizingMode = 'AUTO';

await addText(pilot, 'Icons pilot — dual-style (Regular / Bold)', 'h3', 'text/primary');
await addText(pilot, 'Phase 2 gate: Navigation + Actions (15 icons). Style = Regular (Ultimate Regular, stroke 1.5) | Bold (Ultimate Bold, filled). Color → icon.default. Frame 24×24 / radius 0. Size scale proposed/unratified: icon.xs=16 · icon.sm=20 · icon.md=24 · icon.lg=32.', 'body2', 'text/secondary');
await addText(pilot, 'No Bold match (excluded from pilot): home — Regular name “House 1” has no exact Ultimate Bold counterpart.', 'caption', 'text/secondary');

const shelf = figma.createAutoLayout('HORIZONTAL');
shelf.name = 'Component shelf (pilot)';
shelf.itemSpacing = 16;
shelf.layoutWrap = 'WRAP';
shelf.primaryAxisSizingMode = 'FIXED';
shelf.counterAxisSizingMode = 'AUTO';
pilot.appendChild(shelf);
shelf.layoutSizingHorizontal = 'FILL';

const setsMeta = [];
const setsByCat = { Navigation: [], Actions: [] };

for (const icon of ICONS) {
  const reg = makeVariant('Regular', icon.regularSvg);
  const bold = makeVariant('Bold', icon.boldSvg);
  const set = figma.combineAsVariants([reg, bold], shelf);
  set.name = 'icon/' + icon.kebab;
  set.description = 'Soma icon · Style Regular=Ultimate Regular · Bold=Ultimate Bold · bind icon.default';
  const meta = { id: set.id, name: set.name, category: icon.category, kebab: icon.kebab };
  setsMeta.push(meta);
  setsByCat[icon.category].push(set);
}

for (const cat of ['Navigation', 'Actions']) {
  const section = figma.createAutoLayout('VERTICAL');
  section.name = 'Category · ' + cat;
  section.itemSpacing = 12;
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'FIXED';
  pilot.appendChild(section);
  section.layoutSizingHorizontal = 'FILL';
  await addText(section, cat, 'h5', 'text/primary');

  for (const set of setsByCat[cat]) {
    const row = figma.createAutoLayout('HORIZONTAL');
    row.name = 'row/' + set.name.replace(/^icon\//, '');
    row.itemSpacing = 16;
    row.counterAxisAlignItems = 'CENTER';
    row.primaryAxisSizingMode = 'AUTO';
    section.appendChild(row);

    const regComp = set.children.find(c => c.name === 'Style=Regular');
    const boldComp = set.children.find(c => c.name === 'Style=Bold');

    const sizeRow = figma.createAutoLayout('HORIZONTAL');
    sizeRow.itemSpacing = 10;
    sizeRow.counterAxisAlignItems = 'MAX';
    row.appendChild(sizeRow);
    for (const [label, px] of [['xs',16],['sm',20],['md',24],['lg',32]]) {
      const col = figma.createAutoLayout('VERTICAL');
      col.itemSpacing = 4;
      col.counterAxisAlignItems = 'CENTER';
      sizeRow.appendChild(col);
      const inst = regComp.createInstance();
      inst.resize(px, px);
      col.appendChild(inst);
      const lab = figma.createText();
      lab.textStyleId = styleByName['caption'].id;
      lab.characters = label;
      bindText(lab, 'text/secondary');
      col.appendChild(lab);
    }

    const boldInst = boldComp.createInstance();
    boldInst.resize(24, 24);
    row.appendChild(boldInst);
    const boldLab = figma.createText();
    boldLab.textStyleId = styleByName['caption'].id;
    boldLab.characters = 'Bold md';
    bindText(boldLab, 'text/secondary');
    row.appendChild(boldLab);

    const name = figma.createText();
    name.textStyleId = styleByName['body2'].id;
    name.characters = set.name.replace(/^icon\//, '');
    bindText(name, 'text/primary');
    row.appendChild(name);
  }
}

// Update foundation doc size line if present
const doc = await figma.getNodeByIdAsync('9:14225');
if (doc) {
  const texts = doc.findAll(n => n.type === 'TEXT');
  for (const t of texts) {
    if (/Viewport: icon\.md/.test(t.characters)) {
      await figma.loadFontAsync(t.fontName);
      t.characters = 'Viewport: icon.md (24px) default — scale icon.xs (16) / icon.sm (20) / icon.lg (32) · proposed/unratified';
    }
    if (/Stroke: Streamline Regular/.test(t.characters)) {
      await figma.loadFontAsync(t.fontName);
      t.characters = 'Stroke: Ultimate Regular 1.5px at 24 viewBox · Bold = Ultimate Bold fills · color icon.default · dual-style pilot in progress';
    }
  }
}

// Spot-check menu Regular + Bold + 16px instance
const menuSet = setsByCat.Navigation.find(s => s.name === 'icon/menu');
const menuReg = menuSet.children.find(c => c.name === 'Style=Regular');
const menuBold = menuSet.children.find(c => c.name === 'Style=Bold');
function sample(node) {
  const out = [];
  const stack = [node];
  while (stack.length) {
    const n = stack.pop();
    if ('children' in n) for (const c of n.children) stack.push(c);
    if (n.type === 'VECTOR') {
      const sb = n.boundVariables && n.boundVariables.strokes;
      const fb = n.boundVariables && n.boundVariables.fills;
      let strokeVar = null, fillVar = null;
      out.push({
        strokeWeight: n.strokeWeight,
        strokeBound: !!(sb && sb.length),
        fillBound: !!(fb && fb.length),
      });
    }
  }
  return out;
}

return {
  createdNodeIds: [pilot.id, ...setsMeta.map(s => s.id)],
  mutatedNodeIds: doc ? [doc.id] : [],
  pilotId: pilot.id,
  sets: setsMeta,
  sampleRegular: sample(menuReg),
  sampleBold: sample(menuBold),
  iconXs: varByName['icon/xs'] ? 16 : null,
};
