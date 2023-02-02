// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

module.exports = () => {
  return {
    env: {
      mongodb_username: "admin",
      mongodb_password: "admin",
      mongodb_clustername: "cluster0",
      mongodb_database: "gymDb",
      SECRET: "87dab46d8cef51c619ed93b31ddd2155",
    },
    compiler: {
      // ssr and displayName are configured by default
      styledComponents: true,
    },
  };
};
