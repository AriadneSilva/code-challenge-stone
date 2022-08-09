import React, { BaseHTMLAttributes } from "react";
import PropTypes from "prop-types";

interface DivProps extends BaseHTMLAttributes<HTMLDivElement> {
  bgColor: string;
  direction: string;
  border: string;
  borderColor: string;
  borderRadius: string;
  padding: string;
  margin: string;
  cursor: string;
  justifyItems: string;
  alignItems: string;
  width: string;
  height: string;
  textAlign: string;
  boxShadow: string;
  overflow: string;
}

View.propTypes = {
  bgColor: PropTypes.string,
  direction: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  cursor: PropTypes.string,
  justifyItems: PropTypes.string,
  alignItems: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  textAlign: PropTypes.string,
  boxShadow: PropTypes.string,
  overflow: PropTypes.string,
};

View.defaultProps = {
  bgColor: "",
  direction: "flex-row",
  border: "",
  borderColor: "",
  borderRadius: "",
  padding: "",
  margin: "",
  cursor: "",
  justifyItems: "",
  alignItems: "",
  width: "",
  height: "",
  textAlign: "",
  boxShadow: "",
  overflow: "",
};

export function View({
  children,
  bgColor,
  direction,
  border,
  borderColor,
  borderRadius,
  padding,
  margin,
  cursor,
  justifyItems,
  alignItems,
  width,
  height,
  textAlign,
  boxShadow,
  overflow,
  ...rest
}: DivProps) {
  return (
    <div
      className={`flex 
      justify-${justifyItems} 
      ${alignItems} 
      ${direction} 
      w-${width}
      ${height} 
      ${textAlign} 
      bg-${bgColor}
      ${border}  
      border-${borderColor} 
      rounded-${borderRadius} 
      ${padding} 
      ${margin} 
      ${cursor} 
      shadow-${boxShadow} 
      ${overflow}      
      
      `}
      {...rest}
    >
      {children}
    </div>
  );
}
