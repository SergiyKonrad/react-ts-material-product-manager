import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ToastMessageProps {
  message: string
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => {
  const navigate = useNavigate()

  return (
    <div>
      {message}
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '4px 12px',
          fontSize: '12px',
          marginLeft: '10px',
          borderRadius: '3px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = '#145ea8')
        } // Hover effect
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = '#1976d2')
        }
      >
        Go to Product
      </button>
    </div>
  )
}

export default ToastMessage
