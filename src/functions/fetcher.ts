import { Tdp } from "../classes/Tdp"

if (!window.__RUNTIME_CONFIG__) {
  throw new Error("Runtime configuration not loaded");
}
const apiBaseUrl = window.__RUNTIME_CONFIG__.API_BASE_URL;
console.log(`apiBaseUrl : ${apiBaseUrl}`) 
interface RepTab{
    rep:string
}
export async function fetcher (route:string, method:string, data:Tdp[]|RepTab[], callback?:any){
    if (data.length === 0){
        if (callback) return callback()
        else return {data:[]}
    }else{
        const body = JSON.stringify(data)
        const result = await fetch(`${apiBaseUrl}/tdp/${route}`,
        { 
            method,
            // mode: 'cors',
            body,
            headers:{
                'Content-Type' : 'application/json'
            }
        }).catch(err => {
            alert('probleme')
            return {err}
        })
        if ("ok" in result){
            const ladata = await result.json()
            if (callback) callback({data: ladata})
            else return {data:ladata}
        }else return {err:result.err}
    }
}
