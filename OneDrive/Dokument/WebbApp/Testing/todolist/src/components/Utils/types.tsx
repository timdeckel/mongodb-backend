export type TaskType = {
    id: string,
    description: string,
    removeItem?: (id: string) => void
}