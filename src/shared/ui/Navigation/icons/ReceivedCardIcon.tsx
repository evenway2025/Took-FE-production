type Props = {
  fillColor: string;
};

export const ReceivedCardIcon = ({ fillColor }: Props) => {
  const secondCardColor = fillColor === 'var(--gray-75)' ? 'var(--gray-700)' : 'var(--gray-500)';

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="9.39844"
        y="1"
        width="16"
        height="12.1399"
        rx="2"
        transform="rotate(16.257 9.39844 1)"
        fill={fillColor}
      />
      <rect
        x="4"
        y="8.00586"
        width="16"
        height="11.9059"
        rx="2"
        transform="rotate(-10.8294 4 8.00586)"
        fill={secondCardColor}
      />
      <path
        d="M25 21.0526C25 21.8343 24.7149 22.584 24.2075 23.1367C23.7 23.6895 23.0118 24 22.2941 24H4.70588C3.98824 24 3.29999 23.6895 2.79253 23.1367C2.28508 22.584 2 21.8343 2 21.0526V12.9474C2 12.1657 2.28508 11.416 2.79253 10.8633C3.29999 10.3105 3.98824 10 4.70588 10H22.2941C23.0118 10 23.7 10.3105 24.2075 10.8633C24.7149 11.416 25 12.1657 25 12.9474V21.0526Z"
        fill={fillColor}
      />
      <path
        d="M17 19.4C17 19.5591 16.9263 19.7117 16.795 19.8243C16.6637 19.9368 16.4857 20 16.3 20H10.7C10.5143 20 10.3363 19.9368 10.205 19.8243C10.0737 19.7117 10 19.5591 10 19.4V17.6C10 17.4409 10.0737 17.2883 10.205 17.1757C10.3363 17.0632 10.5143 17 10.7 17H16.3C16.4857 17 16.6637 17.0632 16.795 17.1757C16.9263 17.2883 17 17.4409 17 17.6V19.4Z"
        fill={secondCardColor}
      />
    </svg>
  );
};
