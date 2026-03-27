/**
 * Utility to check if WebGL is available and functional.
 * This prevents infinite reload loops when a browser reports WebGL support but fails to create a context.
 */

let cachedResult: boolean | null = null;

export const isWebGLAvailable = (): boolean => {
  if (typeof window === "undefined") return false;
  if (cachedResult !== null) return cachedResult;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    cachedResult = !!(gl && gl instanceof WebGLRenderingContext);

    // Clean up
    if (gl instanceof WebGLRenderingContext) {
      const extension = gl.getExtension('WEBGL_lose_context');
      if (extension) extension.loseContext();
    }
  } catch (e) {
    cachedResult = false;
  }

  return cachedResult;
};

/**
 * Gets the unmasked renderer and vendor strings from WebGL for better hardware detection.
 */
export const getGLInfo = () => {
  if (typeof window === "undefined") return { renderer: "", vendor: "" };

  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext;
    if (!gl) return { renderer: "", vendor: "" };

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return { renderer: "", vendor: "" };

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "";

    return { renderer, vendor };
  } catch (e) {
    return { renderer: "", vendor: "" };
  }
};
