export const SpeechBubble = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <div>
      <svg width={165} height={120} viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <style data-bx-fonts="Actor">
            @import url(https://fonts.googleapis.com/css2?family=Actor%3Aital%2Cwght%400%2C400&amp;display=swap);
          </style>
        </defs>
        <rect
          x="9.968"
          y="8.505"
          width="140.647"
          height="67.587"
          style={{ fill: 'rgb(216, 216, 216)', strokeOpacity: '0.18', stroke: 'rgb(41, 28, 109)' }}
        ></rect>
        <polyline
          style={{ fill: 'rgb(216, 216, 216)', stroke: 'rgb(41, 45, 112);', strokeOpacity: '0.14' }}
          points="102.607 75.09 140.114 109.553 131.861 75.425"
        ></polyline>
        <text
          style={{
            fill: 'rgb(51, 51, 51)',
            fontFamily: 'Actor',
            fontSize: '11px',
            textAnchor: 'middle',
            whiteSpace: 'pre',
          }}
          transform="matrix(1, 0, 0, 1, 4.68822, -1.803162)"
        >
          <tspan x="74.631" y="28.992">
            Welcome to my utility hub,
          </tspan>
          <tspan x="74.631" dy="1em">
            {' '}
          </tspan>
          <tspan>where you will find helpful</tspan>
          <tspan x="74.631" dy="1em">
            {' '}
          </tspan>
          <tspan>news and information</tspan>
          <tspan x="74.631" dy="1em">
            {' '}
          </tspan>
          <tspan>regarding business utilities</tspan>
        </text>
      </svg>
      <img
        src="/assets/img/Billie-green.png"
        alt="quote"
        height={'100px'}
        style={{ display: 'flex', marginLeft: '80%', marginTop: '-12.5%' }}
      />
    </div>
  )
}
