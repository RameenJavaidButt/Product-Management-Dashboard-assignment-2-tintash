export function formattedCategory(category: string){
    return category
    .split(' ')
    .map(
        word => 

        word.charAt(0).toUpperCase()
        +
        word.slice(1).toLowerCase()
        
        )
        .join(' ');

}