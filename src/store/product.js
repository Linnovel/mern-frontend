import { create } from 'zustand'

const API_URL = import.meta.env.VITE_API_URL

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Llena todos los campos" }
        }

        try {
            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            })

            const data = await res.json()

            if (!res.ok) {
                return { success: false, message: data.message || "Error al crear producto" }
            }

            set((state) => ({ products: [...state.products, data.data] }))
            return { success: true, message: "Producto creado con éxito" }
        } catch (error) {
            console.error("Error en createProduct:", error.message)
            return { success: false, message: "Error de conexión con el servidor" }
        }
    },

    fetchProducts: async () => {
        try {
            const res = await fetch(`${API_URL}/products`)
            const data = await res.json()
            set({ products: data.data })
        } catch (error) {
            console.error("Error al obtener productos:", error.message)
        }
    },

    handleDelte: async (id) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
            })
            const data = await res.json()
            if (!data.success) return { success: false, message: data.message }
            set((state) => ({
                products: state.products.filter(product => product._id !== id)
            }))
            return { success: true, message: data.message }
        } catch (error) {
            console.error("Error al eliminar producto:", error.message)
            return { success: false, message: "Error al eliminar producto" }
        }
    },

    updateProductHandle: async (id, updatedProduct) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct)
            })
            const data = await res.json()
            if (!data.success) return { success: false, message: data.message }
            set((state) => ({
                products: state.products.map(product =>
                    product._id === id ? data.data : product
                )
            }))
            return { success: true, message: data.message }
        } catch (error) {
            console.error("Error al actualizar producto:", error.message)
            return { success: false, message: "Error al actualizar producto" }
        }
    }
}))
