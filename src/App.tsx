import { useEffect, useState } from "react"
import type { Cipo } from "./types/type"
import 'bootstrap/dist/css/bootstrap.min.css'
 
function App() {
    const [cipok, setCipok] = useState<Cipo[]>([])
 
    const [marka, setMarka] = useState<string>("")
    const [modell, setModell] = useState<string>("")
    const [szin, setSzin] = useState<string>("")
    const [meret, setMeret] = useState<number>(0)
    const [ar, setAr] = useState<number>(0)
    const [keszleten, setKeszleten] = useState<boolean>(false)
    const [megjelenes_datuma, setMegjelenes] = useState<string>("")

    useEffect(() => {
        async function Betoltes() {
            try {
                const valasz = await fetch("http://localhost:3000/cipok")
                const data: Cipo[] = await valasz.json()
                setCipok(data)
            }
            catch (err) {
                console.log(err)
            }
        }
 
        Betoltes()
    }, [])
 
    async function handleCipoFelvetel(e) {
        e.preventDefault()
 
        const ujCipo = {
            marka: marka,
            modell: modell,
            szin: szin,
            meret: meret,
            ar: ar,
            keszleten: keszleten,
            megjelenes_datuma: megjelenes_datuma
        }
        try {
            const valasz = await fetch("http://localhost:3000/cipok", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(ujCipo)
            })
            const cipo: Cipo = await valasz.json()
            setCipok((elozo) => [...elozo, cipo])
 
            setMarka("")
            setModell("")
            setSzin("")
            setMeret(0)
            setAr(0)
            setKeszleten(false)
            setMegjelenes("")
 
        }
        catch (err) {
            console.log(err)
        }
 
        console.log(ujCipo)
    }
 
    return (
        <>
            <h1>Cipők</h1>
            <h2>Cipők listája</h2>
 
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Márka</th>
                        <th>Modell</th>
                        <th>Szín</th>
                        <th>Méret</th>
                        <th>Ár</th>
                        <th>Készleten</th>
                        <th>Megjelenés dátuma</th>
                    </tr>
                </thead>
 
                <tbody>
                    {cipok.map((cipo) => (
                        <tr key={cipo.id}>
                            <td>{cipo.marka}</td>
                            <td>{cipo.modell}</td>
                            <td>{cipo.szin}</td>
                            <td>{cipo.meret}</td>
                            <td>{cipo.ar} Ft</td>
                            <td>{cipo.keszleten ? "Igen" : "Nem"}</td>
                            <td>{cipo.megjelenes_datuma}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
 
            <h2>Új cipő felvétele</h2>
 
            <form onSubmit={handleCipoFelvetel}>
                <label htmlFor="input_marka">Márka:</label>
                <input
                    id="input_marka"
                    type="text"
                    value={marka}
                    onChange={(e) => setMarka(e.target.value)}
                />
 
                <br /><br />
 
                <label htmlFor="input_modell">Modell:</label>
                <input
                    id="input_modell"
                    type="text"
                    value={modell}
                    onChange={(e) => setModell(e.target.value)}
                />
 
                <br /><br />
 
                <label htmlFor="input_szin">Szín:</label>
                <input
                    id="input_szin"
                    type="text"
                    value={szin}
                    onChange={(e) => setSzin(e.target.value)}
                />
 
                <br /><br />
 
                <label htmlFor="input_meret">Méret:</label>
                <input
                    id="input_meret"
                    type="number"
                    value={meret}
                    onChange={(e) => setMeret(Number(e.target.value))}
                />
 
                <br /><br />
 
                <label htmlFor="input_ar">Ár:</label>
                <input
                    id="input_ar"
                    type="number"
                    value={ar}
                    onChange={(e) => setAr(Number(e.target.value))}
                />
 
                <br /><br />
 
                <label htmlFor="input_keszleten">Készleten:</label>
                <input
                    id="input_keszleten"
                    type="checkbox"
                    checked={keszleten}
                    onChange={(e) => setKeszleten(e.target.checked)}
                />
 
                <br /><br />
 
                <label htmlFor="input_megjelenes">Megjelenés dátuma:</label>
                <input
                    id="input_megjelenes"
                    type="date"
                    value={megjelenes_datuma}
                    onChange={(e) => setMegjelenes(e.target.value)}
                />
 
                <br /><br />
 
                <button type="submit">Cipő felvétele</button>
            </form>
        </>
    )
}
 
export default App