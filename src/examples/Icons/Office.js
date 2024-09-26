// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function News({ color, size }) {
  return (
    <svg
      height={size}
      width={size}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 42 42"
      fill={colors[color] ? colors[color].main : colors.dark.main}
      stroke="#000000"
      strokeWidth="0.00512"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="4.096"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <path
              fill={colors[color] ? colors[color].main : colors.dark.main}
              d="M428.765,0H83.235C71.687,0,62.324,9.362,62.324,20.911v470.177 c0,11.548,9.362,20.911,20.911,20.911h345.524c0.007,0,0.015,0.001,0.024,0.001c9.558,0,18.682-7.52,20.893-17.038 c0,0.001,0-459.365,0-474.051C449.676,9.362,440.313,0,428.765,0z M233.942,443.154h-81.683c-11.548,0-20.911-9.362-20.911-20.911 c0-11.548,9.362-20.911,20.911-20.911h81.683c11.548,0,20.911,9.363,20.911,20.911 C254.853,433.792,245.491,443.154,233.942,443.154z M359.742,372.927H152.259c-11.548,0-20.911-9.362-20.911-20.911 c0-11.548,9.362-20.911,20.911-20.911h207.483c11.548,0,20.911,9.362,20.911,20.911 C380.653,363.565,371.291,372.927,359.742,372.927z M359.742,302.7H152.259c-11.548,0-20.911-9.362-20.911-20.911 c0-11.548,9.362-20.911,20.911-20.911h207.483c11.548,0,20.911,9.363,20.911,20.911C380.653,293.338,371.291,302.7,359.742,302.7z M380.653,207.787L380.653,207.787c0,11.548-9.363,20.911-20.911,20.911H152.259c-11.548,0-20.911-9.362-20.911-20.911V89.756 c0-11.548,9.362-20.911,20.911-20.911h207.483c11.548,0,20.911,9.362,20.911,20.911V207.787z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}


// Setting default values for the props of Office
News.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
News.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default News;

// <svg
//   width={size}
//   height={size}
//   viewBox="0 0 42 42"
//   version="1.1"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlnsXlink="http://www.w3.org/1999/xlink"
// >
//   <title>news</title>
//   <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//     <g
//       id="Rounded-Icons"
//       transform="translate(-1869.000000, -293.000000)"
//       fill={colors[color] ? colors[color].main : colors.dark.main}
//       fillRule="nonzero"
//     >
//       <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
//         <g id="office" transform="translate(153.000000, 2.000000)">
//           <path
//             d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
//             id="Path"
//             opacity="0.6"
//           />
//           <path d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z" />
//         </g>
//       </g>
//     </g>
//   </g>
// </svg>;
