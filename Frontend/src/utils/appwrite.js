import { Client, Storage, ID } from 'appwrite'
const client = new Client()
    .setEndpoint(import.meta.env.VITE_END_POINT)
    .setProject(import.meta.env.VITE_PROJECT_ID)

const storage = new Storage(client)
export const uploadToAppwrite = async (file) => {
    return await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        file,
    )
}
export const getFile = async (fileId) => {
    return await storage.getFileView(
        import.meta.env.VITE_BUCKET_ID,
        fileId,
    )
}
