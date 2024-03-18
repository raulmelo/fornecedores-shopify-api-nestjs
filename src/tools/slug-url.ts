export function TitleToSlug(title: string) {
    return title
        .toLowerCase() // converte para minúsculas
        .replace(/[^\w\s-]/g, '') // remove caracteres especiais
        .trim() // remove espaços em branco no início e no final
        .replace(/\s+/g, '-') // substitui espaços por hífens
        .replace(/-+/g, '-'); // remove hífens múltiplos
}

