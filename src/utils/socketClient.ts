/**
 * Lazy-loaded socket.io-client utility
 * Reduces initial bundle size by loading socket.io only when needed
 */

let socketIoModule: typeof import("socket.io-client") | null = null;

export const getSocketIo = async () => {
  if (!socketIoModule) {
    socketIoModule = await import("socket.io-client");
  }
  return socketIoModule;
};

export const createSocket = async (url: string, options?: any) => {
  const { io } = await getSocketIo();
  return io(url, options);
};
