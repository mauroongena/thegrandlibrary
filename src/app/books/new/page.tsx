import {
  Button,
  Container,
  Flex,
  TextField,
  Text,
  Select,
  Heading,
  Card,
} from "@radix-ui/themes";
import prisma from "@/lib/client";
import { redirect } from "next/navigation";
import { Theme } from "@radix-ui/themes";
import Link from "next/link";

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
    <Theme appearance="dark" accentColor="blue" grayColor="gray">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <Container size="2">
          <div className="text-center mb-8">
            <Link 
              href="/books" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Collection
            </Link>
            
            <Heading 
              size="8" 
              className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              Add New Book
            </Heading>
            <Text size="5" color="gray" className="text-gray-400">
              Expand your literary collection
            </Text>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 shadow-lg">
            <form action={createBook}>
              <Flex direction="column" gap="5">
                <Flex direction="column" gap="2">
                  <Text as="label" size="3" weight="medium" className="text-blue-400">
                    Book Title <span className="text-red-400">*</span>
                  </Text>
                  <TextField.Root 
                    placeholder="Enter book title..." 
                    name="title"
                    size="3"
                    className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
                    required
                  />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text as="label" size="3" weight="medium" className="text-blue-400">
                    Description <span className="text-red-400">*</span>
                  </Text>
                  <TextField.Root 
                    placeholder="Enter book description..." 
                    name="description"
                    size="3"
                    className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
                    required
                  />
                </Flex>

                <Flex gap="4" direction={{ initial: "column", sm: "row" }}>
                  <Flex direction="column" gap="2" className="flex-1">
                    <Text as="label" size="3" weight="medium" className="text-blue-400">
                      Number of Pages <span className="text-red-400">*</span>
                    </Text>
                    <TextField.Root
                      placeholder="e.g., 320"
                      name="pages"
                      type="number"
                      min="1"
                      size="3"
                      className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
                      required
                    />
                  </Flex>

                  <Flex direction="column" gap="2" className="flex-1">
                    <Text as="label" size="3" weight="medium" className="text-blue-400">
                      Publication Year <span className="text-red-400">*</span>
                    </Text>
                    <TextField.Root
                      placeholder="e.g., 2024"
                      name="year"
                      type="number"
                      min="0"
                      max={new Date().getFullYear()}
                      size="3"
                      className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
                      required
                    />
                  </Flex>
                </Flex>

                <Flex direction="column" gap="2">
                  <Text as="label" size="3" weight="medium" className="text-blue-400">
                    Publisher <span className="text-red-400">*</span>
                  </Text>
                  <TextField.Root 
                    placeholder="Enter publisher name..." 
                    name="publisher"
                    size="3"
                    className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
                    required
                  />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text as="label" size="3" weight="medium" className="text-blue-400">
                    Genre
                  </Text>
                  <Select.Root defaultValue="none" name="genre" size="3">
                    <Select.Trigger className="bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 transition-colors" />
                    <Select.Content className="bg-gray-800 border border-gray-600">
                      <Select.Item value="none" className="hover:bg-blue-500/20 focus:bg-blue-500/20">None</Select.Item>
                      <Select.Item value="fiction" className="hover:bg-blue-500/20 focus:bg-blue-500/20">Fiction</Select.Item>
                      <Select.Item value="fantasy" className="hover:bg-blue-500/20 focus:bg-blue-500/20">Fantasy</Select.Item>
                      <Select.Item value="romance" className="hover:bg-blue-500/20 focus:bg-blue-500/20">Romance</Select.Item>
                      <Select.Item value="dystopian" className="hover:bg-blue-500/20 focus:bg-blue-500/20">Dystopian</Select.Item>
                      <Select.Item value="adventure" className="hover:bg-blue-500/20 focus:bg-blue-500/20">Adventure</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Flex>

                <Flex gap="3" justify="end" className="mt-4">
                  <Link href="/books">
                    <Button 
                      type="button" 
                      variant="soft" 
                      color="gray"
                      size="3"
                      className="hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    size="3"
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Book
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Card>
        </Container>
      </div>
    </Theme>
  );
}