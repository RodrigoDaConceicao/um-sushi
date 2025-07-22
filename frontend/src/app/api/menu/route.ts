import api from "@/services/api"

export async function GET(){
    try {
        const res = await api(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu`, { method: 'GET' })
        const {data, status} = res
        return new Response(JSON.stringify(data), { status: status })
    } catch(err) {
        return new Response(JSON.stringify(err), { status: 500 })
    }
}