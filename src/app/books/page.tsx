import prisma from '@/lib/client';

export default async function Books() {
    const books = await prisma.book.findMany();
    console.log(books);
    return (
        <div>
            <ul>
                {books.map(book => {
                    return <li key={book.id}>{book.title}</li>
                })}
            </ul>
        </div>
    )
}