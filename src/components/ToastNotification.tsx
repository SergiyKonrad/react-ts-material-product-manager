import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function showSuccess(message: string) {
  toast.success(message)
}

export function showError(message: string) {
  toast.error(message)
}
