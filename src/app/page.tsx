import { AnagramGuesserComponent } from "@/components/anagram-guesser";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <AnagramGuesserComponent />
    </div>
  );
}
