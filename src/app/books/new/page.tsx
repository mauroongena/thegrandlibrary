import {
  Button,
  Container,
  Flex,
  TextField,
  Text,
  Select,
} from "@radix-ui/themes";
import prisma from "@/lib/client";
import { redirect } from "next/navigation";
import { Theme } from "@radix-ui/themes";

export default function NewBookPage() {
  async function createBook(formData: FormData) {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");
    const pages = formData.get("pages");
    const year = formData.get("year");
    const publisher = formData.get("publisher");

    if (!title || !description || !pages || !year || !publisher) {
      throw new Error("All fields are required.");
    }

    await prisma.book.create({
      data: {
        title: title as string,
        description: description as string,
        pages: Number(pages),
        year: Number(year),
        publisher: publisher as string,
      },
    });

    redirect("/books");
  }

  return (
    <Theme>
        <Container size="3">
        <form action={createBook}>
            <Flex direction="column" gap="5">
            <TextField.Root placeholder="Book title" name="title" />

            <TextField.Root placeholder="Description" name="description" />

            <TextField.Root
                placeholder="Number of pages"
                name="pages"
                type="number"
                min="1"
            />

            <TextField.Root
                placeholder="Year of publication"
                name="year"
                type="number"
                min="0"
            />

            <TextField.Root placeholder="Publisher" name="publisher" />

            <Text as="label" size="2">
                <Flex gap="2" direction="column">
                Genre (optional):
                <Select.Root defaultValue="none" name="genre">
                    <Select.Trigger />
                    <Select.Content>
                    <Select.Item value="none">None</Select.Item>
                    <Select.Item value="fiction">Fiction</Select.Item>
                    <Select.Item value="fantasy">Fantasy</Select.Item>
                    <Select.Item value="romance">Romance</Select.Item>
                    <Select.Item value="dystopian">Dystopian</Select.Item>
                    <Select.Item value="adventure">Adventure</Select.Item>
                    </Select.Content>
                </Select.Root>
                </Flex>
            </Text>

            <Button type="submit">Create New Book</Button>
            </Flex>
        </form>
        </Container>
    </Theme>
  );
}
