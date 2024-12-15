/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/CreateReview.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useAddReviewMutation } from "../../api/review/query";
import { successToast, errorToast } from "../toaster";
import { GetReviews } from "./getreviews";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  reviewText: z.string().min(1, "Review text is required"),
});

export const CreateReview = ({
  bookId,
  title,
  author,
  genres,
  description,
  imageUrl,
  onClose,
}: {
  bookId: string;
  title: string;
  author: string;
  genres: string;
  description: string;
  imageUrl: string;
  onClose: () => void;
}) => {
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: { rating: 0, reviewText: "" },
    resolver: zodResolver(reviewSchema),
  });

  const addReviewMutation = useAddReviewMutation();
  const handleCreateReview: SubmitHandler<
    z.infer<typeof reviewSchema>
  > = async (data) => {
    try {
      await addReviewMutation.mutateAsync(
        { bookId, rating: data.rating, reviewText: data.reviewText },
        {
          onSuccess() {
            successToast("Review added successfully");
            reset();
          },
          onError(error: any) {
            errorToast(error?.message || "Error adding review");
          },
        }
      );
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-6xl h-[90vh] rounded-lg flex overflow-hidden relative shadow-lg">
          <button
            className="absolute top-4 right-4 text-amber-600 hover:text-amber-800 p-1 rounded-full focus:outline-none"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <div className="w-1/2 flex flex-col items-center bg-gray-100 p-6">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-[60%] object-contain rounded-md shadow-md"
            />
            <div className="mt-6 text-left w-full">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Author:</strong> {author}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {genres.split(",").map((genre, index) => (
                  <span
                    key={index}
                    className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Description:</strong> {description}
              </p>
            </div>
          </div>

          <div className="w-1/2 flex flex-col p-6 overflow-auto">
            <h4 className="text-lg font-semibold mb-4">User Reviews</h4>
            <GetReviews bookId={bookId} refetch={() => {}} />
            <form
              onSubmit={handleSubmit(handleCreateReview)}
              className="flex flex-col gap-4 mt-6 border-t pt-4"
            >
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`text-3xl cursor-pointer ${
                          index < field.value
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => field.onChange(index + 1)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
              />
              <textarea
                {...control.register("reviewText")}
                placeholder="Add a review..."
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring"
              />
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
