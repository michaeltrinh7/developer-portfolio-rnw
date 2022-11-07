import { LI, UL } from '@expo/html-elements';
import * as React from 'react';

import { Link } from './base/Link';

interface HeaderNavLinksProps {
  ulStyle?: any;
  liStyle?: any;
  linkStyle?: any;
  firstLinkStyle?: any;
}

export const HeaderNavLinks = ({
  ulStyle,
  liStyle,
  linkStyle,
  firstLinkStyle,
}: HeaderNavLinksProps) => {
  return (
    <UL style={ulStyle}>
      <LI style={liStyle}>
        <Link style={[linkStyle, ...(firstLinkStyle ?? [])]} href="/">
          Home
        </Link>
      </LI>
      <LI>
        <Link style={linkStyle} href="/#about">
          About
        </Link>
      </LI>
      <LI>
        <Link style={linkStyle} href="/#projects">
          Projects
        </Link>
      </LI>
      <LI>
        <Link style={linkStyle} href="/#contact">
          Contact
        </Link>
      </LI>
    </UL>
  );
};
