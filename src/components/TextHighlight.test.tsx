import { render, screen } from "@testing-library/react";
import TextHighlight from "./TextHighlight";

describe("TextHighlight", () => {
  test("when nothing to highlight then does not change the content", () => {
    render(<TextHighlight content="John Doe" toHighlight="" />);
    const content = screen.getByText("John Doe");
    expect(content).toBeInTheDocument();
  });

  test("when part of the content is highlighted then that part is wrapped in 'text-highlight'", () => {
    const { container } = render(
      <TextHighlight content="John Doe" toHighlight="John" />
    );
    const highlightedContent = screen.getByTestId("text-highlight");
    expect(container).toHaveTextContent("John Doe");
    expect(highlightedContent).toHaveTextContent("John");
  });

  test("when whole content is highlighted then it's wrapped in 'text-highlight'", () => {
    render(<TextHighlight content="John Doe" toHighlight="John Doe" />);
    const content = screen.getByTestId("text-highlight");
    expect(content).toHaveTextContent("John Doe");
  });

  test("does not differ between upper/lower-case letters", () => {
    render(<TextHighlight content="John Doe" toHighlight="john" />);
    const highlightedContent = screen.getByTestId("text-highlight");
    expect(highlightedContent).toHaveTextContent("John");
  });
});
