import { getCategoriesDB } from "../db/mockDB"
import { useDataStore } from "../stores/dataStore"

const setCategories = useDataStore.getState().setCategories

export const getCategories = async (uid: string) => {
    const categories = await getCategoriesDB(uid)
    setCategories(categories)
}