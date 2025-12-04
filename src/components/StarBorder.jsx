import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  innerBackground = 'transparent', // New prop
  innerBorder = 'none',         // New prop
  innerPadding = '0',           // New prop
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`, // Adjusted padding for consistency with border
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div 
        className="inner-content"
        style={{
          background: innerBackground,
          border: innerBorder,
          padding: innerPadding
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;