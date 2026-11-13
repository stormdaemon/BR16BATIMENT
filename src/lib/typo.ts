const NB = ' ';

// Typographie française : pas de retour à la ligne avant ? : ; ! % € », ni dans un grand nombre ou devant une unité.
export const fr = (text: string) =>
  text
    .replace(/ ([?:;!%€»])/g, `${NB}$1`)
    .replace(/« /g, `«${NB}`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${NB}$2`)
    .replace(/(\d) (km|min|m²|h)(?![\p{L}\d])/gu, `$1${NB}$2`);

// Un numéro sur deux chiffres : 01, 02…
export const deux = (n: number) => String(n).padStart(2, '0');
