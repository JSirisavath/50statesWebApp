module.exports = {
  devServer: {
    // '/api/states e.g : http://127.0.0.1:3000/api/states http://127.0.0.1:3000/api/states

    // For us, we want to  send our requests like getting api states to this vue dev-server address with /api/states
    proxy: 'http://127.0.0.1:3000',
  },
};
