const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
    dev: {
        "/proxys/": {
            target: "https://www.cnblogs.com",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "/proxys": "" },
        },
        "/acproxys/": {
            target: "https://account.cnblogs.com",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "/acproxys": "" },
        },

        "/imgs/": {
            target: "https://app.ncyunqi.com",
            changeOrigin: true,
            pathRewrite: { "": "" },
        },
        "/huijson/": {
            target: "http://www.webnotes.top",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "/huijson": "/php" },
        },
    },
};

const { REACT_APP_ENV } = process.env;

const proxys = proxy[REACT_APP_ENV || "dev"] || {};
const key = Object.keys(proxys)[0];
const value = proxys[key];

const imgKey = Object.keys(proxys)[1];
const imgValue = proxys[imgKey];

const accountKey = Object.keys(proxys)[2];
const accountValue = proxys[accountKey];

module.exports = function (app) {
    app.use(createProxyMiddleware(key, value));
    app.use(createProxyMiddleware(imgKey, imgValue));
    app.use(createProxyMiddleware(accountKey, accountValue));
};

// const { createProxyMiddleware } = require('http-proxy-middleware');
// const { REACT_APP_ENV } = process.env;
// module.exports = function (app) {
//     app.use(createProxyMiddleware('/huijson', {
//         target: 'http://www.webnotes.top',
//         changeOrigin: true,
//         ws: true,
//         pathRewrite: { '/huijson': '/php' },
//     }));
//     app.use(createProxyMiddleware('/imgs', {
//         target: 'http://localhost:9090/',
//         changeOrigin: true,
//         ws: true,
//     }));
// };
