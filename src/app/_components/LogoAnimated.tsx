export default function LogoAnimated({ size = 640 }: { size?: number }) {
  let frameNow = 0;
  const svgSize = size * 4;
  let content;

  function updateContent() {
    switch (frameNow) {
      case 1:
        content = (
          <>
            <path
              d="M217 114L320 217L423 114"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
        break;
      case 2:
        content = (
          <>
            <path
              d="M217 114L320 217L423 114"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M217 270L320 373L423 270"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
        break;
      case 3:
        content = (
          <>
            <path
              d="M217 423L320 526L423 423"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M217 114L320 217L423 114"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M217 270L320 373L423 270"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
        break;
      case 4:
        content = (
          <>
            <rect
              x="126"
              y="26"
              width="388"
              height="588"
              rx="64"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinejoin="round"
            />
            <path
              d="M217 423L320 526L423 423"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M217 114L320 217L423 114"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M217 270L320 373L423 270"
              stroke="#F59E0B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
        break;
      default:
        content = null;
    }
  }

  function startAnimation() {
    setInterval(() => {
      frameNow = frameNow < 4 ? frameNow + 1 : 0;
      updateContent();
    }, 30);
  }

  updateContent();
  startAnimation();

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 640 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {content}
    </svg>
  );
}
