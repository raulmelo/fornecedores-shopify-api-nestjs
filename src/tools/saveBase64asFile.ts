import { promises as fs } from 'fs';

export default async function saveBase64AsFile(
  base64String: string,
  filename: string,
): Promise<{ base64: string; filename: string }> {
  const base64Image = base64String.split(';base64,').pop();
  try {
    // await fs.writeFile(filename, base64Image, { encoding: 'base64' });

    // setTimeout(() => {
    //   fs.unlink(filename);
    // }, 1000 * 60 * 5); // 5 minutos

    return { base64: base64Image, filename }; // Retorna a string base64 e o nome do arquivo
  } catch (err) {
    console.error('Erro ao salvar arquivo:', err);
    throw err;
  }
}
