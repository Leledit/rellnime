export function limitingTheNumberOfCharacters(nameImage: string,limit:number) {
    if (nameImage.length > limit) {
        return nameImage.substring(0, limit) + "...";
    } else {
        return nameImage;
    }
}