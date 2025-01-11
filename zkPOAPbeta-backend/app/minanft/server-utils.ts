// "use server";
import axios from "axios";
// import { supabaseServiceClient as supabase } from "@/db/config/server";
// import { TILEVILLE_NFT_BUCKET_NAME,MINATY_NFT_BUCKET_NAME } from "./constants";
// import { NFT_COLLECTIONS } from "@/constants";

const POAP_BETA_BUCKET="poap_beta"
const NEXT_PUBLIC_IPFS_URL="https://api.pinata.cloud/pinning/pinFileToIPFS"
const NEXT_PUBLIC_PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlNWQ4ZWMyYS1kYTQ0LTRjMDItOTU2Zi0yZTcwMGQzZDJiNWMiLCJlbWFpbCI6InJpc2hhYmhoeWRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImUxOTY4M2I3ZjFmNTlkMGNkNGFmIiwic2NvcGVkS2V5U2VjcmV0IjoiNzM3MjBlMDlkODA3ZTRhODlhNTdlMDhkZDE4YmE3Nzc3NDM0ZmY1MTc4Njk3YzYxMGI2YzcxMTIzM2VlNGY1MSIsImV4cCI6MTc2NTEyNzQ2OH0.Z9sB6pNOOQOSV9nEsjLdM27a6C3pgfeTONAIxucoAdc"
export async function pinFile(params: {
  file: File;
  keyvalues: { [key: string]: string };
}): Promise<string | undefined> {
  const { file, keyvalues } = params;
  try {
    const formData = new FormData();
    const metadata = {
      name: file.name,
      keyvalues: {
        ...keyvalues,
        mimeType: file.type,
        size: file.size.toString(),
        filename: file.name ?? "",
      },
    };
    formData.append("file", file);
    formData.append("pinataMetadata", JSON.stringify(metadata));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
    const endpoint = NEXT_PUBLIC_IPFS_URL;
    if (endpoint === undefined) throw new Error("IPFS URL is undefined");
    const key = NEXT_PUBLIC_PINATA_JWT;
    if (key === undefined) throw new Error("IPFS Key is undefined");
    const headers = {
      "Content-Type": `multipart/form-data`,
      Authorization: "Bearer " + key,
    };
    // console.log("pinFile", { endpoint, key, metadata, headers, formData });

    const response = await axios.post(endpoint, formData, {
      maxBodyLength: Infinity,
      headers,
    });
    if (response?.data?.IpfsHash) {
      // console.log("pinFile response", response.data);
      return response.data.IpfsHash;
    } else {
      console.error("pinFile error 1", response.data.error);
      return undefined;
    }
  } catch (err) {
    console.error("pinFile error 2 - catch", err);
    return undefined;
  }
}

// export const fetchNFTImageUrl = async (nft_id: number, collection: string) => {
//   try {
//     const bucketName = collection === NFT_COLLECTIONS.MINATY ? MINATY_NFT_BUCKET_NAME: TILEVILLE_NFT_BUCKET_NAME
//     const { data, error } = await supabase.storage
//       .from(bucketName)
//       .createSignedUrl(`${nft_id + 1}.png`, 180); // 60 seconds expiry time
//     if (error) {
//       throw error;
//     }
//     return data.signedUrl;
//   } catch (error: any) {
//     console.error("Error fetching image:", error.message);
//     return null;
//   }
// };
