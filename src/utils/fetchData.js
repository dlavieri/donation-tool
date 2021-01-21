export default async function fetchData(url, options = {}) {
    const response = await fetch(url, options);
    const jsonData = await response.json()
    return jsonData;
}