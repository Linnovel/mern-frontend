import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Llena todos los campos" }
        }

        try {
            const res = await fetch("/api/products", {
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
        const res = await fetch("/api/products")
        const data = await res.json()
        set({
            products: data.data
        })
    },
    handleDelte: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        })
        const data = await res.json()
        if (!data.success) return { success: false, message: data.message }
        set((state) => ({ products: state.products.filter(product => product._id !== id) }))
        return { success: true, message: data.message }
    },
    updateProductHandle: async (id, updatedProduct) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await res.json()
        if (!data.success) return { success: false, message: data.message }
        set((state) => ({
            products: state.products.map(product => product._id === id ? data.data : product)
        }))
        return { success: true, message: data.message };
    }
}))

