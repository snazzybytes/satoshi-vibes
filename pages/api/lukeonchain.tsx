import path from "path"
import { promises as fs } from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import { get } from '@vercel/edge-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //read Vercel edge-config
  const lnurlProxy = await get("lnurl-proxy") || "alby"
  //Find the file path
  const jsonDirectory = path.join(process.cwd(), "data/lnurl", lnurlProxy + ".json")
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory, "utf8")
  //Return the content of the data file in json format
  const objectData = JSON.parse(fileContents)
  res.status(200).json(objectData)
}
