interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  image,
}: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <img
          src={image || "/placeholder.svg"}
          alt={author}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <blockquote className="text-gray-600">"{quote}"</blockquote>
    </div>
  );
}
