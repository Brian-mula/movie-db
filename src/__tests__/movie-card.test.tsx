


import MovieCard from "@/components/movies/movie-card";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";


// mock Convex useMutation
jest.mock("convex/react",()=>({
    useMutation: jest.fn()
}))

// mock next/navigation useRouter
jest.mock("next/navigation",()=>({
    useRouter: jest.fn()
}))

describe("MovieCard",()=>{
    const mockMovie:MovieType = {
        adult: false,
        backdrop_path: "/path/to/backdrop.jpg",
        genre_ids: [28, 12, 16],
        id: 12345,
        original_language: "en",
        original_title: "Mock Movie",
        overview: "Dream within a dream",
        popularity: 123.45,
        poster_path: "/path/to/poster.jpg",
        release_date: "2023-10-01",
        title: "Inception",
        video: false,
        vote_average: 8.5,
        vote_count: 1500
    };
    let mockCreate:jest.Mock;
    let mockPush:jest.Mock;

    beforeEach(()=>{
        mockCreate = jest.fn().mockResolvedValue({});
        (useMutation as jest.Mock).mockReturnValue(mockCreate);

        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({push:mockPush});
    });


    it("renders movie details", () => {
        render(<MovieCard movie={mockMovie} index={0} />);
        expect(screen.getByText(/Inception/i)).toBeInTheDocument();
        expect(screen.getByText("8")).toBeInTheDocument(); // floored vote_average
      });

      it("calls mutation and navigates on click", async () => {
        render(<MovieCard movie={mockMovie} index={0} />);
        const card = screen.getByText(/Inception/i).closest("div");
    
        fireEvent.click(card!);
    
        await waitFor(() => {
          expect(mockCreate).toHaveBeenCalledWith({
            movieId: 12345,
            interactionType: "view",
            genreIds: [28, 12, 16],
          });
          expect(mockPush).toHaveBeenCalledWith("/12345");
        });
      });
    
    
})