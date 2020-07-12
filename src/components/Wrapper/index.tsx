import React from "react";

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

const Wrapper = ({ children, visible }: Props) => (
  <div hidden={!visible}>{children}</div>
);

export default Wrapper;
