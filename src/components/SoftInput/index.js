import { forwardRef } from "react";
import PropTypes from "prop-types";

// Import required components
import SoftInputRoot from "components/SoftInput/SoftInputRoot";
import SoftInputWithIconRoot from "components/SoftInput/SoftInputWithIconRoot";
import SoftInputIconBoxRoot from "components/SoftInput/SoftInputIconBoxRoot";
import SoftInputIconRoot from "components/SoftInput/SoftInputIconRoot";

// Forwarding ref to access input value
const SoftInput = forwardRef(({ size, icon, error, success, disabled, ...rest }, ref) => {
  let template;

  const iconDirection = icon.direction;

  // Condition to render input with left icon
  if (icon.component && icon.direction === "left") {
    template = (
      <SoftInputWithIconRoot ownerState={{ error, success, disabled }}>
        <SoftInputIconBoxRoot ownerState={{ size }}>
          <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftInputIconRoot>
        </SoftInputIconBoxRoot>
        <SoftInputRoot
          {...rest}
          ref={ref} // attaching ref directly to input
          ownerState={{ size, error, success, iconDirection, disabled }}
        />
      </SoftInputWithIconRoot>
    );
  }
  // Condition to render input with right icon
  else if (icon.component && icon.direction === "right") {
    template = (
      <SoftInputWithIconRoot ownerState={{ error, success, disabled }}>
        <SoftInputRoot
          {...rest}
          ref={ref} // attaching ref directly to input
          ownerState={{ size, error, success, iconDirection, disabled }}
        />
        <SoftInputIconBoxRoot ownerState={{ size }}>
          <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftInputIconRoot>
        </SoftInputIconBoxRoot>
      </SoftInputWithIconRoot>
    );
  }
  // Default condition without icon
  else {
    template = (
      <SoftInputRoot
        {...rest}
        ref={ref} // attaching ref directly to input
        ownerState={{ size, error, success, disabled }}
      />
    );
  }

  return template;
});

// Setting default values for the props of SoftInput
SoftInput.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the SoftInput
SoftInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SoftInput;
