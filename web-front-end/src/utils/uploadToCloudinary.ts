// utils/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'unsigned_preset')

  const response = await fetch('https://api.cloudinary.com/v1_1/dfqxbwfnc/image/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || 'Error uploding image')
  }

  return data.secure_url
}
