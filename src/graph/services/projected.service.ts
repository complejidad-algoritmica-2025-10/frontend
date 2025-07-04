export async function fetchGraph(){
  const res = await fetch(`http://miappfastapi123.westus2.azurecontainer.io:8000/projected`)

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error HTTP ${res.status}: ${errorText}`)
  }

  return res.json()
}