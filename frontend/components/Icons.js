// Instagram-style SVG Icons
export const HomeIcon = ({ filled = false }) => (
  <svg
    aria-label="Home"
    fill={filled ? "#262626" : "none"}
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    {filled ? (
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
    ) : (
      <path
        d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    )}
  </svg>
);

export const CreateIcon = () => (
  <svg
    aria-label="New post"
    fill="none"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.703 2 8.552Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="6.545"
      x2="17.455"
      y1="12.001"
      y2="12.001"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="12.003"
      x2="12.003"
      y1="6.545"
      y2="17.455"
    ></line>
  </svg>
);

export const HeartIcon = ({ filled = false }) => (
  <svg
    aria-label="Like"
    fill={filled ? "#ed4956" : "none"}
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    {filled ? (
      <path
        d="M12.001 21.5c-.321 0-.64-.078-.93-.227-5.24-2.736-8.877-6.807-10.746-10.077C-.401 8.5-.401 5.392 1.43 3.46 2.863 2.026 4.5 1.5 6.5 1.5c1.74 0 3.41.744 4.501 2.044C12.09 2.744 13.76 2 15.5 2c2 0 3.637.526 5.07 1.96 1.831 1.932 1.831 5.04.105 7.736-1.869 3.27-5.506 7.341-10.746 10.077-.29.149-.609.227-.928.227Z"
        fill="#ed4956"
      />
    ) : (
      <path
        d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763h.014c.14 0 .279-.588 1.119-1.763a4.21 4.21 0 0 1 3.679-1.94m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.469 2.983 5.524 5.6 7.59 2.546 2.274 4.194 3.838 4.9 4.39a1 1 0 0 0 1 0c.706-.552 2.354-2.116 4.9-4.39 2.617-2.066 5.6-4.121 5.6-7.59a6.985 6.985 0 0 0-6.708-7.218Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    )}
  </svg>
);

export const CommentIcon = () => (
  <svg
    aria-label="Comment"
    fill="none"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);

export const ShareIcon = () => (
  <svg
    aria-label="Share"
    fill="none"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="22"
      x2="9.218"
      y1="3"
      y2="10.082"
    ></line>
    <polygon
      fill="none"
      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

export const SaveIcon = ({ filled = false }) => (
  <svg
    aria-label="Save"
    fill={filled ? "#262626" : "none"}
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    {filled ? (
      <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
    ) : (
      <polygon
        fill="none"
        points="20 21 12 13.44 4 21 4 3 20 3 20 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    )}
  </svg>
);

export const MoreIcon = () => (
  <svg
    aria-label="More options"
    fill="currentColor"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <circle cx="12" cy="12" r="1.5"></circle>
    <circle cx="6" cy="12" r="1.5"></circle>
    <circle cx="18" cy="12" r="1.5"></circle>
  </svg>
);

export const InstagramLogo = () => (
  <svg
    aria-label="Instagram"
    height="29"
    role="img"
    viewBox="0 0 24 24"
    width="29"
  >
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="currentColor"
    ></path>
  </svg>
);
