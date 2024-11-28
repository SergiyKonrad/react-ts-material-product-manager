// Has higher flexibility with MUI's pre-built modal and dialog components if to compare to Products.tsx & Modal.tsx files.

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

interface ModalDeleteProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  productName?: string // Optional,to show the name of the product being deleted.
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  open,
  onConfirm,
  onCancel,
  productName,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle className="text-center font-bold">
        Confirm Deletion
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" align="center">
          Are you sure you want to delete{' '}
          {productName ? `"${productName}"` : 'this product'}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          className="!bg-red-500 hover:!bg-red-600 !text-white w-full p-2 rounded"
        >
          OK
        </Button>
        <Button
          onClick={onCancel}
          className="!bg-gray-300 hover:!bg-gray-400 !text-black w-full p-2 rounded"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalDelete
