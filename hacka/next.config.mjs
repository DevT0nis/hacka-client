/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Aplica os cabeçalhos a todas as rotas
        source: "/(.*)", 
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Permite qualquer origem
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // Métodos HTTP permitidos
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization", // Cabeçalhos permitidos
          },
        ],
      },
    ];
  },
};

export default nextConfig;
