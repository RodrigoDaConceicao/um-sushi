
interface IOrder {
    produtoId: number
    quantidade: number
}
export async function sendOrder(order: IOrder[]) {
    try {
        const res = await fetch('/api/order', { 
        method: 'POST',
        body: JSON.stringify(order)
        })
        const {data, status} = await res.json()
        return {data, status}
    } catch(err) {
        return err
    }
}