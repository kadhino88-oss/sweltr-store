import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

type RecordValue = Record<string, unknown>;
type CjVideo = {
  id: string;
  videoUrl: string;
  videoName: string;
  coverURL: string;
  duration: number | null;
  isFree: string;
  isBuy: boolean;
  videoState: string;
};

function record(value: unknown): RecordValue | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as RecordValue
    : null;
}

function playableVideo(value: unknown): CjVideo | null {
  const item = record(value);
  if (!item) return null;
  const id = typeof item.id === "string" ? item.id : typeof item.videoId === "string" ? item.videoId : "";
  const videoUrl = typeof item.videoUrl === "string" ? item.videoUrl : "";
  let host = "";
  try { host = new URL(videoUrl).hostname; } catch { return null; }
  if (!id || !videoUrl || host !== "download-only-api.cjdropshipping.com") return null;
  const isFree = String(item.isFree ?? "0");
  const isBuy = item.isBuy === true;
  const videoState = typeof item.videoState === "string" ? item.videoState : "";
  if (videoState !== "ON_STATE" || (isFree !== "1" && !isBuy)) return null;
  return {
    id,
    videoUrl,
    videoName: typeof item.videoName === "string" && item.videoName ? item.videoName : "Vidéo produit SWELTR",
    coverURL: typeof item.coverURL === "string" ? item.coverURL : "",
    duration: Number.isFinite(Number(item.duration)) ? Number(item.duration) : null,
    isFree,
    isBuy,
    videoState,
  };
}

export async function getLicensedCjVideosForVariant(vid: string) {
  const { accessToken } = await getCjAccessToken();
  const variantResponse = await fetch(CJ_API_BASE_URL + "/product/variant/queryByVid?vid=" + encodeURIComponent(vid), {
    headers: { "CJ-Access-Token": accessToken },
    cache: "no-store",
  });
  if (!variantResponse.ok) throw new Error("CJ variant lookup failed");
  const variantPayload: unknown = await variantResponse.json();
  const variantRoot = record(variantPayload);
  const variantData = record(variantRoot?.data);
  const productId = typeof variantData?.pid === "string" ? variantData.pid : "";
  if ((variantRoot?.result !== true && variantRoot?.success !== true) || !productId) {
    throw new Error("CJ did not return a product ID for this variant");
  }

  const videoResponse = await fetch(CJ_API_BASE_URL + "/product/queryVideosByProductId", {
    method: "POST",
    headers: { "CJ-Access-Token": accessToken, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });
  if (!videoResponse.ok) throw new Error("CJ product video lookup failed");
  const videoPayload: unknown = await videoResponse.json();
  const videoRoot = record(videoPayload);
  const rows = Array.isArray(videoRoot?.data) ? videoRoot.data : [];
  const videos = rows.map(playableVideo).filter((video): video is CjVideo => video !== null);
  return { productId, videos };
}
