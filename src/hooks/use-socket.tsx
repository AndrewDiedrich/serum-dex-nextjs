import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    try {
      const socketIo = io({
        // reconnect: true,
        secure: true,
        path: `wss://api.serum-vial.dev/v1/ws`,
        transports: ['websocket', 'polling'],
      })
      setSocket(socketIo)

      function cleanup() {
        socketIo.disconnect()
      }
      return cleanup
    } catch (error) {
      console.log('websocket hook:', error)
    }
    // should only run once and not on every re-render,
    // so pass an empty array
  }, [])

  return socket
}
