"use client";

import {
  Button,
  Flex,
  TextField,
  Text,
  Card,
} from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AddBookForm({
  genres,
  action,
}: {
  genres: { id: number; title: string }[];
  action: (formData: FormData) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authors, setAuthors] = useState<string[]>([""]);
  const [imageUrl, setImageUrl] = useState("");

  const isAllowedImage = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname === "cdn.standaardboekhandel.be";
    } catch {
      return false;
    }
  };

  const handleAddAuthor = () => setAuthors([...authors, ""]);
  const handleAuthorChange = (index: number, value: string) => {
    const updated = [...authors];
    updated[index] = value;
    setAuthors(updated);
  };
  const handleRemoveAuthor = (index: number) =>
    setAuthors(authors.filter((_, i) => i !== index));

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 shadow-lg">
      <form
        action={async (formData) => {
          setIsSubmitting(true);
          await action(formData);
          setIsSubmitting(false);
        }}
      >
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="2">
            <Text as="label" size="3" className="text-blue-400">
              Book Title <span className="text-red-400">*</span>
            </Text>
            <TextField.Root
              placeholder="Enter book title..."
              name="title"
              required
              size="3"
              className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" className="text-blue-400">
              Description
            </Text>
            <TextField.Root
              placeholder="Enter book description..."
              name="description"
              size="3"
              className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" className="text-blue-400">
              Book Image <span className="text-red-400">*</span>
            </Text>
            <TextField.Root
              placeholder="Enter book image link..."
              name="image"
              required
              size="3"
              value={imageUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
              className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
            />

            <div className="mt-3">
              <label className="mb-1 font-semibold text-gray-300">Image preview</label>
              {imageUrl && isAllowedImage(imageUrl) ? (
                <div className="w-36 h-48 overflow-hidden rounded">
                  <Image src={imageUrl} alt="Preview" width={150} height={200} className="object-cover w-full h-full rounded" />
                </div>
              ) : (
                <div className="w-36 h-48 bg-gray-700 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
          </Flex>
          
          <Flex gap="4" direction={{ initial: "column", sm: "row" }}>
            <Flex direction="column" gap="2" className="flex-1">
              <Text as="label" size="3" className="text-blue-400">
                Pages
              </Text>
              <TextField.Root
                placeholder="e.g., 320"
                name="pages"
                type="number"
                min="1"
                size="3"
                className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
              />
            </Flex>

            <Flex direction="column" gap="2" className="flex-1">
              <Text as="label" size="3" className="text-blue-400">
                Year
              </Text>
              <TextField.Root
                placeholder="e.g., 2024"
                name="year"
                type="number"
                min="0"
                max={new Date().getFullYear()}
                size="3"
                className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
              />
            </Flex>
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" className="text-blue-400">
              Publisher <span className="text-red-400">*</span>
            </Text>
            <TextField.Root
              placeholder="Enter publisher name..."
              name="publisher"
              required
              size="3"
              className="bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" className="text-blue-400">
              Authors <span className="text-red-400">*</span>
            </Text>
            {authors.map((author, i) => (
              <Flex key={i} align="center" gap="2">
                <TextField.Root
                  placeholder={`Author ${i + 1}`}
                  name="authors"
                  value={author}
                  onChange={(e) => handleAuthorChange(i, e.target.value)}
                  required={i === 0}
                  size="3"
                  className="flex-1 bg-gray-700/50 border-gray-600 focus:border-blue-500 transition-colors"
                />
                {authors.length > 1 && (
                  <Button
                    type="button"
                    variant="soft"
                    color="red"
                    onClick={() => handleRemoveAuthor(i)}
                  >
                    Remove
                  </Button>
                )}
              </Flex>
            ))}
            <Button
              type="button"
              variant="soft"
              color="blue"
              onClick={handleAddAuthor}
              className="mt-2 self-start"
            >
              + Add Another Author
            </Button>
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" className="text-blue-400">
              Genres
            </Text>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {genres.map((g) => (
                <label key={g.id} className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    name="genres"
                    value={g.id}
                    className="accent-blue-500 cursor-pointer"
                  />
                  <span>{g.title}</span>
                </label>
              ))}
            </div>
          </Flex>

          <Flex gap="3" justify="end" className="mt-4">
            <Link href="/books">
              <Button variant="soft" color="gray" size="3" className="hover:bg-gray-600">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              size="3"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:transform hover:-translate-y-0.5"
            >
              {isSubmitting ? "Creating..." : "Create Book"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
}
