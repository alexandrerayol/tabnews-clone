test("check status code of /api/v1/status", async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(response.status).toBe(200)
})

test("check type of response /api/v1/status", async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    const data = await response.json()
    expect(typeof(data)).toBe("object")
})