
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([body]),
         })
        const data = await res.json()
        
        return new Response(JSON.stringify(data), { status: 200 })
    } catch(err) {
        return new Response(JSON.stringify(err), { status: 500 })
    }
}