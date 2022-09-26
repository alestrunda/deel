interface Props {
  content: string;
  toHighlight: string;
}

const TextHighlight = ({ content, toHighlight }: Props) => {
  const highlightIndexStart = content
    .toLocaleLowerCase()
    .indexOf(toHighlight.toLocaleLowerCase());
  if (toHighlight === "" || highlightIndexStart === -1) {
    return <>{content}</>;
  }

  return (
    <>
      {`${content.substring(0, highlightIndexStart)}`}
      <span
        className="text-highlight"
        data-testid="text-highlight"
      >{`${content.substring(
        highlightIndexStart,
        highlightIndexStart + toHighlight.length
      )}`}</span>
      {`${content.substring(highlightIndexStart + toHighlight.length)}`}
    </>
  );
};

export default TextHighlight;
