import path from "path"
import { promises as fs } from "fs"
import { NextApiRequest, NextApiResponse } from "next"

type Nip5Id = {
  // names: [string, string][]
  names: { username: string; hexkey: string }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //deconstruct to grab value of 'name' param if present
  const { name: nameParam } = req.query
  const name: string = Array.isArray(nameParam) ? nameParam[0] : nameParam
  //find the file path + Read the nostr.json
  const jsonDirectory = path.join(process.cwd(), "data/nostr.json")
  const fileContents = await fs.readFile(jsonDirectory, "utf8")
  //return the content of the data file in json format
  let nip5ids: Nip5Id = JSON.parse(fileContents)
  if (name) {
    //override JSON response if "name" query string param detected
    const nip5Filtered = { names: { [name]: nip5ids.names[name] as string } }
    return res.status(200).json(nip5Filtered)
  }
  return res.status(200).json(nip5ids)
}