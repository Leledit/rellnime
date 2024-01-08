import Compressor from "compressorjs";

export const compressImage = (file: File) => {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            quality: 0.8, // Ajuste a qualidade conforme necessário (0 a 1)
            maxWidth: 400, // Ajusta a largura máxima da imagem compactada 
            maxHeight: 400, // Ajusta a altura máxima da imagem compactada 
            mimeType: "image/jpeg",
            success(result) {
                resolve(result);
            },
            error(error) {
                reject(error);
            },
        });
    });
}

export  async function convertBlobToBase64(dataBlob: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = (function (file) {
            return function () {
                const imageData = reader.result as string;
                if (imageData) {
                    const imgBase64 = imageData.split(',')[1];
                    resolve(imgBase64);
                }
            }
        })(dataBlob);
        reader.readAsDataURL(dataBlob);
    })
}